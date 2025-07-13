import { MetadataRoute } from "next";
import { createClient } from "./utils/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    "", // homepage
    "/compare",
    "/cars",
    "/range-calculator",
  ];

  // Fetch dynamic car IDs from Supabase
  const supabase = await createClient();
  const { data: cars } = await supabase.from("EVs").select("id");

  // Dynamic car detail pages
  const carRoutes = (cars || [])
    .filter((car) => car.id)
    .map((car) => `/${car.id}`);

  // Combine all routes
  const allRoutes = [...staticRoutes, ...carRoutes];

  const baseUrl = "https://elektro-az.vercel.app";
  const now = new Date().toISOString();

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));
}
