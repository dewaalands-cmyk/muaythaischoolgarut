// Pembatas laju sederhana berbasis memori (best-effort, per instance serverless).
// Cukup untuk memperlambat brute-force/spam pada situs kecil. Untuk proteksi
// kuat lintas instance, gunakan store eksternal (mis. Upstash/Redis).
const buckets = new Map();

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();

  // Bersihkan sebagian entri kedaluwarsa agar Map tidak tumbuh tanpa batas.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now > v.reset) buckets.delete(k);
    }
  }

  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }
  b.count++;
  if (b.count > limit) {
    return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  }
  return { ok: true };
}

// Ambil IP klien dari header proxy (Vercel mengisi x-forwarded-for).
export function clientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
