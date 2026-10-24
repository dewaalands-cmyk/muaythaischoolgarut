// Presentation-only curation. Saved CMS content remains untouched.
const textKey = (value) => typeof value === "string"
  ? value.trim().replace(/\s+/g, " ")
  : "";

const known = (value, alternatives, replacement) => alternatives.some((item) => textKey(item) === textKey(value))
  ? replacement
  : value;

// Only these exact published files have equivalent optimized local copies.
// New CMS uploads and external/custom image paths keep their original values.
const knownAssetPaths = {
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782214723636-logo.jpg": "/images/camp/logo.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782833404331-chatgpt-image-30-jun-2026-21-12-48.png": "/images/camp/hero.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782215593903-atlit-coach.png": "/images/camp/team-display.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782215655768-coach-yunas.jpg": "/images/camp/coach-yunas.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782222499433-coach-okky.jpg": "/images/camp/coach-okky.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782222543303-coach-dio.jpg": "/images/camp/coach-dio.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782215758487-interior-camp.png": "/images/camp/interior-display.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782215790160-muaykids.jpg": "/images/camp/muay-kids.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782222768261-kompetisi.jpg": "/images/camp/competition.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782222806903-2.jpg": "/images/camp/competition-team.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782220727546-img-20260531-wa0029.jpg": "/images/camp/partner-nita-gennaro.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782220762566-img-20260531-wa0031.jpg": "/images/camp/partner-3grt-management.webp",
  "https://blxqmbfjpiijn15m.public.blob.vercel-storage.com/3grt/1782220919193-fight-gear.jpg": "/images/camp/partner-fight-gear.webp",
};

function withLocalAsset(item, field) {
  if (!item || typeof item !== "object") return item;
  const current = item[field];
  return typeof current === "string" && Object.prototype.hasOwnProperty.call(knownAssetPaths, current)
    ? { ...item, [field]: knownAssetPaths[current] }
    : item;
}

const seedTestimonials = [
  ["Andi S.", "Latihan di Camp 3GRT benar-benar mengubah hidupku. Fisik lebih kuat, mental lebih tangguh!"],
  ["Siti R.", "Anak saya jadi lebih disiplin dan percaya diri setelah ikut Muay Kids di sini."],
  ["Budi H.", "Coach-nya sabar dan profesional. Teknik saya berkembang pesat dalam waktu singkat."],
];

const seedStats = [
  "Atlet Juara:50+|Coach Terlatih:10+|Member Aktif:200+|Tahun Berdiri:5+",
  "Atlet Juara:15|Coach Terlatih:3|Member Aktif:50+|Tahun Berdiri:5+",
];

const programCopy = {
  p1: {
    originals: ["Latihan bersama dalam kelompok yang seru dan penuh semangat. Cocok untuk semua level."],
    originalsEn: ["Fun and energetic group training sessions suitable for all levels.", "Exercise together in groups that are fun and full of enthusiasm. Suitable for all levels."],
    desc: "Latihan Muay Thai dalam kelas kelompok. Cek jadwal untuk memilih sesi latihanmu.",
    descEn: "Muay Thai training in a group class. Check the timetable to choose your session.",
  },
  p2: {
    originals: ["Sesi privat satu-satu dengan coach untuk kemajuan yang lebih cepat dan terarah."],
    originalsEn: ["One-on-one private sessions with a coach for faster and more focused progress.", "One-on-one private sessions with a coach for faster, more targeted progress."],
    desc: "Latihan satu-satu bersama coach. Hubungi admin untuk membahas kebutuhan dan jadwal latihan.",
    descEn: "One-to-one training with a coach. Contact the admin to discuss your training needs and schedule.",
  },
  p3: {
    originals: ["Program khusus anak-anak usia 6–14 tahun. Membangun disiplin, fokus, dan kepercayaan diri."],
    originalsEn: ["Special program for children aged 6–14. Building discipline, focus, and self-confidence.", "Special program for children aged 6–14 years. Builds discipline, focus and self-confidence."],
    desc: "Kelas Muay Thai untuk anak usia 6-14 tahun. Tanyakan pilihan sesi kepada admin.",
    descEn: "Muay Thai classes for children aged 6-14. Ask the admin about available sessions.",
  },
  p4: {
    originals: ["Kelas privat dengan jadwal fleksibel sesuai kesibukanmu."],
    originalsEn: ["Private class with flexible scheduling to fit your busy lifestyle.", "Private classes with a flexible schedule to suit your busy schedule."],
    desc: "Kelas privat dengan jadwal yang disepakati bersama coach.",
    descEn: "Private classes with a schedule arranged with your coach.",
  },
};

