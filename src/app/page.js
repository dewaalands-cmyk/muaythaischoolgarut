import { getSiteContent } from "@/lib/content";
import PageContent from "@/components/site/PageContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getSiteContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Camp 3GRT - Muaythai School Garut",
    description: "Pusat latihan Muay Thai profesional di Garut, Jawa Barat.",
    image: "https://muaythaischoolgarut.vercel.app/images/coach-dio.jpg",
    url: "https://muaythaischoolgarut.vercel.app/",
    telephone: "+62-895-2437-8203",
    address: { "@type": "PostalAddress", addressLocality: "Garut", addressRegion: "Jawa Barat", addressCountry: "ID" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "09:00", closes: "22:00",
    },
    sport: "Muay Thai",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent content={c} />
    </>
  );
}
