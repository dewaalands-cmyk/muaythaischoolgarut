"use client";
import { useState } from "react";
import { waLink } from "@/lib/wa";

export default function ContactForm({ pricing = [], whatsapp }) {
  const [form, setForm] = useState({ name: "", phone: "", program: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", program: "", message: "" });
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
    setLoading(false);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <div className="fld">
          <label>Nama Lengkap *</label>
          <input type="text" value={form.name} onChange={set("name")} placeholder="Nama kamu" required minLength={2} />
        </div>
        <div className="fld">
          <label>No. WhatsApp *</label>
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="08xx-xxxx-xxxx" required minLength={6} />
        </div>
      </div>
      <div className="fld">
        <label>Paket yang Diminati *</label>
        <select value={form.program} onChange={set("program")} required>
          <option value="">-- Pilih Paket --</option>
          {pricing.map((p) => (
            <option key={p.id} value={p.name}>{p.name}{p.price ? ` – Rp ${p.price}${p.period || ""}` : ""}</option>
          ))}
          <option value="Lainnya / Tanya Dulu">Lainnya / Tanya Dulu</option>
        </select>
      </div>
      <div className="fld">
        <label>Pesan (opsional)</label>
        <textarea value={form.message} onChange={set("message")} placeholder="Ada yang ingin kamu tanyakan?" rows={3} />
      </div>

      {status === "ok" && (
        <div className="form-success">
          Pesan terkirim! Kami akan segera menghubungimu.{" "}
          <a href={waLink(whatsapp, `Halo, saya ${form.name || ""} ingin tanya soal kelas Muay Thai.`)} target="_blank" rel="noopener">
            Atau chat langsung via WhatsApp →
          </a>
        </div>
      )}
      {status === "err" && (
        <div className="form-error">Gagal mengirim. Coba lagi atau hubungi via WhatsApp.</div>
      )}

      <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
