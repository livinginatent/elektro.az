import { Header } from "@/layout/Header";
import { HeroSection } from "../components/evMain/HeroSection";
import { QuickTools } from "../components/evMain/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";
import { EVSearchContainer } from "../components/evMain/EVSearchContainer";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import { BlogSection } from "@/components/evMain/BlogSection";

export const metadata = {
  title: "Procar.az - Elektrik və hibrid Avtomobillər | Avtomobil Bazası",
  description:
    "Azərbaycanda elektrik & hibrid avtomobillərin bazası, müqayisə, qiymətlər və yürüş məsafəsi kalkulyatoru. Elektromobillər üçün ən yaxşı platforma!",
};
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author->{name},
  publishedAt,
  readTime,
  categories[]->{
    _id,
    title,
    slug
  },
  mainImage,
  featured
}`;

export default async function Homepage() {
  const supabase = await createClient();
  const { data: EVs } = await supabase.from("EVs").select("*");
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  const featuredPost = posts.find((post: SanityDocument) => post.featured);
  const regularPosts = posts.filter((post: SanityDocument) => !post.featured);

  return (
    <div className="min-h-screen justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <QuickTools />
      <EVSearchContainer initialCars={EVs || []} />
      <BlogSection
        posts={regularPosts}
        featuredPost={featuredPost}
        _id={""}
        _rev={""}
        _type={""}
        _createdAt={""}
        _updatedAt={""}
      />
      <Footer />
    </div>
  );
}
