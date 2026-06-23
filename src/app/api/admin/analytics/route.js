// Statistik pengunjung untuk dashboard admin.
// Mengembalikan total 7/30/90 hari & sepanjang waktu, plus deret harian
// (urut tanggal naik) untuk grafik.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wibDay, ymd } from "@/lib/day";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.pageView.groupBy({
      by: ["day"],
      _count: { _all: true },
      orderBy: { day: "asc" },
    });

    const daily = rows.map((r) => ({ date: ymd(r.day), count: r._count._all }));

    const DAY = 86400000;
    const today = wibDay();
    const sumLast = (n) => {
      const cutoff = ymd(new Date(today.getTime() - (n - 1) * DAY));
      return daily.reduce((acc, d) => (d.date >= cutoff ? acc + d.count : acc), 0);
    };
    const all = daily.reduce((acc, d) => acc + d.count, 0);

    return NextResponse.json({
      totals: { d7: sumLast(7), d30: sumLast(30), d90: sumLast(90), all },
      daily,
      today: ymd(today),
    });
  } catch (e) {
    // Tabel belum dibuat / DB error -> kembalikan kosong, jangan crash.
    return NextResponse.json({
      totals: { d7: 0, d30: 0, d90: 0, all: 0 },
      daily: [],
      today: ymd(wibDay()),
    });
  }
}
