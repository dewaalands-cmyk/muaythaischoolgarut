const formatPackage = (name, price, period) => {
  const amount = String(price ?? "").trim();
  if (!amount) return name;
  return /^[\d.,\s]+$/.test(amount)
    ? `${name} | Rp ${amount}${period || ""}`
    : `${name} | ${amount}`;
};

export const T = {
  id: {
    nav: {
      about: "Tentang", programs: "Program", coach: "Coach", schedule: "Jadwal",
      pricing: "Harga", testimonials: "Testimoni", gallery: "Galeri", contact: "Kontak",
    },
    hero: { location: "Garut, Jawa Barat", level: "Pemula sampai Atlet", scroll: "Jelajahi Camp" },
    about: { eyebrow: "Camp 3GRT X NGM", badge: "Muaythai School Garut" },
    programs: {
      eyebrow: "01 / Program",
      title: "Cara Berlatih", titleHl: "di Camp",
      sub: "Kelas kelompok, sesi personal, dan Muay Kids. Tanyakan detail kelas privat serta program pendamping kepada admin.",
    },
    coaches: {
      eyebrow: "02 / Coach",
      title: "Kenali", titleHl: "Coach Kami",
      sub: "Orang-orang yang mendampingi latihan di Camp 3GRT.",
    },
    schedule: {
      eyebrow: "Jadwal Kelas",
      title: "Cari Waktu", titleHl: "Latihanmu",
      sub: "Camp buka Senin sampai Minggu, 09.00-22.00 WIB. Pilih sesi pada jadwal berikut, lalu konfirmasi kepada admin.",
      empty: "Belum ada sesi terjadwal",
    },
    pricing: {
      eyebrow: "Paket Latihan",
      title: "Biaya", titleHl: "Latihan",
      sub: "Mulai dari satu pertemuan hingga paket bulanan. Hubungi admin untuk jadwal dan biaya sesi privat.",
      popular: "Paket Pilihan",
      defaultCta: "Tanya Paket",
      waMsg: (name) => `Halo Camp 3GRT, saya ingin tanya jadwal dan ketentuan paket ${name}.`,
    },
    testimonials: {
      eyebrow: "Dari Member",
      title: "Catatan", titleHl: "Latihan",
      sub: "Pengalaman latihan yang dibagikan member Camp 3GRT.",
    },
    gallery: {
      eyebrow: "Dokumentasi Camp",
      title: "Di Dalam", titleHl: "dan Di Ring",
      sub: "Sasana, kelas anak, dan dokumentasi kompetisi Camp 3GRT.",
    },
    faq: { eyebrow: "Sebelum Datang", title: "Yang Sering", titleHl: "Ditanyakan" },
    cta: {
      title: "Mau Ikut Sesi Berikutnya?",
      sub: "Sebutkan program dan waktu yang kamu inginkan. Admin akan membantu cek pilihan kelasnya.",
      btn: "Tanya Jadwal",
    },
    contact: {
      eyebrow: "Kontak & Lokasi",
      title: "Hubungi", titleHl: "Admin Camp",
      sub: "Tanyakan jadwal, paket, atau kebutuhan latihan lewat formulir atau WhatsApp.",
      location: "Lokasi", mapTitle: "Lokasi Camp 3GRT",
    },
    partners: {
      eyebrow: "Terhubung dengan Camp",
      title: "Rekan", titleHl: "Kami",
      sub: "Organisasi dan usaha yang terhubung dengan Camp 3GRT.",
      visit: "Kunjungi Website",
    },
    footer: {
      nav: "NAVIGASI", about: "Tentang", programs: "Program", coach: "Coach", schedule: "Jadwal",
      programsHeader: "PROGRAM", contactHeader: "KONTAK",
      rights: (y) => `© ${y} Camp 3GRT Muaythai School Garut. All rights reserved.`,
      madeBy: "Dibuat oleh",
    },
    form: {
      name: "Nama Lengkap", namePh: "Nama kamu",
      phone: "No. WhatsApp", phonePh: "08xx-xxxx-xxxx",
      package: "Paket yang Diminati", packageDefault: "Pilih Paket",
      packageOther: "Lainnya / Tanya Dulu",
      message: "Pesan (opsional)", messagePh: "Program, jadwal, atau hal yang ingin ditanyakan",
      submit: "Kirim Pesan", sending: "Mengirim...",
      success: "Pesan terkirim. Admin akan menghubungimu.",
      successWa: "Atau chat langsung via WhatsApp →",
      error: "Gagal mengirim. Coba lagi atau hubungi via WhatsApp.",
      waMsg: (name) => `Halo, saya ${name} ingin tanya soal kelas Muay Thai.`,
      fmtPkg: formatPackage,
    },
  },
  en: {
    nav: {
      about: "About", programs: "Programs", coach: "Coaches", schedule: "Schedule",
      pricing: "Pricing", testimonials: "Reviews", gallery: "Gallery", contact: "Contact",
    },
    hero: { location: "Garut, West Java", level: "Beginner to Athlete", scroll: "Explore the Camp" },
    about: { eyebrow: "Camp 3GRT X NGM", badge: "Muaythai School Garut" },
    programs: {
      eyebrow: "01 / Programs",
      title: "Training", titleHl: "at the Camp",
      sub: "Group classes, personal sessions, and Muay Kids. Ask the admin about private classes and supporting programs.",
    },
    coaches: {
      eyebrow: "02 / Coaches",
      title: "Meet", titleHl: "Your Coaches",
      sub: "The people who lead training at Camp 3GRT.",
    },
    schedule: {
      eyebrow: "Class Timetable",
      title: "Find Your", titleHl: "Training Time",
      sub: "Camp is open Monday to Sunday, 09:00-22:00 WIB. Choose a session below and confirm with the admin.",
      empty: "No scheduled sessions yet",
    },
    pricing: {
      eyebrow: "Training Plans",
      title: "Training", titleHl: "Fees",
      sub: "From a single session to monthly plans. Contact the admin for private session scheduling and pricing.",
      popular: "Featured Plan",
      defaultCta: "Ask About Plan",
      waMsg: (name) => `Hello Camp 3GRT, I'd like to ask about the schedule and terms for the ${name} plan.`,
    },
    testimonials: {
      eyebrow: "From Our Members",
      title: "Training", titleHl: "Notes",
      sub: "Training experiences shared by Camp 3GRT members.",
    },
    gallery: {
      eyebrow: "Camp in Pictures",
      title: "In the Camp", titleHl: "and the Ring",
      sub: "The gym, children's classes, and competition moments from Camp 3GRT.",
    },
    faq: { eyebrow: "Before You Visit", title: "Common", titleHl: "Questions" },
    cta: {
      title: "Joining the Next Session?",
      sub: "Tell us your preferred program and time. The admin can help check the available classes.",
      btn: "Ask About Classes",
    },
    contact: {
      eyebrow: "Contact & Location",
      title: "Talk to", titleHl: "the Camp Admin",
      sub: "Ask about schedules, plans, or training through the form or WhatsApp.",
      location: "Location", mapTitle: "Camp 3GRT Location",
    },
    partners: {
      eyebrow: "Connected to the Camp",
      title: "Our", titleHl: "Partners",
      sub: "Organizations and businesses connected to Camp 3GRT.",
      visit: "Visit Website",
    },
    footer: {
      nav: "NAVIGATION", about: "About", programs: "Programs", coach: "Coaches", schedule: "Schedule",
      programsHeader: "PROGRAMS", contactHeader: "CONTACT",
      rights: (y) => `© ${y} Camp 3GRT Muaythai School Garut. All rights reserved.`,
      madeBy: "Made by",
    },
    form: {
      name: "Full Name", namePh: "Your name",
      phone: "WhatsApp Number", phonePh: "08xx-xxxx-xxxx",
      package: "Package of Interest", packageDefault: "Select Package",
      packageOther: "Other / Ask First",
      message: "Message (optional)", messagePh: "Your preferred program, schedule, or question",
      submit: "Send Message", sending: "Sending...",
      success: "Message sent. The admin will contact you.",
      successWa: "Or chat directly via WhatsApp →",
      error: "Failed to send. Try again or contact us via WhatsApp.",
      waMsg: (name) => `Hello, I'm ${name} and I'd like to ask about Muay Thai classes.`,
      fmtPkg: formatPackage,
    },
  },
};
