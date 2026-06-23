// Auto-translate Indonesian -> English so admins only ever write Indonesian.
// Uses the free Google Translate endpoint (no API key). Runs on content save.
// Every translatable field gets an "<field>En" sibling generated automatically.

const cache = new Map();

async function translateOne(text, sl = "id", tl = "en") {
  const key = sl + "|" + tl + "|" + text;
  if (cache.has(key)) return cache.get(key);

  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx" +
    `&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Mozilla/5.0", Accept: "*/*" },
    });
    if (!res.ok) throw new Error("translate http " + res.status);
    const json = await res.json();
    const out = (json[0] || []).map((seg) => seg[0]).join("") || text;
    cache.set(key, out);
    return out;
  } finally {
    clearTimeout(timer);
  }
}

// Translate many strings with limited concurrency. On any error, keeps original.
async function translateMany(texts, sl = "id", tl = "en") {
  const out = new Array(texts.length);
  let i = 0;
  const concurrency = 6;
  async function worker() {
    while (i < texts.length) {
      const idx = i++;
      const t = texts[idx];
      if (typeof t !== "string" || !t.trim()) {
        out[idx] = t;
        continue;
      }
      try {
        out[idx] = await translateOne(t, sl, tl);
      } catch {
        out[idx] = t; // graceful fallback: keep Indonesian
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, texts.length || 1) }, worker)
  );
  return out;
}

// Walk the content object and fill in every "<field>En" by translating the
// corresponding Indonesian field. Returns a new object (does not mutate input).
export async function autoTranslateContent(content) {
  const c = JSON.parse(JSON.stringify(content));
  const jobs = []; // { texts: string[], apply: (translated: string[]) => void }

  const field = (obj, key, enKey) => {
    if (obj && typeof obj[key] === "string" && obj[key].trim()) {
      jobs.push({ texts: [obj[key]], apply: ([t]) => { obj[enKey] = t; } });
    }
  };
  const arr = (obj, key, enKey) => {
    if (obj && Array.isArray(obj[key]) && obj[key].length) {
      jobs.push({ texts: obj[key].map(String), apply: (t) => { obj[enKey] = t; } });
    }
  };

  // Hero
  field(c.hero, "badge", "badgeEn");
  field(c.hero, "titleTop", "titleTopEn");
  field(c.hero, "titleBottom", "titleBottomEn");
  field(c.hero, "subtitle", "subtitleEn");
  field(c.hero, "ctaPrimary", "ctaPrimaryEn");
  field(c.hero, "ctaSecondary", "ctaSecondaryEn");

  // Values ticker
  arr(c, "values", "valuesEn");

  // About
  field(c.about, "heading", "headingEn");
  field(c.about, "lead", "leadEn");
  field(c.about, "body", "bodyEn");
  (c.about?.stats || []).forEach((s) => field(s, "label", "labelEn"));

  // Programs
  (c.programs || []).forEach((p) => {
    field(p, "name", "nameEn");
    field(p, "desc", "descEn");
    field(p, "level", "levelEn");
  });

  // Coaches
  (c.coaches || []).forEach((co) => {
    field(co, "role", "roleEn");
    field(co, "bio", "bioEn");
    arr(co, "specialties", "specialtiesEn");
  });

  // Schedule
  (c.schedule || []).forEach((d) => field(d, "day", "dayEn"));

  // Pricing
  (c.pricing || []).forEach((p) => {
    field(p, "name", "nameEn");
    field(p, "desc", "descEn");
    field(p, "cta", "ctaEn");
    arr(p, "features", "featuresEn");
  });

  // Testimonials
  (c.testimonials || []).forEach((t) => {
    field(t, "role", "roleEn");
    field(t, "quote", "quoteEn");
  });

  // Gallery
  (c.gallery || []).forEach((g) => field(g, "caption", "captionEn"));

  // FAQ
  (c.faq || []).forEach((f) => {
    field(f, "q", "qEn");
    field(f, "a", "aEn");
  });

  // Partners
  (c.partners || []).forEach((p) => field(p, "desc", "descEn"));

  // Contact
  field(c.contact, "address", "addressEn");
  field(c.contact, "hoursWeekday", "hoursWeekdayEn");

  // Flatten -> single translation pass (dedup via cache) -> apply back
  const flat = [];
  const ranges = [];
  for (const job of jobs) {
    ranges.push([flat.length, job.texts.length, job]);
    flat.push(...job.texts);
  }
  const translated = await translateMany(flat);
  for (const [start, len, job] of ranges) {
    job.apply(translated.slice(start, start + len));
  }

  return c;
}
