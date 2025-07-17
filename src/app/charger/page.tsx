"use client";

import dynamic from "next/dynamic";
import data from "@/app/getChargePoints.json";
import type { ChargingPoint } from "@/app/types";
import Head from "next/head";

interface WorkingHours {
  active: boolean;
  end: number;
  name: string;
  start: number;
}

// Interface for the raw JSON data
interface RawChargingPoint {
  _id: string;
  address: string;
  cafe: boolean;
  geometry: {
    coordinates: number[];
    type: string;
  };
  name: string;
  phone: string;
  quantity: string;
  tariffs: string;
  types: string[];
  wc: boolean;
  working_hours: WorkingHours[];
}

// Type for the JSON structure
interface ChargingPointsData {
  result: {
    charge_points: RawChargingPoint[];
  };
}

const ChargingStationMap = dynamic<{
  chargingPoints: ChargingPoint[];
}>(
  () =>
    import("@/components/charging/ChargingStationMap").then(
      (mod) => mod.ChargingStationMap
    ),
  { ssr: false }
);

export default function ChargingPage() {
  // Extract and transform the raw data to match ChargingStationMap interface
  const rawChargingPoints: RawChargingPoint[] =
    (data as ChargingPointsData)?.result?.charge_points || [];

  // Transform raw data to match the expected ChargingPoint interface
  const chargingPoints: ChargingPoint[] = rawChargingPoints.map((point) => ({
    _id: point._id,
    address: point.address,
    cafe: point.cafe,
    geometry: {
      coordinates: [
        point.geometry.coordinates[0],
        point.geometry.coordinates[1],
      ] as [number, number],
      type: "Point" as const,
    },
    name: point.name,
    phone: point.phone,
    // Map connector types
    connector_types: point.types,
    // Convert working hours to match the expected format
    opening_hours: point.working_hours.map((wh) => ({
      active: wh.active,
      start: wh.start,
      end: wh.end,
      name: wh.name,
    })),
    // Default values for missing properties
    operator: "Unknown", // Default operator can be updated if data is available
    power: parseInt(point.quantity, 10) || 0, // Convert quantity to number (use 0 as default)
    availability:
      parseInt(point.quantity, 10) > 0 ? "available" : "out_of_service", // Availability based on quantity
    price: parseFloat(point.tariffs) || 0, // Convert tariffs to number (use 0 as default)
    amenities: [
      ...(point.cafe ? ["Cafe"] : []),
      ...(point.wc ? ["Toilet"] : []),
    ],
    // Add missing properties to match ChargingPoint type
    types: point.types,
    wc: point.wc,
    quantity: point.quantity,
    working_hours: point.working_hours,
  }));

  // SEO meta tags
  const pageTitle =
    "Elektrik Doldurma Məntəqələri Xəritəsi - Elektrik Avtomobil Şarj Stansiyaları | Procar.az";
  const pageDescription =
    "Azərbaycanda elektrik avtomobillər üçün bütün elektrik doldurma məntəqələrinin xəritəsi və siyahısı. Yaxınlıqdakı şarj stansiyalarını tapın, ünvan, güc və digər məlumatları öyrənin. Procar.az ilə EV şarj imkanları.";
  const canonicalUrl = "https://procar.az/charger";
  const ogImage = "/og-charger.jpg";
  const keywords =
    "şarj məntəqəsi, elektrik doldurma məntəqələri, elektrik avtomobil, şarj stansiyası, EV şarj, xəritə, Azərbaycan, procar.az, şarj nöqtələri, elektrik maşın";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Procar.az" />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
        <ChargingStationMap chargingPoints={chargingPoints} />
      </div>
    </>
  );
}
