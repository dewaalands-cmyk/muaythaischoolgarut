import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/ratelimit";

const cap = (s, n) => (s || "").trim().slice(0, n);

export async function POST(request) {
  try {
    // Anti spam: maksimal 5 kiriman per IP tiap 10 menit.
    const ip = clientIp(request);
    const rl = rateLimit("contact:" + ip, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Terlalu banyak kiriman. Coba lagi nanti." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter || 600) } }
      );
    }

    const body = await request.json();
    // Batasi panjang agar tidak ada payload raksasa / data sampah.
    const name = cap(body.name, 80);
    const phone = cap(body.phone, 30);
    const program = cap(body.program, 80);
    const message = cap(body.message, 1000);

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
