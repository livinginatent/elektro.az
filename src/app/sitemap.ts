import { MetadataRoute } from "next";
import { createClient } from "./utils/supabase/server";
import { client as sanityClient } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    "", // homepage
    "/about",
    "/compare",
    "/cars",
    "/range-calculator",
    "/cost",
    "/find-car",
    "/charger",
    "/blog",
   
  ];

  // Fetch dynamic car IDs from Supabase
  const supabase = await createClient();
  const { data: cars } = await supabase.from("EVs").select("id");

  // Dynamic car detail pages
  const carRoutes = (cars || [])
    .filter((car) => car.id)
    .map((car) => `/${car.id}`);

  // Fetch dynamic blog slugs from Sanity
  let blogRoutes: string[] = [];
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
    );
    blogRoutes = (posts || []).map(
      (post: { slug: string }) => `/blog/${post.slug}`
    );
  } catch {
    // If Sanity is unreachable, skip blog routes
    blogRoutes = [];
  }

  // Combine all routes
  const allRoutes = [...staticRoutes, ...carRoutes, ...blogRoutes];

  const baseUrl = "https://elektro-az.vercel.app";
  const now = new Date().toISOString();

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));
}
