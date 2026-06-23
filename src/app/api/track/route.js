// Mencatat 1 kunjungan. Memakai cookie acak untuk mengenali pengunjung,
// lalu menyimpan 1 baris unik per (hari WIB + pengunjung). Aman bila gagal.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { wibDay } from "@/lib/day";

export const dynamic = "force-dynamic";

const VISITOR_COOKIE = "v_id";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(request) {
  const res = NextResponse.json({ ok: true });
  try {
    let vid = request.cookies.get(VISITOR_COOKIE)?.value;
    if (!vid) {
      vid = crypto.randomUUID();
      res.cookies.set(VISITOR_COOKIE, vid, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: ONE_YEAR,
        path: "/",
      });
    }
    const day = wibDay();
    await prisma.pageView.upsert({
      where: { day_visitor: { day, visitor: vid } },
      create: { day, visitor: vid },
      update: {},
    });
  } catch (e) {
    // Tabel belum ada / DB error -> jangan ganggu pengunjung.
  }
  return res;
}
