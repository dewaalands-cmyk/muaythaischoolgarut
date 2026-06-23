// Seed database: isi konten default + buat akun admin default.
// Jalankan: npm run db:seed
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { defaultContent } = require("../src/lib/defaultContent");

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = "admin3grt";

async function main() {
  // 1. Isi konten website (kalau belum ada)
  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {}, // jangan timpa kalau sudah ada
    create: { id: 1, data: defaultContent },
  });
  console.log("✓ Konten website siap.");

  // 2. Buat akun admin default (kalau belum ada)
  const existing = await prisma.adminUser.findUnique({ where: { username: "admin" } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    await prisma.adminUser.create({ data: { username: "admin", passwordHash } });
    console.log('✓ Akun admin dibuat. Sandi default: "' + DEFAULT_PASSWORD + '" (WAJIB diganti).');
  } else {
    console.log("✓ Akun admin sudah ada.");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
