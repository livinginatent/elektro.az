"use client";

import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import { useEffect, useState } from "react";
import { EVCars } from "../types";
import { createClient } from "../utils/supabase/client";
import { StepByStepRangeCalculator } from "@/components/rangeCalculator/StepByStepRangeCalculator";

export default function CalculatorPage() {
      const [cars, setCars] = useState<EVCars[] | null>(null);
    
      useEffect(() => {
        const fetchCars = async () => {
          const supabase = await createClient();
          const { data: carsRaw } = await supabase.from("EVs").select("*");
          setCars(carsRaw);
        };
        fetchCars();
      }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        {cars && <StepByStepRangeCalculator initialCars={cars} />}
      </div>
      <Footer />
    </>
  );
}
