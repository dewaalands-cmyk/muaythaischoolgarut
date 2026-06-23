# Camp 3GRT — Website + CMS (Versi Database)

Website Muaythai School Garut **dengan database**, dibuat oleh **Pagiverse Studio**.
Stack: **Next.js 14 (App Router) + Prisma + PostgreSQL (Neon) + Tailwind**.

Bedanya dengan versi statis: di sini **editan dari dashboard langsung live ke semua
pengunjung** (tersimpan di database, bukan di browser), bisa diakses & diedit dari
**HP/perangkat mana pun**, dan tetap **SEO-friendly** karena halaman di-render dari server.

---

## ✨ Fitur

- Website publik (Hero, Tentang, Program, Coach, Jadwal, Harga, Testimoni, Galeri, FAQ, Kontak)
- Dashboard admin untuk edit semua konten tanpa ngoding (`/admin`)
- Form pendaftaran → tersimpan di database → muncul di menu **Pesan Masuk**
- Login admin aman (password di-hash bcrypt + sesi cookie httpOnly)
- SEO: server-rendered, meta tags, Open Graph, Schema.org

---

## 🚀 Cara Menjalankan (Lokal)

### 1. Install dependency
```bash
npm install
```

### 2. Siapkan database Neon (gratis)
1. Daftar di [neon.tech](https://neon.tech) → buat project baru.
2. Salin **connection string** (pilih yang **Pooled connection** untuk Vercel).

### 3. Buat file `.env`
Salin dari `.env.example`, lalu isi:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
AUTH_SECRET="string-acak-panjang-rahasia"
```
> Bikin `AUTH_SECRET` acak, misal dari: `openssl rand -base64 32`

### 4. Buat tabel & isi data awal
```bash
npm run db:push     # bikin tabel di database
npm run db:seed     # isi konten default + akun admin
```

### 5. Jalankan
```bash
npm run dev
```
- Website: `http://localhost:3000`
- Dashboard: `http://localhost:3000/admin`  (sandi default: **`admin3grt`**)

---

## ☁️ Deploy ke Vercel

1. Push project ini ke GitHub (pakai **VS Code + GitHub Desktop**, jangan upload manual).
2. Di [vercel.com](https://vercel.com): **Add New → Project → Import** repo-nya.
3. Di **Environment Variables**, isi:
   - `DATABASE_URL` → connection string Neon (**Pooled**)
   - `AUTH_SECRET` → string acak yang sama
4. Klik **Deploy**.
5. Setelah deploy, jalankan sekali untuk isi database (dari komputer, dengan `.env`
   yang `DATABASE_URL`-nya menunjuk ke database produksi):
   ```bash
   npm run db:push
   npm run db:seed
   ```

> Build command sudah otomatis menjalankan `prisma generate` (lihat `package.json`).

---

## 📁 Struktur Penting

```
src/
├── app/
│   ├── page.js              → Website publik (server-rendered dari DB)
│   ├── layout.js            → Layout + SEO meta
│   ├── globals.css          → Styling website
│   ├── admin/               → Dashboard admin (login + panel editor)
│   └── api/                 → API: contact, auth, admin (content/messages/password)
├── components/
│   ├── site/                → Komponen website (Navbar, Form, FAQ, dll)
│   └── admin/AdminApp.jsx   → Aplikasi dashboard
└── lib/                     → prisma, auth, content, dll
prisma/
├── schema.prisma            → Struktur database
└── seed.js                  → Data awal + akun admin
public/images/               → Semua foto (logo, coach, dll)
```

---

## ⚠️ Penting Sebelum Diserahkan ke Klien

1. **Ganti `AUTH_SECRET`** dengan string acak yang kuat (jangan pakai contoh).
2. **Ganti sandi admin** setelah login pertama (menu Pengaturan).
3. **Ganti data contoh** lewat dashboard: harga, testimoni, statistik, alamat lengkap,
   embed Google Maps, username sosial media.
4. **Foto**: taruh di folder `public/images/`, lalu di dashboard tulis `/images/nama.jpg`.

---

## 🔧 Perintah Berguna

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan mode development |
| `npm run build` | Build untuk produksi |
| `npm run db:push` | Terapkan skema ke database |
| `npm run db:seed` | Isi data awal + akun admin |
| `npm run db:studio` | Buka Prisma Studio (lihat isi database) |

---

Dibuat oleh **Pagiverse Studio** — jasa pembuatan website.
