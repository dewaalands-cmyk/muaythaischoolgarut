import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://muaythaischoolgarut.vercel.app"),
  title: "Camp 3GRT – Muaythai School Garut | Latihan Keras, Disiplin, Juara!",
  description:
    "Camp 3GRT Muaythai School Garut - Pusat latihan Muay Thai profesional di Garut, Jawa Barat. Program Group Training, Personal Training, Muay Kids, Private Class. Buka setiap hari 09.00-22.00 WIB. Hubungi: 0895-2437-8203.",
  keywords:
    "muay thai garut, gym garut, latihan muay thai garut, camp 3grt, muaythai school garut, boxing garut, bela diri garut, muay kids garut, private muay thai garut, olahraga garut",
  authors: [{ name: "Camp 3GRT - Muaythai School Garut" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/images/favicon.png", apple: "/images/logo.jpg" },
  openGraph: {
    type: "website",
    siteName: "Camp 3GRT Muaythai School Garut",
    title: "Camp 3GRT – Muaythai School Garut | Latihan Keras, Disiplin, Juara!",
    description:
      "Pusat latihan Muay Thai profesional di Garut. Group Training, Personal Training, Muay Kids, Private Class. Buka setiap hari 09.00-22.00 WIB.",
    url: "/",
    locale: "id_ID",
    images: [{ url: "/images/coach-dio.jpg", width: 800, height: 1066 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camp 3GRT – Muaythai School Garut",
    description: "Pusat latihan Muay Thai profesional di Garut. Buka setiap hari 09.00-22.00 WIB.",
    images: ["/images/coach-dio.jpg"],
  },
  other: {
    "geo.region": "ID-JB",
    "geo.placename": "Garut, Jawa Barat",
    language: "Indonesian",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
