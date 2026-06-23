"use client";
import { createContext, useContext, useState, useEffect } from "react";

const Ctx = createContext({ lang: "id", toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("id");
  useEffect(() => {
    try {
      const s = localStorage.getItem("3grt_lang");
      if (s === "en") setLang("en");
    } catch {}
  }, []);
  function toggle() {
    const next = lang === "id" ? "en" : "id";
    setLang(next);
    try { localStorage.setItem("3grt_lang", next); } catch {}
  }
  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
