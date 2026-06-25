// Util token sesi admin (aman dipakai di middleware/edge maupun server).
// Hanya pakai "jose" (tidak pakai next/headers) supaya kompatibel edge.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "3grt_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari (detik)

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  // Di production, WAJIB ada secret kuat. Tanpa ini, token sesi bisa dipalsukan
  // siapa pun yang tahu nilai default (yang ada di kode publik) — jadi kita
  // menolak, bukan diam-diam memakai default yang lemah.
  if (!secret || secret.length < 16) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "AUTH_SECRET belum diset / terlalu pendek. Set AUTH_SECRET (≥32 karakter acak) di environment Vercel."
      );
    }
    // Hanya untuk pengembangan lokal.
    return new TextEncoder().encode(secret || "dev-only-insecure-secret-change-me");
  }
  return new TextEncoder().encode(secret);
}

// Buat token sesi (JWT, berlaku 7 hari).
export async function createSessionToken() {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

// Verifikasi token. Return payload kalau valid, null kalau tidak.
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}
