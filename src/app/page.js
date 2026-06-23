import { getSiteContent } from "@/lib/content";
import { waLink } from "@/lib/wa";
import { Icon } from "@/components/site/Icons";
import Navbar from "@/components/site/Navbar";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import FloatingButtons from "@/components/site/FloatingButtons";
import ScrollFX from "@/components/site/ScrollFX";

// Selalu ambil konten terbaru dari database (live untuk semua pengunjung).
export const dynamic = "force-dynamic";

function toUrl(val, fallback) {
  if (!val) return null;
  return val.startsWith("http") ? val : fallback(val);
}
function buildSocials(ct) {
  const out = [];
  const ig = toUrl(ct.instagram, (v) => "https://instagram.com/" + v.replace(/^@/, ""));
  const tt = toUrl(ct.tiktok, (v) => "https://tiktok.com/@" + v.replace(/^@/, ""));
  const fb = toUrl(ct.facebook, (v) => "https://facebook.com/" + v);
  const yt = toUrl(ct.youtube, (v) => "https://youtube.com/" + v);
  if (ig) out.push({ k: "instagram", url: ig, label: "Instagram" });
  if (tt) out.push({ k: "tiktok", url: tt, label: "TikTok" });
  if (fb) out.push({ k: "facebook", url: fb, label: "Facebook" });
  if (yt) out.push({ k: "youtube", url: yt, label: "YouTube" });
  if (ct.whatsapp) out.push({ k: "whatsapp", url: waLink(ct.whatsapp), label: "WhatsApp" });
  return out;
}

