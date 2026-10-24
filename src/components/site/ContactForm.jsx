"use client";
import { useState, useEffect, useId } from "react";
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
  fmtPkg: (name, price, period) => {
    const amount = String(price ?? "").trim();
    if (!amount) return name;
    return /^\d+(?:[.,]\d+)*$/.test(amount.replace(/\s/g, ""))
      ? `${name} | Rp ${amount}${period || ""}`
      : `${name} | ${amount}`;
  },
};

export default function ContactForm({ pricing = [], whatsapp, t: tProp, preselect }) {
  const t = { ...DEFAULT_T, ...tProp };
  const formId = useId();
  const [form, setForm] = useState({ name: "", phone: "", program: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Saat tombol paket di bagian Harga diklik, paket itu langsung terpilih di sini.
  useEffect(() => {
    if (preselect) setForm((f) => ({ ...f, program: preselect }));
  }, [preselect]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmittedName(form.name.trim());
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
    <form className="contact-form" onSubmit={submit} aria-busy={loading}>
      <div className="form-row">
        <div className="fld">
          <label htmlFor={`${formId}-name`}>{t.name} *</label>
          <input id={`${formId}-name`} name="name" type="text" autoComplete="name" value={form.name} onChange={set("name")} placeholder={t.namePh} required minLength={2} disabled={loading} />
        </div>
        <div className="fld">
          <label htmlFor={`${formId}-phone`}>{t.phone} *</label>
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set("phone")} placeholder={t.phonePh} required minLength={6} disabled={loading} />
        </div>
      </div>
      <div className="fld">
        <label htmlFor={`${formId}-program`}>{t.package} *</label>
        <select id={`${formId}-program`} name="program" value={form.program} onChange={set("program")} required disabled={loading}>
          <option value="">{t.packageDefault}</option>
          {pricing.map((p) => (
            <option key={p.id} value={p.name}>{t.fmtPkg(p.name, p.price, p.period)}</option>
          ))}
          <option value={t.packageOther}>{t.packageOther}</option>
        </select>
      </div>
      <div className="fld">
        <label htmlFor={`${formId}-message`}>{t.message}</label>
        <textarea id={`${formId}-message`} name="message" value={form.message} onChange={set("message")} placeholder={t.messagePh} rows={3} disabled={loading} />
      </div>

      {status === "ok" && (
        <div className="form-success" role="status" aria-live="polite">
          <p className="form-status-copy">{t.success}</p>
          {whatsapp && (
            <a className="form-fallback" href={waLink(whatsapp, t.waMsg(submittedName))} target="_blank" rel="noopener noreferrer">
              {t.successWa}
            </a>
          )}
        </div>
      )}
      {status === "err" && (
        <div className="form-error" role="alert">
          <p className="form-status-copy">{t.error}</p>
          {whatsapp && (
            <a className="form-fallback" href={waLink(whatsapp, t.waMsg(form.name.trim()))} target="_blank" rel="noopener noreferrer">
              {t.successWa}
            </a>
          )}
        </div>
      )}

      <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
        {loading ? t.sending : t.submit}
      </button>
    </form>
  );
}
