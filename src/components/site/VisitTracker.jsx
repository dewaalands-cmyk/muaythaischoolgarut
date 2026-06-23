"use client";
import { useEffect } from "react";

// Kirim satu ping kunjungan saat halaman dibuka. Dibatasi 1x per hari per
// browser (server tetap men-dedupe per pengunjung+hari).
export default function VisitTracker() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    try {
      if (localStorage.getItem("v_tracked_day") === today) return;
    } catch {}
    fetch("/api/track", { method: "POST", keepalive: true })
      .then(() => {
        try { localStorage.setItem("v_tracked_day", today); } catch {}
      })
      .catch(() => {});
  }, []);
  return null;
}
