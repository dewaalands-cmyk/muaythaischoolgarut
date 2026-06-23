"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { waLink } from "@/lib/wa";
import { defaultContent } from "@/lib/defaultContent";

/* ============== IKON (inner SVG, di-inject ke <svg>) ============== */
const ADMIN_ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  dollar: '<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  quote: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  refresh: '<path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

function I({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ADMIN_ICONS[name] || "" }} />
  );
}

/* ============== KONFIG MENU ============== */
const NAV = [
  { group: "Utama", items: [["dashboard", "Dashboard", "grid"], ["messages", "Pesan Masuk", "mail"]] },
  {
    group: "Konten Website",
    items: [
      ["brand", "Brand & Logo", "image"],
      ["hero", "Hero / Banner", "gallery"],
      ["values", "Nilai / Ticker", "star"],
      ["about", "Tentang", "info"],
      ["programs", "Program", "list"],
      ["coaches", "Coach", "user"],
      ["schedule", "Jadwal", "calendar"],
      ["pricing", "Harga", "dollar"],
      ["testimonials", "Testimoni", "quote"],
      ["faq", "FAQ", "help"],
      ["gallery", "Galeri", "image"],
      ["contact", "Kontak", "phone"],
    ],
  },
  { group: "Sistem", items: [["settings", "Pengaturan", "settings"]] },
];
const TITLES = {
  dashboard: "Dashboard", messages: "Pesan Masuk",
  brand: "Brand & Logo", hero: "Hero / Banner", values: "Nilai / Ticker",
  about: "Tentang Kami", programs: "Program Latihan", coaches: "Tim Coach",
  schedule: "Jadwal Kelas", pricing: "Membership & Harga",
  testimonials: "Testimoni", faq: "FAQ", gallery: "Galeri", contact: "Kontak", settings: "Pengaturan",
};
const ICON_OPTIONS = [
  { value: "users", label: "Grup (users)" }, { value: "target", label: "Target" },
  { value: "child", label: "Anak (child)" }, { value: "star", label: "Bintang (star)" },
  { value: "dumbbell", label: "Dumbbell" }, { value: "female", label: "Wanita (female)" }, { value: "boxing", label: "Tinju (boxing)" },
];

/* ============== HELPER ============== */
const clone = (o) => JSON.parse(JSON.stringify(o));
function timeAgo(iso) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "baru saja";
  const m = Math.floor(s / 60);
  if (m < 60) return m + " menit lalu";
  const h = Math.floor(m / 60);
  if (h < 24) return h + " jam lalu";
  const dd = Math.floor(h / 24);
  if (dd < 30) return dd + " hari lalu";
  return d.toLocaleDateString("id-ID");
}

