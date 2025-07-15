/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCompareStore } from "@/lib/compareStore";
import { COMPARE_CATEGORIES } from "../types";
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

// Category labels with units
const CATEGORY_LABELS: Record<string, string> = {
  brand: "Marka",
  model: "Model",
  price: "Qiymət",
  range_km: "Sürüş məsafəsi",
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
  range_km: Zap,
  acceleration: Gauge,
  "engine.engine_power": Battery,
  "engine.engine_type": Zap,
  charging_time: Clock,
  warranty: Shield,
  /*  availability: Award, */
};

// Units for each category
const CATEGORY_UNITS: Record<string, string> = {
  price: "₼", // Manat currency
  range_km: "km",
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
const LOWER_IS_BETTER = ["price", "acceleration", "charging_time"];

// Categories where higher values are better
const HIGHER_IS_BETTER = ["range_km", "engine.engine_power", "warranty"];

// Get value for a car and category
function getCarValue(car: any, category: string) {
  if (category.includes(".")) {
    const [parent, child] = category.split(".");
    return car[parent]?.[child] ?? "-";
  }
  return car[category] ?? "-";
}

// Get value with unit for a specific category
function getCarValueWithUnit(car: any, category: string) {
  const value = getCarValue(car, category);
  const unit = CATEGORY_UNITS[category] || ""; // Default to empty if no unit is defined
  return `${value} ${unit}`;
}

// Get the best value for comparison
const getBestValue = (cars: any[], category: string) => {
  const values = cars.map((car) => getCarValue(car, category));

  if (LOWER_IS_BETTER.includes(category)) {
    const numericValues = values
      .map((v) => Number.parseFloat(v))
      .filter((v) => !isNaN(v));
    return numericValues.length > 0
      ? Math.min(...numericValues).toString()
      : null;
  } else if (HIGHER_IS_BETTER.includes(category)) {
    const numericValues = values
      .map((v) => Number.parseFloat(v))
      .filter((v) => !isNaN(v));
    return numericValues.length > 0
      ? Math.max(...numericValues).toString()
      : null;
  }

  return null;
};

// Get the worst value for comparison
const getWorstValue = (cars: any[], category: string) => {
  const values = cars.map((car) => getCarValue(car, category));

  if (LOWER_IS_BETTER.includes(category)) {
    const numericValues = values
      .map((v) => Number.parseFloat(v))
      .filter((v) => !isNaN(v));
    return numericValues.length > 0
      ? Math.max(...numericValues).toString()
      : null;
  } else if (HIGHER_IS_BETTER.includes(category)) {
    const numericValues = values
      .map((v) => Number.parseFloat(v))
      .filter((v) => !isNaN(v));
    return numericValues.length > 0
      ? Math.min(...numericValues).toString()
      : null;
  }

  return null;
};

// Get badge variant and text based on value performance
const getValueBadge = (
  value: string,
  category: string,
  bestValue: string | null,
  worstValue: string | null
) => {
  if (NEUTRAL_CATEGORIES.includes(category) || value === "-") {
    return null;
  }

  const numericValue = Number.parseFloat(value);
  const numericBest = bestValue ? Number.parseFloat(bestValue) : null;
  const numericWorst = worstValue ? Number.parseFloat(worstValue) : null;

  if (numericBest === null || numericWorst === null || isNaN(numericValue)) {
    return null;
  }

  // If there's only one unique value, don't show badges
  if (numericBest === numericWorst) {
    return null;
  }

  if (numericValue === numericBest) {
    return {
      variant: "default" as const,
      className: "bg-green-100 text-green-800 border-green-200",
    };
  } else if (numericValue === numericWorst) {
    return {
      variant: "destructive" as const,
      className: "bg-red-100 text-red-800 border-red-200",
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

  const bestValues = COMPARE_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = getBestValue(selectedCars, category);
      return acc;
    },
    {} as Record<string, string | null>
  );

  const worstValues = COMPARE_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = getWorstValue(selectedCars, category);
      return acc;
    },
    {} as Record<string, string | null>
  );

  // Filter out 'charging_time' if any car is not fully electric
  const filteredCategories = COMPARE_CATEGORIES.filter((category) => {
    if (category === "charging_time") {
      return selectedCars.every(
        (car) => car.engine?.engine_type === "Tam Elektrik"
      );
    }
    return true;
  });

  const onClear = () => {
    clear();
  };

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
                    {filteredCategories.map((category, categoryIndex) => {
                      const Icon = CATEGORY_ICONS[category] || Car;
                      const bestValue = bestValues[category];
                      const worstValue = worstValues[category];

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
                                {CATEGORY_LABELS[category]}
                              </span>
                            </div>
                          </td>
                          {selectedCars.map((car, carIndex) => {
                            const value = getCarValue(car, category);
                            const valueWithUnit = getCarValueWithUnit(
                              car,
                              category
                            );
                            const badgeInfo = getValueBadge(
                              value,
                              category,
                              bestValue,
                              worstValue
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
                    })}
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
