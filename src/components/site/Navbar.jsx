"use client";
import { useState, useEffect } from "react";
import { waLink } from "@/lib/wa";

export default function Navbar({ brand, whatsapp }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoErr, setLogoErr] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = brand?.logo || "/images/logo.svg";

  const links = [
    ["#about", "Tentang"],
    ["#program", "Program"],
    ["#coach", "Coach"],
    ["#jadwal", "Jadwal"],
    ["#harga", "Harga"],
    ["#testi", "Testimoni"],
    ["#galeri", "Galeri"],
    ["#kontak", "Kontak"],
  ];

  return (
    <nav className={"navbar" + (scrolled ? " scrolled" : "") + (open ? " nav-open" : "")}>
      <div className="container nav-inner">
        <a href="#hero" className="brand">
          {!logoErr ? (
            <img
              src={logoSrc}
              alt={brand?.name || "Logo"}
              width="40"
              height="40"
              className="brand-logo"
              onError={() => setLogoErr(true)}
            />
          ) : (
            <div className="brand-logo-fallback">
              {(brand?.name || "3G").slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="brand-text">
            <span className="brand-name">{brand?.name || "Camp 3GRT"}</span>
            <span className="brand-tag">{brand?.tagline || "Muaythai School Garut"}</span>
          </span>
        </a>

        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>

        <ul className={"nav-links" + (open ? " open" : "")}>
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li>
            <a
              className="btn btn-primary btn-sm"
              href="#kontak"
              onClick={() => setOpen(false)}
            >
              Daftar Sekarang
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
