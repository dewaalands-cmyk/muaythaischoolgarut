// Pastikan tabel PageView ada (dibuat otomatis saat pertama dipakai),
// supaya tidak perlu menjalankan migrasi/db push manual saat deploy.
import { prisma } from "./prisma";

let ensured = false;

export async function ensurePageViewTable() {
  if (ensured) return;
  await prisma.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS "PageView" (
      "id" TEXT NOT NULL,
      "day" DATE NOT NULL,
      "visitor" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
    )`
  );
  await prisma.$executeRawUnsafe(
    `CREATE UNIQUE INDEX IF NOT EXISTS "PageView_day_visitor_key" ON "PageView" ("day", "visitor")`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "PageView_day_idx" ON "PageView" ("day")`
  );
  ensured = true;
}
