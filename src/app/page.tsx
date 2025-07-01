

import { Header } from "@/layout/Header";
import { HeroSection } from "../components/ev/HeroSection";
import { SearchFilter } from "../components/ev/SearchFilter";
import { EVGrid } from "../components/ev/EVGrid";
import { QuickTools } from "../components/ev/QuickTools";
import { Footer } from "@/layout/Footer";
import { createClient } from "./utils/supabase/server";


export default async function Homepage() {

  const supabase = await createClient();
  const { data: EVs} = await supabase.from("EVs").select("*");

console.log(EVs)
  /* const handleSearch = (query: string) => {
    console.log("Search:", query);
  };

  const handlePriceFilter = (range: string) => {
    console.log("Price filter:", range);
  };

  const handleRangeFilter = (range: string) => {
    console.log("Range filter:", range);
  };

  const handleMoreFilters = () => {
    console.log("More filters clicked");
  };

  const handleViewDetails = (car: EVCar) => {
    console.log("View details:", car);
  };

  const handleCompare = (car: EVCar) => {
    console.log("Compare:", car);
  };

  const handleViewAll = () => {
    console.log("View all cars");
  }; */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSection />
      <SearchFilter
       /*  onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        onRangeFilter={handleRangeFilter}
        onMoreFilters={handleMoreFilters} */
      />
      <EVGrid
        cars={EVs}
        /* onViewDetails={handleViewDetails}
        onCompare={handleCompare}
        onViewAll={handleViewAll} */
      />
      <QuickTools />
      <Footer />
    </div>
  );
}
