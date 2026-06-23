// Util token sesi admin (aman dipakai di middleware/edge maupun server).
// Hanya pakai "jose" (tidak pakai next/headers) supaya kompatibel edge.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "3grt_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari (detik)

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || "dev-secret-ganti-di-produksi";
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
