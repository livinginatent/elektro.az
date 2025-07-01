import { Header } from "@/layout/Header";
import { HeroSection } from "../components/ev/HeroSection";
import { QuickTools } from "../components/ev/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";
import { EVSearchContainer } from "../components/ev/EVSearchContainer";

export default async function Homepage() {
  const supabase = await createClient();
  const { data: EVs } = await supabase.from("EVs").select("*");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <EVSearchContainer initialCars={EVs || []} />
      <QuickTools />
      <Footer />
    </div>
  );
}
