/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCompareStore } from "@/lib/compareStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  Zap,
  Clock,
  Shield,
  Gauge,
  Car,
  Battery,
  /*   Award, */
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Manat from "./manat";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import Head from "next/head";
import { GiCarWheel } from "react-icons/gi";
import { PiCylinderBold, PiEngineBold } from "react-icons/pi";
import { FaRoad } from "react-icons/fa6";
import { BsFuelPump } from "react-icons/bs";

// Category labels with units
const CATEGORY_LABELS: Record<string, string> = {
  brand: "Marka",
  model: "Model",
  price: "Qiymət",
  electric_range: "Elektrik yürüş məsafəsi",
  acceleration: "0-100 km/saat",
  "engine.engine_power": "Mühərrik gücü",
  "engine.engine_type": "Mühərrik tipi",
  charging_time: "Şarj vaxtı",
  warranty: "Zəmanət",
  /* availability: "Əlçatanlıq", */
};

// Category icons
const CATEGORY_ICONS: Record<string, any> = {
  brand: Car,
  model: Car,
  price: Manat,
  electric_range: Zap,
  acceleration: Gauge,
  "engine.engine_power": Battery,
  "engine.engine_type": PiEngineBold,
  charging_time: Clock,
  warranty: Shield,
  /*  availability: Award, */
};

// Units for each category
const CATEGORY_UNITS: Record<string, string> = {
  price: "₼", // Manat currency
  electric_range: "km",
  acceleration: "san",
  "engine.engine_power": "a.g",
  charging_time: "saat",
  warranty: "",
  /* availability: "", // No unit */
};

// Categories that should be neutral (no best/worst indication)
const NEUTRAL_CATEGORIES = [
  "brand",
  "model",
  "engine.engine_type",
  /*   "availability", */
];

// Categories where lower values are better
const LOWER_IS_BETTER = ["price", "acceleration", "charging_time","fuel_consumption"];

// Get value for a car and category
function getCarValue(car: any, category: string) {
  if (category.includes(".")) {
    const [parent, child] = category.split(".");
    return car[parent]?.[child] ?? "-";
  }
  return car[category] ?? "-";
}

