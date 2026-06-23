import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function checkAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

export async function PUT(request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { current, newPassword } = await request.json();

  const admin = await prisma.adminUser.findUnique({ where: { username: "admin" } });
  if (!admin) return NextResponse.json({ error: "Akun tidak ditemukan" }, { status: 404 });

  const valid = await bcrypt.compare(current, admin.passwordHash);
  if (!valid) return NextResponse.json({ error: "Kata sandi saat ini salah" }, { status: 401 });

  if (!newPassword || newPassword.length < 5) {
    return NextResponse.json({ error: "Kata sandi baru minimal 5 karakter" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({ where: { username: "admin" }, data: { passwordHash } });
  return NextResponse.json({ ok: true });
}
