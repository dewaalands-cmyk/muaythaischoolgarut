"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Kata sandi salah");
        setLoading(false);
      }
    } catch {
      setError("Tidak bisa terhubung ke server. Pastikan database sudah dikonfigurasi.");
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo-wrap">
          <img
            className="login-logo"
            src="/images/logo.jpg"
            alt="Logo Camp 3GRT"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <div className="login-brand">
          <span className="login-brand-name">Camp 3GRT</span>
          <span className="login-brand-tag">Admin Dashboard</span>
        </div>
        <p className="login-sub">Muaythai School Garut</p>

        <div className="login-divider" />

        <div className="fld">
          <label>Kata Sandi Admin</label>
          <input
            type="password"
            value={password}
            placeholder="Masukkan kata sandi"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            autoFocus
          />
        </div>

        {error && <div className="login-err-box">{error}</div>}

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: "0.5rem" }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk Dashboard"}
        </button>

        <div className="login-hint">
          Sandi default: <code>admin3grt</code>
          <br />Ganti sandi setelah masuk lewat menu Pengaturan.
        </div>
      </div>
    </div>
  );
}
