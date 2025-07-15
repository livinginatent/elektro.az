import { Header } from "@/layout/Header";
import { HeroSection } from "../components/evMain/HeroSection";
import { QuickTools } from "../components/evMain/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";
import { EVSearchContainer } from "../components/evMain/EVSearchContainer";

export const metadata = {
  title:
    "Procar.az - Elektrik və hibrid Avtomobillər | Procar.az | Elektromobil & Hibrid ",
  description:
    "Azərbaycanda elektrik & hibrid avtomobilləri, müqayisə, qiymətlər və yürüş məsafəsi kalkulyatoru. Elektromobillər üçün ən yaxşı platforma!",
};

export default async function Homepage() {
  const supabase = await createClient();
  const { data: EVs } = await supabase.from("EVs").select("*");

  return (
    <div className="min-h-screen justify-center items-center  bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <QuickTools />
      <EVSearchContainer initialCars={EVs || []} />
      <Footer />
    </div>
  );
}