const coachCopy = [
  {
    bios: ["Coach Yunas adalah pelatih kepala Camp 3GRT dengan pengalaman lebih dari 10 tahun di dunia Muay Thai. Telah melatih ratusan atlet dari berbagai daerah."],
    biosEn: ["Coach Yunas is the head coach of Camp 3GRT with more than 10 years of experience in the world of Muay Thai. Has trained hundreds of athletes from various regions."],
    bio: "Pelatih kepala dan founder Camp 3GRT. Fokus pada sparring, kondisi fisik, teknik lanjutan, dan nutrisi.",
    bioEn: "Head coach and founder of Camp 3GRT. Focuses on sparring, physical conditioning, advanced technique, and nutrition.",
  },
  {
    bios: ["Coach Okky adalah pelatih sekaligus founder di Camp 3GRT, fokus mengajarkan combat sports strength & teknik Muay Thai untuk berbagai kalangan, mulai dari anak-anak, wanita, hingga atlet dewasa. Menggunakan pendekatan yang disiplin namun tetap fun dan kompetitif, Coach Okky dikenal mampu membentuk karakter sekaligus kemampuan teknis murid-muridnya."],
    biosEn: ["Coach Okky is a trainer and founder at Camp 3GRT, focusing on teaching combat sports strength & Muay Thai techniques to various groups, from children, women, to adult athletes. Using a disciplined but still fun and competitive approach, Coach Okky is known to be able to shape the character and technical abilities of his students."],
    bio: "Coach dan founder dengan fokus teknik Muay Thai serta latihan kekuatan untuk combat sport, termasuk pendampingan atlet dewasa.",
    bioEn: "Coach and founder focusing on Muay Thai technique and strength for combat sports, including adult athlete training.",
  },
  {
    bios: ["Coach Dio adalah pelatih berpengalaman di Camp 3GRT yang menjunjung tinggi nilai disiplin, fokus, kekuatan, dan rasa hormat dalam setiap sesi latihan. Dengan filosofi \"Train Hard, Fight Easy\", Coach Dio membina murid untuk membangun kekuatan fisik sekaligus mental yang tangguh, dengan teknik yang sudah teruji."],
    biosEn: ["Coach Dio is an experienced coach at Camp 3GRT who upholds the values ​​of discipline, focus, strength and respect in every training session. With the philosophy of \"Train Hard, Fight Easy\", Coach Dio trains students to develop physical and mental strength, using proven techniques."],
    bio: "Melatih teknik Muay Thai dan kekuatan fisik, termasuk kelas anak-anak.",
    bioEn: "Coaches Muay Thai technique and physical strength, including children's classes.",
  },
  {
    bios: ["Coach Dio adalah pelatih kepala Camp 3GRT dengan pengalaman lebih dari 10 tahun di dunia Muay Thai. Telah melatih ratusan atlet dari berbagai daerah."],
    biosEn: ["Coach Dio is the head coach of Camp 3GRT with over 10 years of experience in Muay Thai. He has trained hundreds of athletes from various regions."],
    bio: "Melatih teknik dasar Muay Thai, sparring, dan kondisi fisik.",
    bioEn: "Coaches Muay Thai fundamentals, sparring, and physical conditioning.",
  },
];

