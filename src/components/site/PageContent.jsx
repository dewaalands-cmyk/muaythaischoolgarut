"use client";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/lib/translations";
import { preparePresentationContent } from "@/lib/presentationContent";
import { waLink } from "@/lib/wa";
import Navbar from "@/components/site/Navbar";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import "./public-site.css";

function safeHttp(value) {
  if (!value) return null;
  const text = String(value).trim();
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function socialsFor(contact) {
  return [
    ["Instagram", contact.instagram, (v) => `https://www.instagram.com/${v.replace(/^@/, "")}/`],
    ["TikTok", contact.tiktok, (v) => `https://www.tiktok.com/@${v.replace(/^@/, "")}`],
    ["Facebook", contact.facebook, (v) => `https://www.facebook.com/${v}`],
    ["YouTube", contact.youtube, (v) => `https://www.youtube.com/${v}`],
  ].flatMap(([label, value, fallback]) => {
    const href = value && safeHttp(/^https?:\/\//i.test(value) ? value : fallback(value));
    return href ? [{ label, href }] : [];
  });
}

function Programs({ programs, lang }) {
  const g = (en, id) => lang === "en" && en ? en : id;
  const visuals = {
    p1: { src: "/images/programs/group-training.webp", illustration: true },
    p2: { src: "/images/programs/personal-training.webp", illustration: true },
    p3: { src: "/images/camp/muay-kids.webp", position: "50% 0%" },
    p4: { src: "/images/camp/interior-display.webp", position: "50% 68%" },
  };
  return (
    <div className="program-image-grid">
      {programs.map((program) => {
        const name = g(program.nameEn, program.name);
        const fallback = /weight|beban/i.test(program.name) ? { src: "/images/programs/weight-training.webp", illustration: true }
          : /diet|nutr/i.test(program.name) ? { src: "/images/programs/diet-nutrition.webp", illustration: true }
          : { src: "/images/camp/interior-display.webp" };
        const visual = program.image ? { ...visuals[program.id], src: program.image, illustration: /^\/images\/programs\//.test(program.image) } : visuals[program.id] || fallback;
        return <article className="program-image-card" key={program.id}>
          <div className="program-card-photo"><img src={visual.src} alt={visual.illustration ? (lang === "en" ? "Illustration: " : "Ilustrasi: ") + name : name} style={{ objectPosition: visual.position || "50% 50%" }} width="960" height="600" loading="lazy" /></div>
          <div className="program-card-copy"><h3>{name}</h3><p>{g(program.descEn, program.desc)}</p></div>
        </article>;
      })}
    </div>
  );
}

function Schedule({ days, lang, emptyText }) {
  const [selected, setSelected] = useState(0);
  const day = days[selected] || days[0];
  if (!day) return null;
  function move(event, index) {
    const keys = { ArrowRight: (index + 1) % days.length, ArrowLeft: (index + days.length - 1) % days.length, Home: 0, End: days.length - 1 };
    if (event.key in keys) {
      event.preventDefault();
      const next = keys[event.key];
      setSelected(next);
      event.currentTarget.parentElement.children[next]?.focus();
    }
  }
  return (
    <div className="schedule-board">
      <div className="day-tabs" role="tablist" aria-label={lang === "en" ? "Training day" : "Hari latihan"}>
        {days.map((item, index) => (
          <button type="button" role="tab" id={`day-${index}`} aria-controls={`day-panel-${index}`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} key={item.day} onClick={() => setSelected(index)} onKeyDown={(event) => move(event, index)}>
            {lang === "en" && item.dayEn ? item.dayEn : item.day}
          </button>
        ))}
      </div>
      {days.map((item, index) => (
        <div className="day-panel" role="tabpanel" id={`day-panel-${index}`} aria-labelledby={`day-${index}`} hidden={selected !== index} key={item.day} tabIndex={0}>
          {item.sessions?.length ? item.sessions.map((session, i) => (
            <div className="session-row" key={i}>
              <time>{session.time}</time>
              <h3>{session.name}</h3>
              {session.coach && <span>{session.coach}</span>}
            </div>
          )) : <p className="schedule-empty">{emptyText}</p>}
        </div>
      ))}
    </div>
  );
}

function PageInner({ content: c }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const g = (en, id) => lang === "en" && en ? en : id;
  const [preselectPkg, setPreselectPkg] = useState("");
  const socials = socialsFor(c.contact);
  const whatsapp = c.contact.whatsapp ? waLink(c.contact.whatsapp, lang === "en" ? "Hello, I'd like to ask about the Muay Thai class schedule." : "Halo, saya ingin tanya jadwal kelas Muay Thai.") : null;
  const tel = (c.contact.phone || "").replace(/[^0-9+]/g, "");

  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">{lang === "en" ? "Skip to content" : "Lewati ke konten"}</a>
      <Navbar brand={c.brand} t={t} hasTestimonials={c.testimonials.length > 0} />
      <main id="main-content">
        <section className="camp-hero" id="hero" aria-labelledby="hero-heading">
          <div className="hero-image"><img src={c.hero.bgImage} alt={c.brand.tagline} width="1672" height="941" fetchPriority="high" /></div>
          <div className="container hero-composition">
            <div className="hero-copy">
              <p className="hero-hours">{g(c.hero.badgeEn, c.hero.badge)}</p>
              <h1 id="hero-heading"><span>{g(c.hero.titleTopEn, c.hero.titleTop)}</span><span>{g(c.hero.titleBottomEn, c.hero.titleBottom)}</span></h1>
              <p className="hero-description">{g(c.hero.subtitleEn, c.hero.subtitle)}</p>

            </div>

          </div>
        </section>

        <div className="camp-values" aria-label={lang === "en" ? "Camp values" : "Nilai camp"}>
          <div className="values-marquee">{[0, 1].map((copy) => <div className="values-run" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>{(lang === "en" && c.valuesEn?.length ? c.valuesEn : c.values).map((value, index) => <span key={index}>{value}</span>)}</div>)}</div>
        </div>

        <section className="camp-section about-section" id="about" aria-labelledby="about-heading">
          <div className="container about-composition">
            <figure className="team-photo"><img src={c.about.image} alt={lang === "en" ? "Camp 3GRT coaches and athletes" : "Tim pelatih dan atlet Camp 3GRT"} loading="lazy" width="900" height="900" /></figure>
            <div className="about-copy">
              <h2 id="about-heading">{g(c.about.headingEn, c.about.heading)}</h2>
              <p className="lead">{g(c.about.leadEn, c.about.lead)}</p>
              <p>{g(c.about.bodyEn, c.about.body)}</p>
              {c.about.stats?.length > 0 && <dl className="camp-stats">{c.about.stats.map((item, index) => <div key={index}><dt>{g(item.labelEn, item.label)}</dt><dd>{item.value}</dd></div>)}</dl>}
            </div>
          </div>
        </section>

        <section className="camp-section program-section" id="program" aria-labelledby="program-heading">
          <div className="container">
            <header className="camp-section-heading"><h2 id="program-heading">{t.programs.title} {t.programs.titleHl}</h2><p>{t.programs.sub}</p></header>
            <Programs programs={c.programs} lang={lang} />
            <p className="program-visual-note">{lang === "en" ? "Camp photos and illustrative training images." : "Foto camp dan ilustrasi pendukung program latihan."}</p>
          </div>
        </section>

        <section className="camp-section" id="coach" aria-labelledby="coach-heading">
          <div className="container">
            <header className="camp-section-heading"><h2 id="coach-heading">{t.coaches.title} {t.coaches.titleHl}</h2><p>{t.coaches.sub}</p></header>
            <div className="coach-roster">
              {c.coaches.map((coach) => <article className="coach-profile" key={coach.id}>
                <div className="coach-portrait"><img src={coach.image} alt={coach.name} width="800" height="1000" loading="lazy" /></div>
                <p className="coach-role">{g(coach.roleEn, coach.role)}</p>
                <h3>{coach.name}</h3>
                <p className="coach-bio">{g(coach.bioEn, coach.bio)}</p>
                <ul className="coach-skills">{(lang === "en" && coach.specialtiesEn?.length ? coach.specialtiesEn : coach.specialties || []).map((skill, index) => <li key={index}>{skill}</li>)}</ul>
              </article>)}
            </div>
          </div>
        </section>

        <section className="camp-section schedule-section" id="jadwal" aria-labelledby="schedule-heading">
          <div className="container">
            <header className="camp-section-heading"><h2 id="schedule-heading">{t.schedule.title} {t.schedule.titleHl}</h2><p>{t.schedule.sub}</p></header>
            <Schedule days={c.schedule} lang={lang} emptyText={t.schedule.empty} />
          </div>
        </section>

        <section className="camp-section" id="harga" aria-labelledby="pricing-heading">
          <div className="container">
            <header className="camp-section-heading"><h2 id="pricing-heading">{t.pricing.title} {t.pricing.titleHl}</h2><p>{t.pricing.sub}</p></header>
            <div className="membership-list">
              {c.pricing.map((pkg) => {
                const numeric = /^\s*\d[\d.,\s]*\s*$/.test(String(pkg.price || ""));
                const features = lang === "en" && pkg.featuresEn?.length ? pkg.featuresEn : pkg.features || [];
                return <article className={`membership-row${numeric ? "" : " quote-row"}`} key={pkg.id}>
                  <div className="membership-info"><h3>{g(pkg.nameEn, pkg.name)}</h3>{g(pkg.descEn, pkg.desc) && <p>{g(pkg.descEn, pkg.desc)}</p>}{features.length > 0 && <ul>{features.map((feature, index) => <li key={index}>{feature}</li>)}</ul>}</div>
                  <p className="membership-price">{numeric ? <><span className="currency">Rp</span><strong>{pkg.price}</strong><span className="period">{g(pkg.periodEn, pkg.period)}</span></> : <strong className="price-on-request">{lang === "en" && /hubungi admin/i.test(pkg.price || "") ? "Ask the team" : pkg.price || (lang === "en" ? "Ask the team" : "Hubungi Admin")}</strong>}</p>
                  <a className="btn btn-outline membership-action" href="#kontak" onClick={() => setPreselectPkg(pkg.name)}>{g(pkg.ctaEn, pkg.cta) || t.pricing.defaultCta}<span aria-hidden="true">→</span></a>
                </article>;
              })}
            </div>
          </div>
        </section>

        {c.testimonials.length > 0 ? <section className="camp-section testimonials-section" id="testi" aria-labelledby="testimonials-heading"><div className="container"><header className="camp-section-heading"><h2 id="testimonials-heading">{t.testimonials.title} {t.testimonials.titleHl}</h2></header><div className="member-stories">{c.testimonials.map((item) => <figure className="member-story" key={item.id}><blockquote>{g(item.quoteEn, item.quote)}</blockquote><figcaption><strong>{item.name}</strong><span>{g(item.roleEn, item.role)}</span></figcaption></figure>)}</div></div></section> : <span id="testi" className="anchor-target" aria-hidden="true" />}

        <section className="camp-section gallery-section" id="galeri" aria-labelledby="gallery-heading">
          <div className="container">
            <header className="camp-section-heading"><h2 id="gallery-heading">{t.gallery.title} {t.gallery.titleHl}</h2><p>{t.gallery.sub}</p></header>
            <div className="camp-gallery">{c.gallery.map((item, index) => <figure key={`${item.image}-${index}`}><div className="gallery-photo"><img src={item.image} alt={g(item.captionEn, item.caption) || c.brand.tagline} width="1000" height="750" loading="lazy" /></div>{g(item.captionEn, item.caption) && <figcaption>{g(item.captionEn, item.caption)}</figcaption>}</figure>)}</div>
          </div>
        </section>

        <section className="camp-section faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="container faq-composition"><header className="camp-section-heading"><h2 id="faq-heading">{t.faq.title} {t.faq.titleHl}</h2></header><Faq items={c.faq.map((item) => ({ q: g(item.qEn, item.q), a: g(item.aEn, item.a) }))} /></div>
        </section>

        <section className="camp-section contact-section" id="kontak" aria-labelledby="contact-heading">
          <div className="container contact-composition">
            <div className="contact-copy"><h2 id="contact-heading">{t.contact.title} {t.contact.titleHl}</h2><p className="contact-intro">{t.contact.sub}</p>
              {whatsapp && <a className="btn btn-primary contact-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">{lang === "en" ? "Chat on WhatsApp" : "Chat WhatsApp"}<span aria-hidden="true">↗</span></a>}
              <dl className="contact-details">
                {g(c.contact.addressEn, c.contact.address) && <div><dt>{t.contact.location}</dt><dd>{g(c.contact.addressEn, c.contact.address)}</dd></div>}
                {g(c.contact.hoursWeekdayEn, c.contact.hoursWeekday) && <div><dt>{lang === "en" ? "Opening hours" : "Jam buka"}</dt><dd>{g(c.contact.hoursWeekdayEn, c.contact.hoursWeekday)}</dd></div>}
                {c.contact.phone && <div><dt>{lang === "en" ? "Telephone" : "Telepon"}</dt><dd><a href={`tel:${tel}`}>{c.contact.phone}</a></dd></div>}
              </dl>
              {socials.length > 0 && <div className="contact-socials">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}<span aria-hidden="true">↗</span></a>)}</div>}
              {c.contact.mapsEmbed && /^https:\/\/[^/]*google\.com\/maps\//i.test(c.contact.mapsEmbed) && <div className="camp-map"><iframe src={c.contact.mapsEmbed} title={t.contact.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>}
            </div>
            <div className="contact-form-panel"><h3>{lang === "en" ? "Send an enquiry" : "Kirim pertanyaan"}</h3><ContactForm pricing={c.pricing} whatsapp={c.contact.whatsapp} t={t.form} preselect={preselectPkg} /></div>
          </div>
        </section>

        {c.partners.length > 0 && <section className="camp-section partner-section" id="mitra" aria-labelledby="partners-heading"><div className="container"><h2 id="partners-heading">{t.partners.title} {t.partners.titleHl}</h2><div className="camp-partners">{c.partners.map((partner, index) => {
          const href = safeHttp(partner.website);
          const logo = partner.logo ? <img src={partner.logo} alt={partner.name} width="200" height="100" loading="lazy" /> : <span>{partner.name}</span>;
          return <div key={partner.id || index}>{href ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>{logo}</a> : logo}</div>;
        })}</div></div></section>}
      </main>
      <footer className="camp-footer"><div className="container">
        <div className="footer-top"><a className="brand" href="#hero"><img src={c.brand.logo} alt={`Logo ${c.brand.name}`} width="44" height="44" /><span className="brand-text"><span className="brand-name">{c.brand.name}</span><span className="brand-tag">{c.brand.tagline}</span></span></a><nav aria-label={lang === "en" ? "Footer" : "Navigasi footer"}><a href="#program">{t.nav.programs}</a><a href="#jadwal">{t.nav.schedule}</a><a href="#harga">{t.nav.pricing}</a><a href="#kontak">{t.nav.contact}</a></nav></div>
        <div className="footer-bottom"><span>{t.footer.rights(new Date().getFullYear())}</span><span>{t.footer.madeBy} <a href="https://pagiversestudio.vercel.app/" target="_blank" rel="noopener noreferrer">Pagiverse Studio</a></span></div>
      </div></footer>
    </div>
  );
}

export default function PageContent({ content }) {
  return <LanguageProvider><PageInner content={preparePresentationContent(content)} /></LanguageProvider>;
}