/* ============== KOMPONEN FIELD ============== */
function Field({ label, value, onChange, type = "text", placeholder, hint }) {
  return (
    <div className="fld">
      <label>{label}</label>
      <input type={type} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
function Area({ label, value, onChange, rows = 3, placeholder, hint }) {
  return (
    <div className="fld">
      <label>{label}</label>
      <textarea rows={rows} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
function SelectField({ label, value, options, onChange }) {
  return (
    <div className="fld">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
function CheckField({ label, checked, onChange }) {
  return (
    <div className="fld fld-check">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <label style={{ margin: 0 }}>{label}</label>
    </div>
  );
}
function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        setUploadErr(data.error || "Upload gagal");
      }
    } catch {
      setUploadErr("Upload gagal, cek koneksi.");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="fld">
      <label>{label}</label>
      <div className="img-upload-wrap">
        <div className="img-preview-box">
          {value ? (
            <img alt="preview" src={value} onError={(e) => { e.currentTarget.style.display = "none"; }} />
          ) : (
            <div className="img-placeholder"><I name="image" /></div>
          )}
        </div>
        <div className="img-upload-body">
          <button
            type="button"
            className={"btn btn-upload" + (uploading ? " loading" : "")}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <I name="image" />
            {uploading ? "Mengunggah..." : "Pilih / Upload Foto"}
          </button>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: "none" }} onChange={handleFile} />
          <div className="img-url-row">
            <input
              type="text"
              value={value || ""}
              placeholder="Atau tempel URL gambar langsung..."
              onChange={(e) => { setUploadErr(""); onChange(e.target.value); }}
            />
          </div>
          {uploadErr && <div className="upload-err">{uploadErr}</div>}
          <div className="hint">Format: JPG, PNG, WebP, GIF • Maks 5 MB</div>
        </div>
      </div>
    </div>
  );
}
function TagEditor({ values, onChange }) {
  const [text, setText] = useState("");
  const add = () => { const v = text.trim(); if (v) { onChange([...(values || []), v]); setText(""); } };
  return (
    <div>
      <div className="tag-input-wrap">
        {(values || []).map((v, i) => (
          <span key={i} className="tag-chip">{v}
            <button type="button" aria-label="hapus" onClick={() => onChange(values.filter((_, j) => j !== i))}>×</button>
          </span>
        ))}
      </div>
      <div className="fld" style={{ marginTop: 8, marginBottom: 0 }}>
        <input type="text" value={text} placeholder="Ketik lalu Enter untuk menambah..." onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
      </div>
    </div>
  );
}
function ItemCard({ tag, onUp, onDown, onDelete, children }) {
  return (
    <div className="item-card">
      <div className="item-head">
        <span className="tag">{tag}</span>
        <div className="item-actions">
          <button className="icon-btn" title="Naik" onClick={onUp}><I name="up" /></button>
          <button className="icon-btn" title="Turun" onClick={onDown}><I name="down" /></button>
          <button className="icon-btn del" title="Hapus" onClick={onDelete}><I name="trash" /></button>
        </div>
      </div>
      {children}
    </div>
  );
}
function AddBtn({ onClick, label }) {
  return (
    <button className="btn btn-outline" onClick={onClick} style={{ marginTop: 4 }}>
      <I name="plus" /> {label}
    </button>
  );
}

/* ============== KOMPONEN UTAMA ============== */
export default function AdminApp({ initialContent, initialMessages }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [messages, setMessages] = useState(initialMessages || []);
  const [panel, setPanel] = useState("dashboard");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, ok: true, msg: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [msgFilter, setMsgFilter] = useState("all");
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const unread = messages.filter((m) => !m.read).length;

  // peringatkan kalau menutup tab dengan perubahan belum disimpan
  useEffect(() => {
    const handler = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function showToast(msg, ok = true) {
    setToast({ show: true, ok, msg });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400);
  }
  // edit konten: clone -> ubah -> set + tandai dirty
  function edit(fn) {
    setContent((prev) => { const next = clone(prev); fn(next); return next; });
    setDirty(true);
  }
  function move(key, i, dir) {
    const j = i + dir;
    edit((c) => {
      const arr = c[key];
      if (j < 0 || j >= arr.length) return;
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    });
  }
  function go(p) { setPanel(p); setSidebarOpen(false); }

  /* ---- simpan ke database ---- */
  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setDirty(false);
        showToast("Perubahan tersimpan ✓");
      } else if (res.status === 401) {
        showToast("Sesi habis — silakan login ulang", false);
        setTimeout(() => router.push("/admin/login"), 1500);
      } else {
        const data = await res.json().catch(() => ({}));
        showToast("Gagal: " + (data.error || res.status), false);
      }
    } catch (e) {
      showToast("Gagal menyimpan: " + (e.message || "network error"), false);
    }
    setSaving(false);
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  /* ---- pesan ---- */
  async function refreshMessages() {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) { setMessages(await res.json()); showToast("Pesan diperbarui ✓"); }
    } catch {}
  }
  async function setRead(id, read) {
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, read } : m)));
    await fetch("/api/admin/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, read }) });
  }
  async function delMsg(id) {
    setMessages((ms) => ms.filter((m) => m.id !== id));
    await fetch("/api/admin/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
  }
  async function markAllRead() {
    setMessages((ms) => ms.map((m) => ({ ...m, read: true })));
    await fetch("/api/admin/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "markAllRead" }) });
  }
  async function clearAll() {
    if (!confirm("Hapus SEMUA pesan? Tindakan ini tidak bisa dibatalkan.")) return;
    setMessages([]);
    await fetch("/api/admin/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "clearAll" }) });
  }

  /* ---- pengaturan ---- */
  async function changePassword() {
    if (pw.next.length < 5) return showToast("Sandi baru minimal 5 karakter", false);
    if (pw.next !== pw.confirm) return showToast("Konfirmasi sandi tidak cocok", false);
    const res = await fetch("/api/admin/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current: pw.current, newPassword: pw.next }) });
    const data = await res.json();
    if (res.ok) { showToast("Sandi berhasil diganti ✓"); setPw({ current: "", next: "", confirm: "" }); }
    else showToast(data.error || "Gagal mengganti sandi", false);
  }
  function exportData() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "3grt-content-backup.json"; a.click();
    URL.revokeObjectURL(url);
  }
  function resetContent() {
    if (!confirm("Kembalikan semua konten ke pengaturan awal? Perubahanmu akan hilang setelah disimpan.")) return;
    setContent(clone(defaultContent));
    setDirty(true);
    showToast("Konten direset. Klik Simpan untuk menerapkan.");
  }

  const C = content;
  const logoInputRef = useRef(null);
  const [logoUploading, setLogoUploading] = useState(false);

  async function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        edit((c) => { if (!c.brand) c.brand = {}; c.brand.logo = data.url; });
        showToast("Logo diperbarui ✓");
      } else {
        showToast(data.error || "Upload gagal", false);
      }
    } catch {
      showToast("Upload gagal", false);
    }
    setLogoUploading(false);
    if (logoInputRef.current) logoInputRef.current.value = "";
  }

  return (
    <div className="app show">
      {/* ============ SIDEBAR ============ */}
      <aside className={"sidebar" + (sidebarOpen ? " open" : "")}>
        <div className="sidebar-head">
          <button
            className={"sidebar-logo-btn" + (logoUploading ? " uploading" : "")}
            onClick={() => logoInputRef.current?.click()}
            title="Klik untuk ganti logo"
            disabled={logoUploading}
          >
            {C.brand?.logo
              ? <img src={C.brand.logo} alt="Logo" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              : <span className="logo-initials">{(C.brand?.name || "3G").slice(0, 2).toUpperCase()}</span>
            }
            <span className="logo-overlay">
              {logoUploading ? <I name="refresh" /> : <I name="image" />}
            </span>
          </button>
          <input ref={logoInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" style={{ display: "none" }} onChange={handleLogoUpload} />
          <div className="t">
            <div className="n">{C.brand?.name || "Camp 3GRT"}</div>
            <div className="r">Admin Panel</div>
          </div>
        </div>
        <div className="nav-scroll">
          {NAV.map((grp) => (
            <div key={grp.group}>
              <div className="nav-group-label">{grp.group}</div>
              {grp.items.map(([key, label, icon]) => (
                <button key={key} className={"nav-item" + (panel === key ? " active" : "")} onClick={() => go(key)}>
                  <I name={icon} />
                  <span>{label}</span>
                  {key === "messages" && unread > 0 && <span className="badge">{unread}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="sidebar-foot">
          <a className="btn btn-outline" href="/" target="_blank" rel="noopener"><I name="external" /> Lihat Website</a>
          <button className="btn btn-ghost" onClick={logout}><I name="logout" /> Keluar</button>
        </div>
      </aside>
      <div className={"backdrop" + (sidebarOpen ? " show" : "")} onClick={() => setSidebarOpen(false)} />

      {/* ============ MAIN ============ */}
      <div className="main">
        <div className="topbar">
          <div className="left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Menu"><I name="menu" /></button>
            <h2>{TITLES[panel]}</h2>
          </div>
          <div className="right">
            <div className={"save-status" + (dirty ? " dirty" : "")}>
              <span className="dot" /><span>{dirty ? "Belum disimpan" : "Tersimpan"}</span>
            </div>
            <button className="btn btn-primary" onClick={save} disabled={saving}>
              <I name="save" /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>

        <div className="content">
          {/* ---------- DASHBOARD ---------- */}
          {panel === "dashboard" && (
            <div className="panel active">
              <div className="panel-intro">
                <h3>Selamat Datang di Dashboard</h3>
                <p>Kelola seluruh isi website Camp 3GRT dari sini. Setelah mengedit, jangan lupa klik Simpan Perubahan.</p>
              </div>
              <div className="stat-grid">
                <div className="stat-card"><div className="ic"><I name="mail" /></div><div className="v">{messages.length}</div><div className="l">Total Pesan Masuk</div></div>
                <div className="stat-card"><div className="ic"><I name="inbox" /></div><div className="v">{unread}</div><div className="l">Belum Dibaca</div></div>
                <div className="stat-card"><div className="ic"><I name="list" /></div><div className="v">{C.programs.length}</div><div className="l">Program Aktif</div></div>
                <div className="stat-card"><div className="ic"><I name="user" /></div><div className="v">{C.coaches.length}</div><div className="l">Jumlah Coach</div></div>
              </div>
              <div className="note">
                <I name="check" />
                <div>Semua perubahan tersimpan di <b>database</b> dan langsung tampil ke semua pengunjung dari perangkat mana pun.</div>
              </div>
              <div className="box">
                <div className="box-title">Pesan Terbaru
                  <button className="btn btn-ghost btn-sm" onClick={() => go("messages")}>Lihat Semua</button>
                </div>
                {messages.length === 0 ? (
                  <p style={{ color: "var(--muted-2)", fontSize: 14 }}>Belum ada pesan masuk.</p>
                ) : (
                  messages.slice(0, 3).map((m) => (
                    <div key={m.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                      <div>
                        <div style={{ fontWeight: 600, color: "#fff" }}>{m.name}</div>
                        <div style={{ fontSize: 12.5, color: "var(--muted-2)" }}>{m.program} • {m.phone}</div>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--muted-2)", whiteSpace: "nowrap" }}>{timeAgo(m.createdAt)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ---------- MESSAGES ---------- */}
          {panel === "messages" && (
            <div className="panel active">
              <div className="panel-intro">
                <h3>Pesan Masuk</h3>
                <p>Pendaftaran &amp; pertanyaan dari form website muncul di sini.</p>
              </div>
              <div className="msg-toolbar">
                <button className={"btn btn-sm " + (msgFilter === "all" ? "btn-primary" : "btn-ghost")} onClick={() => setMsgFilter("all")}>Semua ({messages.length})</button>
                <button className={"btn btn-sm " + (msgFilter === "unread" ? "btn-primary" : "btn-ghost")} onClick={() => setMsgFilter("unread")}>Belum Dibaca ({unread})</button>
                <div className="spacer" />
                <button className="btn btn-ghost btn-sm" onClick={refreshMessages}><I name="refresh" /> Muat ulang</button>
                <button className="btn btn-outline btn-sm" onClick={markAllRead}>Tandai semua dibaca</button>
                <button className="btn btn-danger btn-sm" onClick={clearAll}>Hapus semua</button>
              </div>

              {(() => {
                const shown = msgFilter === "unread" ? messages.filter((m) => !m.read) : messages;
                if (shown.length === 0) {
                  return (
                    <div className="empty-state">
                      <div className="ic"><I name="inbox" /></div>
                      <h4>Belum ada pesan</h4>
                      <p>Pesan dari form pendaftaran akan tampil di sini.</p>
                    </div>
                  );
                }
                return shown.map((m) => (
                  <div key={m.id} className={"msg-card" + (m.read ? "" : " unread")}>
                    <div className="msg-top">
                      <div className="who">
                        <div className="av">{(m.name || "?").charAt(0).toUpperCase()}</div>
                        <div>
                          <div className="nm">{m.name}</div>
                          <div className="meta">{m.phone} • {timeAgo(m.createdAt)}</div>
                          <span className="prog-pill">{m.program}</span>
                        </div>
                      </div>
                    </div>
                    {m.message && <div className="body">{m.message}</div>}
                    <div className="acts">
                      <a className="btn btn-primary btn-sm" href={waLink(C.contact.whatsapp, `Halo ${m.name}, terima kasih sudah daftar di Camp 3GRT untuk program ${m.program}.`)} target="_blank" rel="noopener">Chat WhatsApp</a>
                      <button className="btn btn-ghost btn-sm" onClick={() => setRead(m.id, !m.read)}>{m.read ? "Tandai belum dibaca" : "Tandai dibaca"}</button>
                      <button className="btn btn-danger btn-sm" onClick={() => delMsg(m.id)}>Hapus</button>
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}

          {/* ---------- BRAND ---------- */}
          {panel === "brand" && (
            <div className="panel active">
              <div className="panel-intro">
                <h3>Brand & Logo</h3>
                <p>Logo, nama, dan tagline yang tampil di navbar, footer, dan tab browser.</p>
              </div>
              <div className="box">
                <ImageField
                  label="Logo (tampil di navbar & footer)"
                  value={C.brand?.logo}
                  onChange={(v) => edit((c) => { if (!c.brand) c.brand = {}; c.brand.logo = v; })}
                />
                <div className="grid-2">
                  <Field label="Nama Brand" value={C.brand?.name} onChange={(v) => edit((c) => { if (!c.brand) c.brand = {}; c.brand.name = v; })} hint="Tampil di navbar & footer" />
                  <Field label="Tagline" value={C.brand?.tagline} onChange={(v) => edit((c) => { if (!c.brand) c.brand = {}; c.brand.tagline = v; })} hint="Teks kecil di bawah nama" />
                </div>
              </div>
              <div className="box">
                <div className="box-title">Preview Navbar</div>
                <div className="brand-preview">
                  {C.brand?.logo
                    ? <img src={C.brand.logo} alt="logo" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    : <div className="brand-preview-icon"><I name="image" /></div>
                  }
                  <div>
                    <div className="brand-preview-name">{C.brand?.name || "Nama Brand"}</div>
                    <div className="brand-preview-tag">{C.brand?.tagline || "Tagline"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------- HERO ---------- */}
          {panel === "hero" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Hero / Banner</h3><p>Bagian paling atas website — kesan pertama pengunjung.</p></div>
              <div className="box">
                <Field label="Badge (teks kecil di atas judul)" value={C.hero.badge} onChange={(v) => edit((c) => (c.hero.badge = v))} />
                <div className="grid-2">
                  <Field label="Judul Baris 1 (outline)" value={C.hero.titleTop} onChange={(v) => edit((c) => (c.hero.titleTop = v))} />
                  <Field label="Judul Baris 2 (solid)" value={C.hero.titleBottom} onChange={(v) => edit((c) => (c.hero.titleBottom = v))} />
                </div>
                <Area label="Subjudul" value={C.hero.subtitle} onChange={(v) => edit((c) => (c.hero.subtitle = v))} rows={3} />
                <div className="grid-2">
                  <Field label="Teks Tombol Utama" value={C.hero.ctaPrimary} onChange={(v) => edit((c) => (c.hero.ctaPrimary = v))} />
                  <Field label="Teks Tombol Kedua" value={C.hero.ctaSecondary} onChange={(v) => edit((c) => (c.hero.ctaSecondary = v))} />
                </div>
                <ImageField label="Gambar Latar Hero" value={C.hero.bgImage} onChange={(v) => edit((c) => (c.hero.bgImage = v))} />
              </div>
            </div>
          )}

          {/* ---------- VALUES ---------- */}
          {panel === "values" && (
            <div className="panel active">
              <div className="panel-intro">
                <h3>Nilai / Ticker</h3>
                <p>Teks yang berjalan di bawah hero — nilai-nilai & semangat camp.</p>
              </div>
              <div className="box">
                <div className="fld">
                  <label>Daftar Nilai</label>
                  <TagEditor
                    values={C.values || []}
                    onChange={(arr) => edit((c) => (c.values = arr))}
                  />
                  <div className="hint">Ketik lalu Enter untuk menambah nilai baru. Klik × untuk menghapus.</div>
                </div>
                <div className="values-preview">
                  {(C.values || []).map((v, i) => (
                    <span key={i} className="values-chip">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- ABOUT ---------- */}
          {panel === "about" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Tentang Kami</h3><p>Cerita & angka-angka penting tentang camp.</p></div>
              <div className="box">
                <Field label="Judul" value={C.about.heading} onChange={(v) => edit((c) => (c.about.heading = v))} />
                <Area label="Kalimat Pembuka" value={C.about.lead} onChange={(v) => edit((c) => (c.about.lead = v))} rows={2} />
                <Area label="Deskripsi" value={C.about.body} onChange={(v) => edit((c) => (c.about.body = v))} rows={4} />
                <ImageField label="Foto" value={C.about.image} onChange={(v) => edit((c) => (c.about.image = v))} />
              </div>
              <div className="box">
                <div className="box-title">Statistik</div>
                {C.about.stats.map((s, i) => (
                  <div className="item-card" key={i}>
                    <div className="item-head">
                      <span className="tag">Statistik {i + 1}</span>
                      <div className="item-actions"><button className="icon-btn del" title="Hapus" onClick={() => edit((c) => c.about.stats.splice(i, 1))}><I name="trash" /></button></div>
                    </div>
                    <div className="grid-2">
                      <Field label="Angka" value={s.value} onChange={(v) => edit((c) => (c.about.stats[i].value = v))} />
                      <Field label="Keterangan" value={s.label} onChange={(v) => edit((c) => (c.about.stats[i].label = v))} />
                    </div>
                  </div>
                ))}
                <AddBtn label="Tambah Statistik" onClick={() => edit((c) => c.about.stats.push({ value: "0", label: "Keterangan" }))} />
              </div>
            </div>
          )}

          {/* ---------- PROGRAMS ---------- */}
          {panel === "programs" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Program Latihan</h3><p>Kelola daftar kelas/program yang ditawarkan.</p></div>
              {C.programs.map((p, i) => (
                <ItemCard key={p.id || i} tag={p.name || "Program"} onUp={() => move("programs", i, -1)} onDown={() => move("programs", i, 1)} onDelete={() => edit((c) => c.programs.splice(i, 1))}>
                  <div className="grid-2">
                    <Field label="Nama Program" value={p.name} onChange={(v) => edit((c) => (c.programs[i].name = v))} />
                    <Field label="Level / Badge" value={p.level} onChange={(v) => edit((c) => (c.programs[i].level = v))} />
                  </div>
                  <SelectField label="Ikon" value={p.icon} options={ICON_OPTIONS} onChange={(v) => edit((c) => (c.programs[i].icon = v))} />
                  <Area label="Deskripsi" value={p.desc} onChange={(v) => edit((c) => (c.programs[i].desc = v))} rows={2} />
                </ItemCard>
              ))}
              <AddBtn label="Tambah Program" onClick={() => edit((c) => c.programs.push({ id: "p" + Date.now(), icon: "boxing", name: "Program Baru", level: "Semua Level", desc: "" }))} />
            </div>
          )}

          {/* ---------- COACHES ---------- */}
          {panel === "coaches" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Tim Coach</h3><p>Profil pelatih yang tampil di website.</p></div>
              {C.coaches.map((co, i) => (
                <ItemCard key={co.id || i} tag={co.name || "Coach"} onUp={() => move("coaches", i, -1)} onDown={() => move("coaches", i, 1)} onDelete={() => edit((c) => c.coaches.splice(i, 1))}>
                  <Field label="Nama" value={co.name} onChange={(v) => edit((c) => (c.coaches[i].name = v))} />
                  <Field label="Jabatan / Spesialisasi" value={co.role} onChange={(v) => edit((c) => (c.coaches[i].role = v))} />
                  <ImageField label="Foto" value={co.image} onChange={(v) => edit((c) => (c.coaches[i].image = v))} />
                  <Area label="Bio Singkat" value={co.bio} onChange={(v) => edit((c) => (c.coaches[i].bio = v))} rows={3} />
                  <div className="fld" style={{ marginBottom: 0 }}>
                    <label>Keahlian (tag)</label>
                    <TagEditor values={co.specialties} onChange={(arr) => edit((c) => (c.coaches[i].specialties = arr))} />
                  </div>
                </ItemCard>
              ))}
              <AddBtn label="Tambah Coach" onClick={() => edit((c) => c.coaches.push({ id: "c" + Date.now(), name: "Coach Baru", role: "", image: "", bio: "", specialties: [] }))} />
            </div>
          )}

          {/* ---------- SCHEDULE ---------- */}
          {panel === "schedule" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Jadwal Kelas</h3><p>Atur jadwal mingguan. Kosongkan sesi untuk hari libur.</p></div>
              {C.schedule.map((d, i) => (
                <ItemCard key={i} tag={d.day || "Hari"} onUp={() => move("schedule", i, -1)} onDown={() => move("schedule", i, 1)} onDelete={() => edit((c) => c.schedule.splice(i, 1))}>
                  <Field label="Nama Hari" value={d.day} onChange={(v) => edit((c) => (c.schedule[i].day = v))} />
                  <div style={{ marginTop: 6 }}>
                    {(d.sessions || []).map((s, j) => (
                      <div key={j} className="box" style={{ background: "var(--surface)", padding: 14, marginBottom: 10 }}>
                        <div className="item-head" style={{ marginBottom: 10 }}>
                          <span className="tag">Sesi {j + 1}</span>
                          <div className="item-actions"><button className="icon-btn del" title="Hapus sesi" onClick={() => edit((c) => c.schedule[i].sessions.splice(j, 1))}><I name="trash" /></button></div>
                        </div>
                        <div className="grid-2">
                          <Field label="Jam" value={s.time} onChange={(v) => edit((c) => (c.schedule[i].sessions[j].time = v))} />
                          <Field label="Nama Kelas" value={s.name} onChange={(v) => edit((c) => (c.schedule[i].sessions[j].name = v))} />
                        </div>
                        <Field label="Coach" value={s.coach} onChange={(v) => edit((c) => (c.schedule[i].sessions[j].coach = v))} />
                      </div>
                    ))}
                    <button className="btn btn-ghost btn-sm" onClick={() => edit((c) => c.schedule[i].sessions.push({ time: "16:00", name: "Kelas", coach: "Coach" }))}><I name="plus" /> Tambah Sesi</button>
                  </div>
                </ItemCard>
              ))}
              <AddBtn label="Tambah Hari" onClick={() => edit((c) => c.schedule.push({ day: "Hari", sessions: [] }))} />
            </div>
          )}

          {/* ---------- PRICING ---------- */}
          {panel === "pricing" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Membership &amp; Harga</h3><p>Atur paket harga. Centang satu paket sebagai "Paling Favorit".</p></div>
              {C.pricing.map((p, i) => (
                <ItemCard key={p.id || i} tag={p.name || "Paket"} onUp={() => move("pricing", i, -1)} onDown={() => move("pricing", i, 1)} onDelete={() => edit((c) => c.pricing.splice(i, 1))}>
                  <div className="grid-2">
                    <Field label="Nama Paket" value={p.name} onChange={(v) => edit((c) => (c.pricing[i].name = v))} />
                    <Field label="Harga (tanpa Rp)" value={p.price} onChange={(v) => edit((c) => (c.pricing[i].price = v))} hint="contoh: 300.000" />
                  </div>
                  <div className="grid-2">
                    <Field label="Periode" value={p.period} onChange={(v) => edit((c) => (c.pricing[i].period = v))} hint="contoh: / bulan" />
                    <Field label="Teks Tombol" value={p.cta} onChange={(v) => edit((c) => (c.pricing[i].cta = v))} />
                  </div>
                  <CheckField label="Tandai sebagai paket Paling Favorit" checked={p.popular} onChange={(v) => edit((c) => (c.pricing[i].popular = v))} />
                  <Area label="Deskripsi singkat" value={p.desc} onChange={(v) => edit((c) => (c.pricing[i].desc = v))} rows={2} />
                  <div className="fld" style={{ marginBottom: 0 }}>
                    <label>Fitur / Benefit (tag)</label>
                    <TagEditor values={p.features} onChange={(arr) => edit((c) => (c.pricing[i].features = arr))} />
                  </div>
                </ItemCard>
              ))}
              <AddBtn label="Tambah Paket" onClick={() => edit((c) => c.pricing.push({ id: "h" + Date.now(), name: "Paket Baru", price: "0", period: "/ bulan", popular: false, desc: "", features: [], cta: "Pilih Paket" }))} />
            </div>
          )}

          {/* ---------- TESTIMONIALS ---------- */}
          {panel === "testimonials" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Testimoni</h3><p>Cerita & ulasan dari member.</p></div>
              {C.testimonials.map((t, i) => (
                <ItemCard key={t.id || i} tag={t.name || "Testimoni"} onUp={() => move("testimonials", i, -1)} onDown={() => move("testimonials", i, 1)} onDelete={() => edit((c) => c.testimonials.splice(i, 1))}>
                  <div className="grid-2">
                    <Field label="Nama" value={t.name} onChange={(v) => edit((c) => (c.testimonials[i].name = v))} />
                    <Field label="Keterangan (mis. Member Group)" value={t.role} onChange={(v) => edit((c) => (c.testimonials[i].role = v))} />
                  </div>
                  <SelectField label="Rating Bintang" value={String(t.rating || 5)} options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: n + " Bintang" }))} onChange={(v) => edit((c) => (c.testimonials[i].rating = parseInt(v, 10)))} />
                  <Area label="Isi Testimoni" value={t.quote} onChange={(v) => edit((c) => (c.testimonials[i].quote = v))} rows={3} />
                </ItemCard>
              ))}
              <AddBtn label="Tambah Testimoni" onClick={() => edit((c) => c.testimonials.push({ id: "t" + Date.now(), name: "Nama Member", role: "Member", rating: 5, quote: "" }))} />
            </div>
          )}

          {/* ---------- FAQ ---------- */}
          {panel === "faq" && (
            <div className="panel active">
              <div className="panel-intro"><h3>FAQ</h3><p>Pertanyaan yang sering ditanyakan calon member.</p></div>
              {C.faq.map((f, i) => (
                <ItemCard key={i} tag={"Pertanyaan " + (i + 1)} onUp={() => move("faq", i, -1)} onDown={() => move("faq", i, 1)} onDelete={() => edit((c) => c.faq.splice(i, 1))}>
                  <Field label="Pertanyaan" value={f.q} onChange={(v) => edit((c) => (c.faq[i].q = v))} />
                  <Area label="Jawaban" value={f.a} onChange={(v) => edit((c) => (c.faq[i].a = v))} rows={3} />
                </ItemCard>
              ))}
              <AddBtn label="Tambah Pertanyaan" onClick={() => edit((c) => c.faq.push({ q: "Pertanyaan baru?", a: "" }))} />
            </div>
          )}

          {/* ---------- GALLERY ---------- */}
          {panel === "gallery" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Galeri</h3><p>Foto suasana latihan & fasilitas camp.</p></div>
              {C.gallery.map((g, i) => (
                <ItemCard key={i} tag={"Foto " + (i + 1)} onUp={() => move("gallery", i, -1)} onDown={() => move("gallery", i, 1)} onDelete={() => edit((c) => c.gallery.splice(i, 1))}>
                  <ImageField label="Gambar" value={g.image} onChange={(v) => edit((c) => (c.gallery[i].image = v))} />
                  <Field label="Caption" value={g.caption} onChange={(v) => edit((c) => (c.gallery[i].caption = v))} />
                </ItemCard>
              ))}
              <AddBtn label="Tambah Foto" onClick={() => edit((c) => c.gallery.push({ image: "", caption: "Caption foto" }))} />
            </div>
          )}

          {/* ---------- CONTACT ---------- */}
          {panel === "contact" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Kontak</h3><p>Nomor, lokasi, jam buka, sosial media, dan peta.</p></div>
              <div className="box">
                <Field label="Nomor Telepon (tampil)" value={C.contact.phone} onChange={(v) => edit((c) => (c.contact.phone = v))} hint="contoh: 0895-2437-8203" />
                <Field label="Nomor WhatsApp (format 62...)" value={C.contact.whatsapp} onChange={(v) => edit((c) => (c.contact.whatsapp = v))} hint="contoh: 6289524378203 (tanpa + atau spasi)" />
                <Field label="Alamat / Lokasi" value={C.contact.address} onChange={(v) => edit((c) => (c.contact.address = v))} />
                <Field label="Jam Buka" value={C.contact.hoursWeekday} onChange={(v) => edit((c) => (c.contact.hoursWeekday = v))} />
                <Field label="Catatan Jam (opsional)" value={C.contact.hoursWeekend} onChange={(v) => edit((c) => (c.contact.hoursWeekend = v))} />
                <Field label="Email (opsional)" value={C.contact.email} onChange={(v) => edit((c) => (c.contact.email = v))} />
              </div>
              <div className="box">
                <div className="box-title">Sosial Media</div>
                <div className="grid-2">
                  <Field label="Instagram (username)" value={C.contact.instagram} onChange={(v) => edit((c) => (c.contact.instagram = v))} />
                  <Field label="TikTok (username)" value={C.contact.tiktok} onChange={(v) => edit((c) => (c.contact.tiktok = v))} />
                </div>
                <div className="grid-2">
                  <Field label="Facebook" value={C.contact.facebook} onChange={(v) => edit((c) => (c.contact.facebook = v))} />
                  <Field label="YouTube" value={C.contact.youtube} onChange={(v) => edit((c) => (c.contact.youtube = v))} />
                </div>
              </div>
              <div className="box">
                <div className="box-title">Peta Google Maps</div>
                <Area label="URL Embed Peta Google Maps" value={C.contact.mapsEmbed} onChange={(v) => edit((c) => (c.contact.mapsEmbed = v))} rows={2} hint='Buka Google Maps → cari lokasi → klik Bagikan → tab "Sematkan peta" → klik "SALIN HTML" → ambil hanya URL di dalam src="..." (harus dimulai dengan https://www.google.com/maps/embed)' />
                {C.contact.mapsEmbed && !C.contact.mapsEmbed.includes("google.com/maps/embed") && (
                  <p style={{ color: "#f59e0b", fontSize: "0.8rem", marginTop: "0.4rem" }}>
                    ⚠ URL ini bukan format embed. Peta tidak akan tampil. Gunakan URL dari tab "Sematkan peta", bukan link berbagi biasa.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ---------- SETTINGS ---------- */}
          {panel === "settings" && (
            <div className="panel active">
              <div className="panel-intro"><h3>Pengaturan</h3><p>Kelola kata sandi, backup, dan reset.</p></div>
              <div className="box">
                <div className="box-title">Ganti Kata Sandi</div>
                <Field label="Sandi Lama" type="password" value={pw.current} onChange={(v) => setPw((s) => ({ ...s, current: v }))} />
                <Field label="Sandi Baru" type="password" value={pw.next} onChange={(v) => setPw((s) => ({ ...s, next: v }))} />
                <Field label="Ulangi Sandi Baru" type="password" value={pw.confirm} onChange={(v) => setPw((s) => ({ ...s, confirm: v }))} />
                <button className="btn btn-primary" onClick={changePassword}>Simpan Sandi Baru</button>
              </div>
              <div className="box">
                <div className="box-title">Backup Data</div>
                <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 14 }}>Unduh salinan seluruh konten website sebagai file cadangan (.json).</p>
                <button className="btn btn-outline" onClick={exportData}>⬇ Export Data (.json)</button>
              </div>
              <div className="box">
                <div className="box-title" style={{ color: "#ff7a85" }}>Zona Berbahaya</div>
                <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 14 }}>Kembalikan konten ke pengaturan awal pabrik. Semua hasil editmu akan hilang setelah disimpan.</p>
                <button className="btn btn-danger" onClick={resetContent}>Reset Konten ke Default</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============ TOAST ============ */}
      <div className={"toast" + (toast.show ? " show" : "") + (toast.ok ? " ok" : "")}>
        {toast.ok && <I name="check" />}
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}