function prepareProgram(program) {
  if (!program || typeof program !== "object") return program;
  const copy = programCopy[program.id];
  let next = copy ? {
    ...program,
    desc: known(program.desc, copy.originals, copy.desc),
    descEn: known(program.descEn, copy.originalsEn, copy.descEn),
  } : { ...program };
  if (textKey(program.name).toLowerCase() === "diet & nutrisi") {
    next.desc = known(program.desc, ["", "Tanyakan kepada admin tentang pendampingan diet dan nutrisi yang tersedia."], "Pendampingan pola makan untuk mendukung latihan. Konsultasikan kebutuhan dan detail program bersama coach.");
    next.descEn = known(program.descEn, ["", "Ask the admin about available diet and nutrition guidance."], "Nutrition guidance to support training. Discuss your needs and program details with a coach.");
  }
  if (textKey(program.name).toLowerCase() === "weight training") {
    next.desc = known(program.desc, ["Program latihan beban guna menunjang otot rangka untuk combat sport"], "Latihan beban untuk membangun kekuatan fisik sebagai pendukung latihan Muay Thai.");
    next.descEn = known(program.descEn, ["Weight training program to support skeletal muscles for combat sports"], "Weight training to build physical strength in support of Muay Thai practice.");
  }
  if (program.name === "weight Training") next.name = "Weight Training";
  if (program.nameEn === "weight Training") next.nameEn = "Weight Training";
  return next;
}

function preparePrice(plan) {
  if (!plan || typeof plan !== "object") return plan;
  const next = {
    ...plan,
    desc: known(plan.desc, ["Coba latihan pertama kamu tanpa risiko."], "Satu sesi untuk mulai mengenal latihan di camp."),
    descEn: known(plan.descEn, ["Try your first training session with no risk.", "Try your first workout without risk."], "One session to get to know training at the camp."),
    cta: known(plan.cta, ["Coba Sekarang", "Pilih Paket Ini", "Pilih Paket"], "Tanya Paket"),
    ctaEn: known(plan.ctaEn, ["Try Now", "Choose This Package", "Choose Package", "Select Package", "Ask About This Plan"], "Ask About Plan"),
  };
  if (plan.id === "pr1") next.nameEn = known(plan.nameEn, ["Meeting"], "Single Session");
  next.nameEn = known(next.nameEn, ["4 Meetings"], "4 Sessions");
  next.nameEn = known(next.nameEn, ["8 X meetings"], "8 Sessions");
  if (!textKey(plan.periodEn)) {
    const period = textKey(plan.period);
    if (["/ bulan", "/bulan"].includes(period)) next.periodEn = "/ month";
    if (["/ 1 sesi", "/1sesi"].includes(period)) next.periodEn = "/ session";
  }
  if (plan.id === "pr2" && textKey(plan.name).toLowerCase() === "4 pertemuan") {
    next.desc = known(plan.desc, ["Latihan rutin dengan harga terjangkau."], "Empat pertemuan dalam satu bulan.");
    next.descEn = known(plan.descEn, ["Regular training at an affordable price.", "Regular training at affordable prices."], "Four sessions in one month.");
  }
  if (plan.id === "pr3" && textKey(plan.name).toLowerCase() === "8 x pertemuan") {
    next.desc = known(plan.desc, ["Hemat lebih banyak dengan komitmen."], "Delapan pertemuan dalam satu bulan.");
    next.descEn = known(plan.descEn, ["Save more with commitment."], "Eight sessions in one month.");
  }
  if (textKey(plan.price).toLowerCase() === "hubungi admin") {
    if (!textKey(plan.desc)) next.desc = "Hubungi admin untuk membahas jadwal dan biaya.";
    if (!textKey(plan.descEn)) next.descEn = "Contact the admin to discuss scheduling and pricing.";
  }
  return next;
}

