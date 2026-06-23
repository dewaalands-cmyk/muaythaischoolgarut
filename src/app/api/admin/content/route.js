import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";

async function checkAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = await getSiteContent();
  return NextResponse.json(content);
}

async function fixMapsUrl(url) {
  if (!url) return url;
  if (url.includes("google.com/maps/embed") || url.includes("output=embed")) return url;
  // Short link or share link — follow redirect to get full URL, convert to embed
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const full = res.url;
    const match = full.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) return `https://maps.google.com/maps?q=${match[1]},${match[2]}&z=17&output=embed`;
  } catch {}
  return url;
}

export async function PUT(request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await request.json();
    if (data.contact?.mapsEmbed) {
      data.contact.mapsEmbed = await fixMapsUrl(data.contact.mapsEmbed);
    }
    await saveSiteContent(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[content PUT]", e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
