// Helper baca/tulis isi website ke database.
import { prisma } from "./prisma";
import { defaultContent } from "./defaultContent";

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

// Gabungkan default + data tersimpan, supaya field baru tetap muncul
// walau data lama di DB belum punya field tersebut.
export function mergeDeep(base, override) {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (isObject(base)) {
    const out = {};
    for (const k of Object.keys(base)) {
      out[k] = override && k in override ? mergeDeep(base[k], override[k]) : base[k];
    }
    if (override) {
      for (const k of Object.keys(override)) {
        if (!(k in out)) out[k] = override[k];
      }
    }
    return out;
  }
  return override === undefined || override === null ? base : override;
}

// Ambil isi website. Kalau DB belum terisi / error -> pakai default.
export async function getSiteContent() {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    if (row && row.data) return mergeDeep(defaultContent, row.data);
  } catch (e) {
    // DB belum siap (mis. belum migrate) -> jangan crash, pakai default.
  }
  return defaultContent;
}

// Simpan isi website (upsert baris id = 1).
export async function saveSiteContent(data) {
  return prisma.siteContent.upsert({
    where: { id: 1 },
    update: { data },
    create: { id: 1, data },
  });
}
