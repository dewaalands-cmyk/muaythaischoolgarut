import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })));
}

export async function PATCH(request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (body.action === "markAllRead") {
    await prisma.message.updateMany({ data: { read: true } });
  } else if (body.id !== undefined) {
    await prisma.message.update({ where: { id: body.id }, data: { read: body.read } });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (body.action === "clearAll") {
    await prisma.message.deleteMany();
  } else if (body.id) {
    await prisma.message.delete({ where: { id: body.id } });
  }
  return NextResponse.json({ ok: true });
}
