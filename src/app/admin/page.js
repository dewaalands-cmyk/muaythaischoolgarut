import { getSiteContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import AdminApp from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getSiteContent();

  let messages = [];
  try {
    messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch (e) {
    messages = [];
  }
  // ubah Date -> string supaya bisa dikirim ke komponen client
  const initialMessages = messages.map((m) => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    program: m.program,
    message: m.message,
    read: m.read,
    createdAt: m.createdAt.toISOString(),
  }));

  return <AdminApp initialContent={content} initialMessages={initialMessages} />;
}
