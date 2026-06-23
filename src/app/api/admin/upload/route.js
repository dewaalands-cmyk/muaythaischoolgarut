import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

async function checkAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !file.name) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Ukuran file maksimal 5 MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40);
    const filename = `3grt/${Date.now()}-${safeName}.${ext}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: simpan ke Vercel Blob (CDN global, persisten)
      const { put } = await import("@vercel/blob");
      const blob = await put(filename, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    }

    // Development fallback: simpan ke public/images/
    const { writeFile, mkdir } = await import("fs/promises");
    const path = await import("path");
    const localName = `${Date.now()}-${safeName}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images");
    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, localName), Buffer.from(bytes));
    return NextResponse.json({ url: `/images/${localName}` });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: String(e?.message || "Upload gagal") }, { status: 500 });
  }
}
