import { AboutUsPage } from "@/components/about/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haqqımızda - Procar.az | Elektrik Avtomobil Platformu",
  description:
    "Procar.az Azərbaycanda elektrik və hibrid avtomobillərin populyarlaşdırılması üçün çalışır. 50+ elektrik avtomobil, 186 şarj məntəqəsi və 1000+ aktiv istifadəçi ilə ölkənin aparıcı EV platformu.",
  keywords: [
    "elektrik avtomobil",
    "hibrid avtomobil",
    "EV",
    "şarj məntəqəsi",
    "Azərbaycan",
    "Procar.az",
    "elektrik nəqliyyat",
    "davamlı nəqliyyat",
    "elektrik avtomobil qiymətləri",
    "elektrik avtomobil kalkulyatoru",
  ],
  authors: [{ name: "Procar.az" }],
  creator: "Procar.az",
  publisher: "Procar.az",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://procar.az"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Haqqımızda - Procar.az | Elektrik Avtomobil Platformu",
    description:
      "Procar.az Azərbaycanda elektrik və hibrid avtomobillərin populyarlaşdırılması üçün çalışır. 50+ elektrik avtomobil, 186 şarj məntəqəsi və 1000+ aktiv istifadəçi ilə ölkənin aparıcı EV platformu.",
    url: "https://procar.az/about",
    siteName: "Procar.az",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Procar.az - Elektrik Avtomobil Platformu",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Procar.az",
            url: "https://procar.az",
            logo: "https://procar.az/logo.png",
            description:
              "Azərbaycanda elektrik və hibrid avtomobillərin populyarlaşdırılması və əlçatanlığının artırılması üçün çalışan platforma",
            foundingDate: "2024",
            address: {
              "@type": "PostalAddress",
              addressCountry: "AZ",
              addressLocality: "Bakı",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["Azerbaijani", "English"],
            },

            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Elektrik Avtomobil Xidmətləri",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Elektrik Avtomobil Bazası",
                    description:
                      "Azərbaycanda mövcud olan bütün elektrik və hibrid avtomobillərin ətraflı məlumatları",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Şarj Məntəqələri Xəritəsi",
                    description:
                      "Ölkə üzrə bütün şarj məntəqələrinin xəritəsi və real vaxt məlumatları",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Maliyyə Kalkulyatoru",
                    description:
                      "Elektromobil sahiblik xərclərini ənənəvi avtomobillərlə müqayisə etmək üçün vasitə",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Yürüş Kalkulyatoru",
                    description:
                      "Müxtəlif şəraitlərdə elektrik avtomobilinizin yürüş məsafəsini dəqiq hesablayan alət",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "150",
            },
          }),
        }}
      />
      <AboutUsPage />
    </>
  );
}
