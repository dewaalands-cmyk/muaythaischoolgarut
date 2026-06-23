"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LangSwitch() {
  const { lang, toggle } = useLanguage();
  return (
    <button onClick={toggle} className="btn-lang" aria-label="Toggle language / Ganti bahasa">
      <span className={lang === "id" ? "lang-active" : ""}>ID</span>
      <span className="lang-sep">|</span>
      <span className={lang === "en" ? "lang-active" : ""}>EN</span>
    </button>
  );
}
