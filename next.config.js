/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Cegah situs di-embed di iframe orang lain (anti-clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Cegah browser menebak-nebak tipe konten.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Batasi info referrer yang dikirim ke situs lain.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Matikan akses fitur sensitif yang tidak dipakai.
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          // Paksa HTTPS pada kunjungan berikutnya.
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
