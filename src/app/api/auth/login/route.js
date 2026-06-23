import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!password) return NextResponse.json({ error: "Password diperlukan" }, { status: 400 });

    const admin = await prisma.adminUser.findUnique({ where: { username: "admin" } });
    if (!admin) return NextResponse.json({ error: "Akun admin belum dibuat. Jalankan npm run db:seed" }, { status: 401 });

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
    return NextResponse.json({ error: "Terjadi kesalahan server: " + (e?.message || String(e)) }, { status: 500 });
  }
}
