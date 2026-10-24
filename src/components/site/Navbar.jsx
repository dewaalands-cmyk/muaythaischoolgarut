"use client";
import { useState, useEffect, useId, useRef } from "react";
import LangSwitch from "@/components/site/LangSwitch";

export default function Navbar({ brand, t, hasTestimonials = true }) {
  const [open, setOpen] = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const toggleRef = useRef(null);
  const linksId = useId();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const logoSrc = brand?.logo || "/images/logo.svg";

  useEffect(() => setLogoErr(false), [logoSrc]);

  function handleKeyDown(event) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    }
  }

  const links = t ? [
    ["#about", t.nav.about],
    ["#program", t.nav.programs],
    ["#coach", t.nav.coach],
    ["#jadwal", t.nav.schedule],
    ["#harga", t.nav.pricing],
    ["#testi", t.nav.testimonials],
    ["#galeri", t.nav.gallery],
    ["#kontak", t.nav.contact],
  ] : [
    ["#about", "Tentang"], ["#program", "Program"], ["#coach", "Coach"],
    ["#jadwal", "Jadwal"], ["#harga", "Harga"], ["#testi", "Testimoni"],
    ["#galeri", "Galeri"], ["#kontak", "Kontak"],
  ];

  return (
    <nav className={"navbar scrolled" + (open ? " nav-open" : "")} aria-label="Menu" onKeyDown={handleKeyDown} onBlur={(event) => { if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <div className="container nav-inner">
        <a href="#hero" className="brand" onClick={() => setOpen(false)}>
          {!logoErr ? (
            <img src={logoSrc} alt={brand?.name || "Logo"} width="40" height="40" className="brand-logo" onError={() => setLogoErr(true)} />
          ) : (
            <span className="brand-logo-fallback" aria-hidden="true">{(brand?.name || "3G").slice(0, 2).toUpperCase()}</span>
          )}
          <span className="brand-text">
            <span className="brand-name">{brand?.name || "Camp 3GRT"}</span>
            <span className="brand-tag">{brand?.tagline || "Muaythai School Garut"}</span>
          </span>
        </a>

        <button ref={toggleRef} type="button" className="nav-toggle" aria-label="Menu" aria-expanded={open} aria-controls={linksId} onClick={() => setOpen((value) => !value)}>
          <span /><span /><span />
        </button>

        <ul id={linksId} className={"nav-links" + (open ? " open" : "")} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          {links.filter(([href]) => hasTestimonials || href !== "#testi").map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li><LangSwitch /></li>
        </ul>
      </div>
    </nav>
  );
}
