// Helper tanggal zona WIB (UTC+7) untuk statistik pengunjung.
// Mengembalikan objek Date pada tengah malam UTC yang mewakili tanggal kalender WIB.
export function wibDay(d = new Date()) {
  const wib = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return new Date(Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate()));
}

// "YYYY-MM-DD" dari objek Date (komponen UTC).
export function ymd(date) {
  return date.toISOString().slice(0, 10);
}
