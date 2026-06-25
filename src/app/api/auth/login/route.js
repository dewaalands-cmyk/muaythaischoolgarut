import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(request) {
  try {
    // Anti brute-force: maksimal 8 percobaan per IP tiap 5 menit.
    const ip = clientIp(request);
    const rl = rateLimit("login:" + ip, { limit: 8, windowMs: 5 * 60 * 1000 });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan. Coba lagi nanti." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter || 300) } }
      );
    }

    const { password } = await request.json();
    if (!password) return NextResponse.json({ error: "Password diperlukan" }, { status: 400 });

    const admin = await prisma.adminUser.findUnique({ where: { username: "admin" } });
    // Pesan error sengaja generik supaya tidak membocorkan info akun.
    if (!admin) return NextResponse.json({ error: "Kata sandi salah" }, { status: 401 });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return NextResponse.json({ error: "Kata sandi salah" }, { status: 401 });

    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("[login error]", e?.message || e);
    // Jangan kirim detail error ke klien.
    return NextResponse.json({ error: "Terjadi kesalahan server. Coba lagi." }, { status: 500 });
  }
}
