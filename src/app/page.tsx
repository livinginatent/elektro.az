import { Header } from "@/layout/Header";
import { HeroSection } from "../components/ev/HeroSection";
import { SearchFilter } from "../components/ev/SearchFilter";
import { EVGrid } from "../components/ev/EVGrid";
import { QuickTools } from "../components/ev/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";

export default async function Homepage() {
  const supabase = await createClient();
  const { data: EVs } = await supabase.from("EVs").select("*");


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <SearchFilter />
      <EVGrid cars={EVs} />
      <QuickTools />
      <Footer />
    </div>
  );
}
