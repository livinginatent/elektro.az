import CarFinderPage from "@/components/findCar/CarFinderPage";

export const metadata = {
  title: "Avtomobil Tap - Elektrik və Hibrid Avtomobil Seçimi | Procar.az",
  description:
    "İstədiyiniz xüsusiyyətlərə uyğun elektrik və hibrid avtomobili tapın. Marka, model, yürüş məsafəsi və digər filtrlərlə ən uyğun avtomobili Procar.az-da kəşf edin.",
  keywords: [
    "avtomobil tap",
    "elektrik avtomobil",
    "hibrid avtomobil",
    "avtomobil seçimi",
    "marka",
    "model",
    "yürüş məsafəsi",
    "Azərbaycan",
    "procar.az",
  ],
  alternates: {
    canonical: "/find-car",
  },
  openGraph: {
    title: "Avtomobil Tap - Elektrik və Hibrid Avtomobil Seçimi | Procar.az",
    description:
      "İstədiyiniz xüsusiyyətlərə uyğun elektrik və hibrid avtomobili tapın. Marka, model, yürüş məsafəsi və digər filtrlərlə ən uyğun avtomobili Procar.az-da kəşf edin.",
    url: "https://procar.az/find-car",
    siteName: "Procar.az",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: "/og-find-car.jpg",
        width: 1200,
        height: 630,
        alt: "Procar.az - Avtomobil Tap",
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

export default function Page() {
  return <CarFinderPage />;
}
