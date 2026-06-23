import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const program = (body.program || "").trim();
    const message = (body.message || "").trim();

    if (name.length < 2 || phone.length < 6 || !program) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const created = await prisma.message.create({
      data: { name, phone, program, message: message || null },
    });
    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    return NextResponse.json({ error: "Gagal menyimpan pesan" }, { status: 500 });
  }
}
