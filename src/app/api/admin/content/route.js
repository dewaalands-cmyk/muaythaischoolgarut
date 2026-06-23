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

export async function PUT(request) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await request.json();
    await saveSiteContent(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[content PUT]", e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
