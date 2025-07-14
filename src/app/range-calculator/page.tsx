"use client";

import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import { useEffect, useState } from "react";
import { EVCars } from "../types";
import { createClient } from "../utils/supabase/client";
import { StepByStepRangeCalculator } from "@/components/rangeCalculator/StepByStepRangeCalculator";
import Head from "next/head";

export default function CalculatorPage() {
  const [cars, setCars] = useState<EVCars[] | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const supabase = await createClient();
      const { data: carsRaw } = await supabase
        .from("EVs")
        .select("*")
        .filter("engine->>engine_type", "eq", "Tam Elektrik");
      setCars(carsRaw);
    };
    fetchCars();
  }, []);
  // SEO meta tags
  const pageTitle =
    "Yürüş Kalkulyatoru - Elektrik Avtomobil Yürüş Məsafəsi Hesablayıcı | Procar.az";
  const pageDescription =
    "Elektrik avtomobilinizin real şəraitdə yürüş məsafəsini hesablayın. Model, sürət, hava və digər faktorları daxil edin, ən doğru nəticəni Procar.az ilə əldə edin.";
  const canonicalUrl = "https://procar.az/range-calculator";
  const ogImage = "/og-range.jpg";
  const keywords =
    "yürüş kalkulyatoru, elektrik avtomobil, məsafə, yürüş məsafəsi, EV kalkulyator, Azərbaycan, procar.az, elektrik maşın";
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
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        {cars && <StepByStepRangeCalculator initialCars={cars} />}
      </div>
      <Footer />
    </>
  );
}