/** Curate recognized seed copy without changing saved content or custom admin copy. */
export function preparePresentationContent(content) {
  if (!content || typeof content !== "object") return content;
  const result = { ...content };
  if (content.hero && typeof content.hero === "object") {
    result.hero = {
      ...content.hero,
      titleTopEn: known(content.hero.titleTopEn, ["TRAIN HARD,"], "TRAIN HARD."),
      titleBottomEn: known(content.hero.titleBottomEn, ["DISCIPLINE, CHAMPION!"], "BUILD DISCIPLINE."),
      subtitle: known(content.hero.subtitle, ["Pusat latihan Muay Thai profesional di Garut. Dari pemula hingga atlet, kami siap membimbingmu."], "Latihan Muay Thai di Garut. Kelas kelompok, sesi personal, dan Muay Kids bersama coach Camp 3GRT."),
      subtitleEn: known(content.hero.subtitleEn, ["Professional Muay Thai training center in Garut. From beginners to athletes, we're here to guide you.", "Professional Muay Thai training center in Garut. From beginners to athletes, we are ready to guide you."], "Muay Thai training in Garut. Group classes, personal sessions, and Muay Kids with the Camp 3GRT coaches."),
      ctaPrimary: known(content.hero.ctaPrimary, ["Daftar via WhatsApp"], "Tanya Jadwal"),
      ctaPrimaryEn: known(content.hero.ctaPrimaryEn, ["Register via WhatsApp"], "Ask About Classes"),
    };
  }
  if (content.about && typeof content.about === "object") {
    result.about = {
      ...content.about,
      lead: known(content.about.lead, ["Camp 3GRT adalah pusat latihan Muay Thai profesional di Garut, Jawa Barat."], "Muay Thai untuk pemula, anak-anak, dan atlet di Garut."),
      leadEn: known(content.about.leadEn, ["Camp 3GRT is a professional Muay Thai training center in Garut, West Java."], "Muay Thai for beginners, children, and athletes in Garut."),
      body: known(content.about.body, ["Didirikan dengan semangat membawa seni bela diri Muay Thai ke Garut, Camp 3GRT hadir untuk semua kalangan — dari anak-anak, remaja, hingga dewasa. Kami memiliki coach berpengalaman dan fasilitas lengkap untuk mendukung perjalanan latihanmu."], "Camp 3GRT X NGM menyediakan latihan kelompok, sesi personal, dan Muay Kids. Kenali coach, cek jadwal mingguan, lalu hubungi admin untuk memilih kelas."),
      bodyEn: known(content.about.bodyEn, ["Founded with a passion to bring Muay Thai martial arts to Garut, Camp 3GRT is open to everyone — from children, teenagers, to adults. We have experienced coaches and complete facilities to support your training journey.", "Founded in the spirit of bringing Muay Thai martial arts to Garut, Camp 3GRT is here for all groups — from children, teenagers, to adults. We have experienced coaches and complete facilities to support your training journey."], "Camp 3GRT X NGM offers group training, personal sessions, and Muay Kids. Meet the coaches, check the weekly timetable, then contact the admin to choose a class."),
    };
    if (Array.isArray(content.about.stats)) {
      const signature = content.about.stats.map((stat) => `${textKey(stat?.label)}:${textKey(stat?.value)}`).sort().join("|");
      // The documented seed figures and existing unsupported live figures are omitted.
      result.about.stats = seedStats.includes(signature) ? [] : content.about.stats;
    }
  }
  if (Array.isArray(content.programs)) result.programs = content.programs.filter(Boolean).map(prepareProgram);
  if (Array.isArray(content.coaches)) result.coaches = content.coaches.filter(Boolean).map((coach) => {
    const copy = coachCopy.find((item) => item.bios.some((bio) => textKey(bio) === textKey(coach.bio)));
    return copy ? {
      ...coach,
      bio: known(coach.bio, copy.bios, copy.bio),
      bioEn: known(coach.bioEn, copy.biosEn, copy.bioEn),
    } : coach;
  });
  if (Array.isArray(content.pricing)) result.pricing = content.pricing.filter(Boolean).map(preparePrice);
  if (Array.isArray(content.testimonials)) result.testimonials = content.testimonials.filter((review) => {
    if (!review || typeof review !== "object") return false;
    if (/^(nama member|member name|nama pelanggan|your name|nama kamu|contoh member|example member)$/i.test(textKey(review.name))) return false;
    if (!textKey(review.name) || !textKey(review.quote)) return false;
    return !seedTestimonials.some(([name, quote]) => textKey(name) === textKey(review.name) && textKey(quote) === textKey(review.quote));
  });
  if (result.brand) result.brand = withLocalAsset(result.brand, "logo");
  if (result.hero) result.hero = withLocalAsset(result.hero, "bgImage");
  if (result.about) result.about = withLocalAsset(result.about, "image");
  if (Array.isArray(result.programs)) result.programs = result.programs.map((item) => withLocalAsset(item, "image"));
  if (Array.isArray(result.coaches)) result.coaches = result.coaches.map((item) => withLocalAsset(item, "image"));
  if (Array.isArray(result.gallery)) result.gallery = result.gallery.map((item) => withLocalAsset(item, "image"));
  if (Array.isArray(result.partners)) result.partners = result.partners.map((item) => withLocalAsset(item, "logo"));
  return result;
}
