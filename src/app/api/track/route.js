// Mencatat 1 kunjungan. Memakai cookie acak untuk mengenali pengunjung,
// lalu menyimpan 1 baris unik per (hari WIB + pengunjung). Aman bila gagal.
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { wibDay, ymd } from "@/lib/day";
import { ensurePageViewTable } from "@/lib/analytics";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

const VISITOR_COOKIE = "v_id";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(request) {
  const res = NextResponse.json({ ok: true });
  try {
    // Batasi banjir request per IP supaya DB tidak membengkak.
    const ip = clientIp(request);
    if (!rateLimit("track:" + ip, { limit: 60, windowMs: 60 * 1000 }).ok) {
      return res;
    }

    const day = wibDay();
    let vid = request.cookies.get(VISITOR_COOKIE)?.value;
    if (!vid) {
      // Tanpa cookie: pakai sidik jari stabil (IP+UA+hari) supaya request
      // berulang tanpa cookie tidak membuat baris baru tak terbatas.
      const ua = request.headers.get("user-agent") || "";
      vid = "anon_" + createHash("sha256").update(ip + "|" + ua + "|" + ymd(day)).digest("hex").slice(0, 32);
      res.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: ONE_YEAR,
        path: "/",
      });
    }
    await ensurePageViewTable();
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