export default async function Home() {
  const c = await getSiteContent();
  const tel = (c.contact.phone || "").replace(/[^0-9+]/g, "");
  const socials = buildSocials(c.contact);
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Camp 3GRT - Muaythai School Garut",
    description: "Pusat latihan Muay Thai profesional di Garut, Jawa Barat.",
    image: "https://muaythaischoolgarut.vercel.app/images/coach-dio.jpg",
    url: "https://muaythaischoolgarut.vercel.app/",
    telephone: "+62-895-2437-8203",
    address: { "@type": "PostalAddress", addressLocality: "Garut", addressRegion: "Jawa Barat", addressCountry: "ID" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
    sport: "Muay Thai",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar brand={c.brand} whatsapp={c.contact.whatsapp} />

      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={c.hero.bgImage} alt="" />
        </div>
        <div className="container hero-inner">
          <span className="hero-badge"><span className="dot" />{c.hero.badge}</span>
          <h1>
            <span className="stroke">{c.hero.titleTop}</span>
            <span className="solid">{c.hero.titleBottom}</span>
          </h1>
          <p className="hero-sub">{c.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href={waLink(c.contact.whatsapp, "Halo Camp 3GRT, saya mau tanya soal kelas Muay Thai.")} target="_blank" rel="noopener">
              <Icon name="whatsapp" /> <span>{c.hero.ctaPrimary}</span>
            </a>
            <a className="btn btn-outline btn-lg" href="#program"><span>{c.hero.ctaSecondary}</span></a>
          </div>
          <div className="hero-meta">
            <div className="item"><Icon name="clock" /><span>{c.contact.hoursWeekday}</span></div>
            <div className="item"><Icon name="pin" /><span>Garut, Jawa Barat</span></div>
            <div className="item"><Icon name="check" /><span>Pemula sampai Atlet</span></div>
          </div>
        </div>
        <div className="scroll-cue"><div className="mouse" /><span>Scroll</span></div>
      </section>

      {/* ============ VALUES ============ */}
      <div className="values">
        <div className="container">
          <div className="values-track">
            {c.values.map((v, i) => <span key={i} className="values-item">{v}</span>)}
          </div>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-media reveal">
              <img src={c.about.image} alt="Interior camp 3GRT dengan ring dan alat latihan lengkap" />
              <div className="badge-float">
                <span className="num">3GRT</span>
                <span className="lbl">Discipline · Focus · Strength</span>
              </div>
            </div>
            <div className="about-body reveal d1">
              <span className="eyebrow">Tentang Kami</span>
              <h2 className="section-title">{c.about.heading}</h2>
              <p className="lead">{c.about.lead}</p>
              <p>{c.about.body}</p>
              <div className="stats">
                {c.about.stats.map((s, i) => (
                  <div key={i} className="stat"><div className="v">{s.value}</div><div className="l">{s.label}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRAMS ============ */}
      <section className="section" id="program" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Program Latihan</span>
            <h2 className="section-title">Pilih Kelas yang <span className="hl">Cocok Buatmu</span></h2>
            <p className="section-sub">Dari latihan grup yang seru sampai sesi privat yang fokus — semua dipandu coach berpengalaman.</p>
          </div>
          <div className="grid-3">
            {c.programs.map((p) => (
              <article key={p.id} className="card reveal">
                <div className="prog-icon"><Icon name={p.icon} /></div>
                <span className="prog-level">{p.level}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COACHES ============ */}
      <section className="section" id="coach">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Tim Pelatih</span>
            <h2 className="section-title">Dilatih Langsung oleh <span className="hl">Coach Berpengalaman</span></h2>
            <p className="section-sub">Bukan asal latihan. Setiap coach punya spesialisasi untuk bantu kamu berkembang lebih cepat.</p>
          </div>
          <div className="grid-3">
            {c.coaches.map((co) => (
              <article key={co.id} className="coach-card reveal">
                <div className="coach-photo">
                  <img src={co.image} alt={`${co.name} - ${co.role}`} loading="lazy" />
                  <div className="coach-name-wrap">
                    <div className="role">{co.role}</div>
                    <h3>{co.name}</h3>
                  </div>
                </div>
                <div className="coach-info">
                  <p>{co.bio}</p>
                  <div className="coach-tags">
                    {(co.specialties || []).map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SCHEDULE ============ */}
      <section className="section" id="jadwal" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Jadwal Kelas</span>
            <h2 className="section-title">Jadwal Latihan <span className="hl">Mingguan</span></h2>
            <p className="section-sub">Camp buka setiap hari 09.00–22.00 WIB. Berikut jadwal kelas terjadwalnya.</p>
          </div>
          <div className="sched-grid">
            {c.schedule.map((d, i) => (
              <div key={i} className="sched-day">
                <div className="day-head">{d.day}</div>
                <div className="sessions">
                  {d.sessions && d.sessions.length ? (
                    d.sessions.map((s, j) => (
                      <div key={j} className="sess">
                        <div className="time">{s.time}</div>
                        <div className="name">{s.name}</div>
                        <div className="coach">{s.coach}</div>
                      </div>
                    ))
                  ) : (
                    <div className="sched-empty">Libur / Open mat</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="section" id="harga">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Membership & Harga</span>
            <h2 className="section-title">Investasi untuk <span className="hl">Versi Terbaikmu</span></h2>
            <p className="section-sub">Harga transparan, tanpa biaya tersembunyi. Pilih paket yang paling pas dengan tujuanmu.</p>
          </div>
          <div className="price-grid">
            {c.pricing.map((p) => (
              <div key={p.id} className={"price-card" + (p.popular ? " popular" : "")}>
                {p.popular && <div className="price-badge">Paling Favorit</div>}
                <h3>{p.name}</h3>
                <p className="desc">{p.desc}</p>
                <div className="price-amount">
                  <span className="rp">Rp</span>
                  <span className="num">{p.price}</span>
                  <span className="per">{p.period}</span>
                </div>
                <ul className="price-feats">
                  {(p.features || []).map((f, i) => (
                    <li key={i}><Icon name="check" strokeWidth={2.5} /><span>{f}</span></li>
                  ))}
                </ul>
                <a
                  className={"btn " + (p.popular ? "btn-primary" : "btn-outline") + " btn-block"}
                  href={waLink(c.contact.whatsapp, `Halo Camp 3GRT, saya tertarik dengan paket ${p.name}. Bisa info lebih lanjut?`)}
                  target="_blank"
                  rel="noopener"
                >
                  {p.cta || "Pilih Paket"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section" id="testi" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Kata Mereka</span>
            <h2 className="section-title">Cerita dari <span className="hl">Member Kami</span></h2>
            <p className="section-sub">Hasil nyata dari latihan yang konsisten bareng Camp 3GRT.</p>
          </div>
          <div className="testi-grid">
            {c.testimonials.map((t) => (
              <figure key={t.id} className="testi reveal">
                <div className="stars">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => <Icon key={i} name="star" />)}
                </div>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="who">
                  <div className="av">{(t.name || "?").charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="nm">{t.name}</div>
                    <div className="rl">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section" id="galeri">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Galeri</span>
            <h2 className="section-title">Suasana <span className="hl">Latihan & Camp</span></h2>
            <p className="section-sub">Intip langsung fasilitas dan momen latihan di Camp 3GRT.</p>
          </div>
          <div className="gallery-scroll">
            {c.gallery.map((g, i) => (
              <div key={i} className="gallery-item">
                <img src={g.image} alt={g.caption} loading="lazy" />
                <div className="cap">{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" id="faq" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Pertanyaan yang <span className="hl">Sering Ditanya</span></h2>
          </div>
          <Faq items={c.faq} />
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="cta-band">
        <div className="container">
          <h2>Siap Jadi Lebih Kuat?</h2>
          <p>Langkah pertama selalu yang paling berat. Mulai latihan pertamamu di Camp 3GRT hari ini.</p>
          <a className="btn btn-primary btn-lg" href="#kontak">
            Daftar Kelas Pertama
          </a>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section" id="kontak">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Hubungi Kami</span>
            <h2 className="section-title">Daftar atau <span className="hl">Tanya Dulu</span></h2>
            <p className="section-sub">Isi form di bawah atau langsung chat WhatsApp. Tim kami siap bantu.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="info-row">
                <div className="ic"><Icon name="pin" /></div>
                <div><div className="lbl">Lokasi</div><div className="val">{c.contact.address}</div></div>
              </div>

              {c.contact.mapsEmbed && c.contact.mapsEmbed.includes("google.com/maps/embed") && (
                <div className="map-embed">
                  <iframe src={c.contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Camp 3GRT" />
                </div>
              )}
            </div>

            <div className="reveal d1">
              <div style={{ marginBottom: 0 }}>
                <ContactForm programs={c.programs} whatsapp={c.contact.whatsapp} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#hero" className="brand">
                <img src={c.brand.logo} alt={`Logo ${c.brand.name}`} width="44" height="44" />
                <span className="brand-text">
                  <span className="brand-name">{c.brand.name}</span>
                  <span className="brand-tag">{c.brand.tagline}</span>
                </span>
              </a>
              <p>{c.about.lead}</p>
            </div>
            <div>
              <h4>NAVIGASI</h4>
              <ul>
                <li><a href="#about">Tentang</a></li>
                <li><a href="#program">Program</a></li>
                <li><a href="#coach">Coach</a></li>
                <li><a href="#jadwal">Jadwal</a></li>
              </ul>
            </div>
            <div>
              <h4>PROGRAM</h4>
              <ul>
                {c.programs.slice(0, 5).map((p) => (
                  <li key={p.id}><a href="#program">{p.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>KONTAK</h4>
              <a className="fcontact" href={"tel:" + tel}>{c.contact.phone}</a>
              <span className="fcontact">{c.contact.address}</span>
              <span className="fcontact">{c.contact.hoursWeekday}</span>
            </div>
          </div>
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map((s) => (
                <a key={s.k} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label={s.label}>
                  <Icon name={s.k} size={20} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          )}
          <div className="footer-bottom">
            <span>© {year} Camp 3GRT Muaythai School Garut. All rights reserved.</span>
            <span>Dibuat oleh <a href="#" style={{ color: "var(--red)", fontWeight: 600 }}>Pagiverse Studio</a></span>
          </div>
        </div>
      </footer>

      <ScrollFX />
    </>
  );
}