// Enhanced badge logic for up to 4 cars
const getValueBadge = (
  value: string,
  category: string,
  allValues: string[],
  isLowerBetter: boolean
) => {
  if (NEUTRAL_CATEGORIES.includes(category) || value === "-") {
    return null;
  }
  const numericValue = Number.parseFloat(value);
  if (isNaN(numericValue)) return null;
  // Get unique sorted values (best to worst)
  const numericValues = allValues
    .map((v) => Number.parseFloat(v))
    .filter((v) => !isNaN(v));
  if (numericValues.length < 2) return null;
  const sorted = [...new Set(numericValues)].sort((a, b) =>
    isLowerBetter ? a - b : b - a
  );
  const rank = sorted.indexOf(numericValue);
  if (rank === -1) return null;
  // Color classes
  if (rank === 0) {
    return {
      variant: "default" as const,
      className: "bg-green-200 text-green-900 border-green-300",
    };
  } else if (rank === sorted.length - 1) {
    return {
      variant: "destructive" as const,
      className: "bg-red-200 text-red-900 border-red-300",
    };
  } else if (rank === 1) {
    return {
      variant: "secondary" as const,
      className: "bg-green-100 text-green-700 border-green-200",
    };
  } else if (rank === 2) {
    return {
      variant: "secondary" as const,
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
  }
  return null;
};

export default function ComparePage() {
  const { selectedCars, removeCar, clear } = useCompareStore();
  const router = useRouter();

  // SEO meta tags
  const pageTitle =
    "Avtomobil Müqayisəsi - Elektrik və Hibrid Avtomobillərin Xüsusiyyətləri və Qiymətləri | Procar.az";
  const pageDescription =
    "Elektrik və hibrid avtomobillərin xüsusiyyətlərini, qiymətlərini və texniki göstəricilərini müqayisə edin. Azərbaycanda ən yaxşı EV və hibrid avtomobil müqayisə platforması - Procar.az.";
  const canonicalUrl = "https://procar.az/compare";
  const ogImage = "/og-compare.jpg";
  const keywords =
    "avtomobil müqayisəsi, elektrik avtomobil, hibrid avtomobil, texniki göstəricilər, qiymət, yürüş məsafəsi, Azərbaycan, procar.az";

  // Helper: Determine car types
  const allElectric = selectedCars.every(
    (car) => car.engine?.engine_type === "Tam Elektrik"
  );
  const allHybrid = selectedCars.every(
    (car) => car.engine?.engine_type === "Plug-in Hibrid"
  );
  const mixed = !allElectric && !allHybrid;

  // Define best specs for each scenario
  const universalSpecs = [
    "brand",
    "model",
    "price",
    "acceleration",
    "engine.engine_power",
    "engine.engine_type",
    "drivetrain",
    "warranty",
    "total_range",
  ];
  const electricSpecs = [
    "electric_range",
    "charging_time",
    "battery_capacity",
    "electricity_consumption",
  ];
  const hybridSpecs = [
    "electric_range",
    "total_range",
    "fuel_consumption",
    "engine.cyl",
  ];

  // Decide which categories to show
  let compareCategories: string[] = [...universalSpecs];
  if (allElectric) {
    compareCategories = [...universalSpecs, ...electricSpecs];
  } else if (allHybrid) {
    compareCategories = [...universalSpecs, ...hybridSpecs];
  } else if (mixed) {
    // Show all, but some values will be N/A
    compareCategories = [...universalSpecs];
  }

  // Add labels, icons, and units for new fields
  const CATEGORY_LABELS_EXT: Record<string, string> = {
    ...CATEGORY_LABELS,
    drivetrain: "Ötürücü",
    battery_capacity: "Batareya tutumu",
    electricity_consumption: "Elektrik sərfiyyatı",
    total_range: "Ümumi yürüş",
    fuel_consumption: "Yanacaq sərfiyyatı",
    "engine.cyl": "Silindir sayı",
  };
  const CATEGORY_ICONS_EXT: Record<string, any> = {
    ...CATEGORY_ICONS,
    drivetrain: GiCarWheel,
    battery_capacity: Battery,
    electricity_consumption: Zap,
    total_range: FaRoad,
    fuel_consumption: BsFuelPump,
    "engine.cyl": PiCylinderBold,
  };
  const CATEGORY_UNITS_EXT: Record<string, string> = {
    ...CATEGORY_UNITS,
    drivetrain: "",
    battery_capacity: "kWh",
    electricity_consumption: "Wh/100Km",
    total_range: "km",
    fuel_consumption: "l/100km",
    "engine.cyl": "",
  };

  const onClear = () => {
    clear();
  };

  // Fix: Only render the 'select at least 2 cars' message if selectedCars.length < 2
  if (selectedCars.length < 2) {
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600 mb-6">
              Müqayisə üçün ən azı 2 avtomobil seçin.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="px-6 py-2 rounded bg-custom-blue cursor-pointer text-white font-bold transition-all rounded-lg   hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </div>
        </div>
      </>
    );
  }

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 ">
                Avtomobil Müqayisəsi
              </h1>
              <p className="text-slate-600 ">
                {selectedCars.length} avtomobil müqayisə edilir
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="cursor-pointer w-32 h-10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
              <Button
                variant="destructive"
                onClick={onClear}
                className="w-32 h-10 cursor-pointer hover:bg-red-500"
              >
                <X className="w-4 h-4 mr-2 " />
                Hamısını sil
              </Button>
            </div>
          </motion.div>

          {/* Car Cards Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          >
            <AnimatePresence>
              {selectedCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.001 }}
                  className="relative"
                >
                  <Card className="overflow-hidden rounded-sm border-2 border-slate-200 hover:border-custom-blue transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeCar(car.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </motion.button>

                      <div className=" rounded-xl flex items-center justify-center">
                        {car.mainImage !== null ? (
                          <Image
                            className="mt-1 rounded-sm w-full h-40 object-cover group-hover:scale-105 transition-transform duration-600"
                            src={car.mainImage}
                            width={300}
                            height={300}
                            alt={`${car.brand}${car.model}`}
                          />
                        ) : (
                          <div className="">Şəkil mövcud deyil</div>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-1">
                        {car.brand}
                      </h3>
                      <p className="text-slate-600 mb-3">{car.model}</p>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100  text-custom-blue"
                        >
                          #{index + 1}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          Müqayisədə
                        </span>
                      </div>
                      <Button
                        onClick={() => router.push(`/${car.id}`)}
                        variant={"outline"}
                        className="text-xs mt-4 cursor-pointer"
                        size={"sm"}
                      >
                        Avtomobilə keçid
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-sm shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="overflow-x-auto ">
              <table className="w-full ">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                  <tr>
                    <th className="p-6 text-left font-semibold text-slate-700 border-b border-slate-200">
                      Xüsusiyyətlər
                    </th>
                    {selectedCars.map((car, index) => (
                      <th
                        key={car.id}
                        className="p-6 text-left font-semibold text-slate-700 border-b border-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-custom-blue rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold">{car.brand}</div>
                            <div className="text-sm text-slate-500">
                              {car.model}
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {compareCategories.map(
                      (category: string, categoryIndex: number) => {
                        const Icon = CATEGORY_ICONS_EXT[category] || Car;
                        const isLowerBetter =
                          LOWER_IS_BETTER.includes(category);
                        // Gather all values for this category
                        const allValues = selectedCars.map((car) => {
                          const v = getCarValue(car, category);
                          // Show "-" for null/undefined/empty
                          return v === null || v === undefined || v === ""
                            ? "-"
                            : String(v);
                        });
                        return (
                          <motion.tr
                            key={category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + categoryIndex * 0.05 }}
                            className="hover:bg-slate-50 transition-colors duration-200 group"
                          >
                            <td className="p-6 border-b border-slate-100">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                                  <Icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                                </div>
                                <span className="font-medium text-slate-700">
                                  {CATEGORY_LABELS_EXT[category] || category}
                                </span>
                              </div>
                            </td>
                            {selectedCars.map((car, carIndex) => {
                              const value = getCarValue(car, category);
                              const unit = CATEGORY_UNITS_EXT[category] || "";
                              const valueWithUnit =
                                value === null ||
                                value === undefined ||
                                value === ""
                                  ? "-"
                                  : `${value} ${unit}`;
                              const badgeInfo = getValueBadge(
                                String(value),
                                category,
                                allValues,
                                isLowerBetter
                              );
                              return (
                                <motion.td
                                  key={car.id}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{
                                    delay:
                                      0.5 +
                                      categoryIndex * 0.05 +
                                      carIndex * 0.02,
                                  }}
                                  className="p-6 border-b border-slate-100"
                                >
                                  <div className="flex items-center">
                                    {badgeInfo ? (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 30,
                                          delay: 0.1,
                                        }}
                                      >
                                        <Badge
                                          variant={badgeInfo.variant}
                                          className={`${badgeInfo.className} rounded-xs text-md flex items-center gap-1`}
                                        >
                                          {valueWithUnit}
                                        </Badge>
                                      </motion.div>
                                    ) : (
                                      <span className="font-medium">
                                        {valueWithUnit}
                                      </span>
                                    )}
                                  </div>
                                </motion.td>
                              );
                            })}
                          </motion.tr>
                        );
                      }
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Legend */}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 text-slate-500"
          >
            <p>Müqayisə nəticələri avtomobil xüsusiyyətlərinə əsaslanır</p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
