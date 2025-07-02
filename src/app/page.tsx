import { Header } from "@/layout/Header";
import { HeroSection } from "../components/evMain/HeroSection";
import { QuickTools } from "../components/evMain/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";
import { EVSearchContainer } from "../components/evMain/EVSearchContainer";

export default async function Homepage() {
  const supabase = await createClient();
  const { data: EVs } = await supabase.from("EVs").select("*");
const car = await supabase
  .from("EVs")
  .select("*")
  .eq("id", "1b8f2a47-443c-4336-beb4-0283da0f7015")
  .single();
  console.log(car);
  return (
    <div className="min-h-screen  justify-center items-center w-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <QuickTools />
      <EVSearchContainer initialCars={EVs || []} />
      <Footer />
    </div>
  );
}
