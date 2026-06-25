"use client";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/lib/translations";
import { Icon } from "@/components/site/Icons";
import Navbar from "@/components/site/Navbar";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import ScrollFX from "@/components/site/ScrollFX";

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
  if (ct.whatsapp) out.push({ k: "whatsapp", url: "#kontak", label: "WhatsApp", internal: true });
  return out;
}

function PageInner({ content: c }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const [preselectPkg, setPreselectPkg] = useState("");
  const tel = (c.contact.phone || "").replace(/[^0-9+]/g, "");
  const socials = buildSocials(c.contact);
  const year = new Date().getFullYear();
  // Helper: return EN value if lang=en and EN is non-empty, otherwise ID
  const g = (en, id) => (lang === "en" && en) ? en : id;

  return (
    <>
      <Navbar brand={c.brand} t={t} />

      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <div className="hero-bg"><img src={c.hero.bgImage} alt="" /></div>
        <div className="container hero-inner">
          <span className="hero-badge"><span className="dot" />{g(c.hero.badgeEn, c.hero.badge)}</span>
          <h1>
            <span className="stroke">{g(c.hero.titleTopEn, c.hero.titleTop)}</span>
            <span className="solid">{g(c.hero.titleBottomEn, c.hero.titleBottom)}</span>
          </h1>
          <p className="hero-sub">{g(c.hero.subtitleEn, c.hero.subtitle)}</p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#kontak">
              <Icon name="whatsapp" /> <span>{g(c.hero.ctaPrimaryEn, c.hero.ctaPrimary)}</span>
            </a>
            <a className="btn btn-outline btn-lg" href="#program"><span>{g(c.hero.ctaSecondaryEn, c.hero.ctaSecondary)}</span></a>
          </div>
        </div>
        <div className="scroll-cue"><div className="mouse" /><span>{t.hero.scroll}</span></div>
      </section>

      {/* ============ VALUES ============ */}
      <div className="values">
        <div className="container">
          <div className="values-track">
            {(lang === "en" && c.valuesEn?.length ? c.valuesEn : c.values).map((v, i) => <span key={i} className="values-item">{v}</span>)}
          </div>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-media reveal">
              <img src={c.about.image} alt="Camp 3GRT Muaythai School Garut" />
              <div className="badge-float">
                <span className="num">3GRT</span>
                <span className="lbl">{t.about.badge}</span>
              </div>
            </div>
            <div className="about-body reveal d1">
              <span className="eyebrow">{t.about.eyebrow}</span>
              <h2 className="section-title">{g(c.about.headingEn, c.about.heading)}</h2>
              <p className="lead">{g(c.about.leadEn, c.about.lead)}</p>
              <p>{g(c.about.bodyEn, c.about.body)}</p>
              <div className="stats">
                {c.about.stats.map((s, i) => (
                  <div key={i} className="stat"><div className="v">{s.value}</div><div className="l">{g(s.labelEn, s.label)}</div></div>
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
            <span className="eyebrow">{t.programs.eyebrow}</span>
            <h2 className="section-title">{t.programs.title} <span className="hl">{t.programs.titleHl}</span></h2>
            <p className="section-sub">{t.programs.sub}</p>
          </div>
          <div className="grid-3">
            {c.programs.map((p) => (
              <article key={p.id} className="card reveal">
                <div className="prog-icon"><Icon name={p.icon} /></div>
                <span className="prog-level">{g(p.levelEn, p.level)}</span>
                <h3>{g(p.nameEn, p.name)}</h3>
                <p>{g(p.descEn, p.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COACHES ============ */}
      <section className="section" id="coach">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t.coaches.eyebrow}</span>
            <h2 className="section-title">{t.coaches.title} <span className="hl">{t.coaches.titleHl}</span></h2>
            <p className="section-sub">{t.coaches.sub}</p>
          </div>
          <div className="grid-3">
            {c.coaches.map((co) => (
              <article key={co.id} className="coach-card reveal">
                <div className="coach-photo">
                  <img src={co.image} alt={`${co.name} - ${g(co.roleEn, co.role)}`} loading="lazy" />
                  <div className="coach-name-wrap">
                    <div className="role">{g(co.roleEn, co.role)}</div>
                    <h3>{co.name}</h3>
                  </div>
                </div>
                <div className="coach-info">
                  <p>{g(co.bioEn, co.bio)}</p>
                  <div className="coach-tags">
                    {(lang === "en" && co.specialtiesEn?.length ? co.specialtiesEn : (co.specialties || [])).map((tag, i) => <span key={i}>{tag}</span>)}
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
            <span className="eyebrow">{t.schedule.eyebrow}</span>
            <h2 className="section-title">{t.schedule.title} <span className="hl">{t.schedule.titleHl}</span></h2>
            <p className="section-sub">{t.schedule.sub}</p>
          </div>
          <div className="sched-grid">
            {c.schedule.map((d, i) => (
              <div key={i} className="sched-day">
                <div className="day-head">{g(d.dayEn, d.day)}</div>
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
                    <div className="sched-empty">{t.schedule.empty}</div>
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
            <span className="eyebrow">{t.pricing.eyebrow}</span>
            <h2 className="section-title">{t.pricing.title} <span className="hl">{t.pricing.titleHl}</span></h2>
            <p className="section-sub">{t.pricing.sub}</p>
          </div>
          <div className="price-grid">
            {c.pricing.map((p) => (
              <div key={p.id} className={"price-card" + (p.popular ? " popular" : "")}>
                {p.popular && <div className="price-badge">{t.pricing.popular}</div>}
                <h3>{g(p.nameEn, p.name)}</h3>
                <p className="desc">{g(p.descEn, p.desc)}</p>
                <div className="price-amount">
                  <span className="rp">Rp</span>
                  <span className="num">{p.price}</span>
                  <span className="per">{p.period}</span>
                </div>
                <ul className="price-feats">
                  {(lang === "en" && p.featuresEn?.length ? p.featuresEn : (p.features || [])).map((f, i) => (
                    <li key={i}><Icon name="check" strokeWidth={2.5} /><span>{f}</span></li>
                  ))}
                </ul>
                <a
                  className={"btn " + (p.popular ? "btn-primary" : "btn-outline") + " btn-block"}
                  href="#kontak"
                  onClick={() => setPreselectPkg(p.name)}
                >
                  {g(p.ctaEn, p.cta) || t.pricing.defaultCta}
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
            <span className="eyebrow">{t.testimonials.eyebrow}</span>
            <h2 className="section-title">{t.testimonials.title} <span className="hl">{t.testimonials.titleHl}</span></h2>
            <p className="section-sub">{t.testimonials.sub}</p>
          </div>
          <div className="testi-grid">
            {c.testimonials.map((item) => (
              <figure key={item.id} className="testi reveal">
                <div className="stars">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => <Icon key={i} name="star" />)}
                </div>
                <blockquote>{g(item.quoteEn, item.quote)}</blockquote>
                <figcaption className="who">
                  <div className="av">{(item.name || "?").charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="nm">{item.name}</div>
                    <div className="rl">{g(item.roleEn, item.role)}</div>
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
            <span className="eyebrow">{t.gallery.eyebrow}</span>
            <h2 className="section-title">{t.gallery.title} <span className="hl">{t.gallery.titleHl}</span></h2>
            <p className="section-sub">{t.gallery.sub}</p>
          </div>
          <div className="gallery-scroll">
            {c.gallery.map((item, i) => (
              <div key={i} className="gallery-item">
                <img src={item.image} alt={g(item.captionEn, item.caption)} loading="lazy" />
                <div className="cap">{g(item.captionEn, item.caption)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" id="faq" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 className="section-title">{t.faq.title} <span className="hl">{t.faq.titleHl}</span></h2>
          </div>
          <Faq items={c.faq.map(f => ({ q: g(f.qEn, f.q), a: g(f.aEn, f.a) }))} />
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="cta-band">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.sub}</p>
          <a className="btn btn-primary btn-lg" href="#kontak">{t.cta.btn}</a>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section" id="kontak">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="section-title">{t.contact.title} <span className="hl">{t.contact.titleHl}</span></h2>
            <p className="section-sub">{t.contact.sub}</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="info-row">
                <div className="ic"><Icon name="pin" /></div>
                <div><div className="lbl">{t.contact.location}</div><div className="val">{g(c.contact.addressEn, c.contact.address)}</div></div>
              </div>
              {c.contact.mapsEmbed && c.contact.mapsEmbed.includes("google.com/maps") && (
                <div className="map-embed">
                  <iframe src={c.contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t.contact.mapTitle} allowFullScreen />
                </div>
              )}
            </div>
            <div className="reveal d1">
              <ContactForm pricing={c.pricing} whatsapp={c.contact.whatsapp} t={t.form} preselect={preselectPkg} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MITRA ============ */}
      {c.partners && c.partners.length > 0 && (
        <section className="section" id="mitra" style={{ background: "var(--bg-2)" }}>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t.partners.eyebrow}</span>
              <h2 className="section-title">{t.partners.title} <span className="hl">{t.partners.titleHl}</span></h2>
              <p className="section-sub">{t.partners.sub}</p>
            </div>
            <div className="partners-grid reveal">
              {c.partners.map((p, i) => (
                <div key={p.id || i} className="partner-card">
                  {p.logo && <img src={p.logo} alt={p.name} className="partner-logo" />}
                  <div className="partner-info">
                    <h3 className="partner-name">{p.name}</h3>
                    {(g(p.descEn, p.desc)) && <p className="partner-desc">{g(p.descEn, p.desc)}</p>}
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noopener noreferrer" className="partner-link">
                        {t.partners.visit} <Icon name="external" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <h4>{t.footer.nav}</h4>
              <ul>
                <li><a href="#about">{t.footer.about}</a></li>
                <li><a href="#program">{t.footer.programs}</a></li>
                <li><a href="#coach">{t.footer.coach}</a></li>
                <li><a href="#jadwal">{t.footer.schedule}</a></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer.programsHeader}</h4>
              <ul>
                {c.programs.slice(0, 5).map((p) => (
                  <li key={p.id}><a href="#program">{p.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{t.footer.contactHeader}</h4>
              <a className="fcontact" href={"tel:" + tel}>{c.contact.phone}</a>
              <span className="fcontact">{c.contact.address}</span>
              <span className="fcontact">{c.contact.hoursWeekday}</span>
            </div>
          </div>
          {socials.length > 0 && (
            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.k}
                  href={s.url}
                  {...(s.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="footer-social-icon"
                  aria-label={s.label}
                >
                  <Icon name={s.k} size={20} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          )}
          <div className="footer-bottom">
            <span>{t.footer.rights(year)}</span>
            <span>{t.footer.madeBy} <a href="https://pagiversestudio.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600 }}>Pagiverse Studio</a></span>
          </div>
        </div>
      </footer>

      <ScrollFX />
    </>
  );
}

export default function PageContent({ content }) {
  return (
    <LanguageProvider>
      <PageInner content={content} />
    </LanguageProvider>
  );
}
