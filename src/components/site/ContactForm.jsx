"use client";
import { useState } from "react";
import { waLink } from "@/lib/wa";

const DEFAULT_T = {
  name: "Nama Lengkap", namePh: "Nama kamu",
  phone: "No. WhatsApp", phonePh: "08xx-xxxx-xxxx",
  package: "Paket yang Diminati", packageDefault: "-- Pilih Paket --",
  packageOther: "Lainnya / Tanya Dulu",
  message: "Pesan (opsional)", messagePh: "Ada yang ingin kamu tanyakan?",
  submit: "Kirim Pesan", sending: "Mengirim...",
  success: "Pesan terkirim! Kami akan segera menghubungimu.",
  successWa: "Atau chat langsung via WhatsApp →",
  error: "Gagal mengirim. Coba lagi atau hubungi via WhatsApp.",
  waMsg: (name) => `Halo, saya ${name} ingin tanya soal kelas Muay Thai.`,
  fmtPkg: (name, price, period) => price ? `${name} – Rp ${price}${period || ""}` : name,
};

export default function ContactForm({ pricing = [], whatsapp, t: tProp }) {
  const t = tProp || DEFAULT_T;
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
          <label>{t.name} *</label>
          <input type="text" value={form.name} onChange={set("name")} placeholder={t.namePh} required minLength={2} />
        </div>
        <div className="fld">
          <label>{t.phone} *</label>
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder={t.phonePh} required minLength={6} />
        </div>
      </div>
      <div className="fld">
        <label>{t.package} *</label>
        <select value={form.program} onChange={set("program")} required>
          <option value="">{t.packageDefault}</option>
          {pricing.map((p) => (
            <option key={p.id} value={p.name}>{t.fmtPkg(p.name, p.price, p.period)}</option>
          ))}
          <option value={t.packageOther}>{t.packageOther}</option>
        </select>
      </div>
      <div className="fld">
        <label>{t.message}</label>
        <textarea value={form.message} onChange={set("message")} placeholder={t.messagePh} rows={3} />
      </div>

      {status === "ok" && (
        <div className="form-success">
          {t.success}{" "}
          <a href={waLink(whatsapp, t.waMsg(form.name || ""))} target="_blank" rel="noopener">
            {t.successWa}
          </a>
        </div>
      )}
      {status === "err" && <div className="form-error">{t.error}</div>}

      <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
        {loading ? t.sending : t.submit}
      </button>
    </form>
  );
}
