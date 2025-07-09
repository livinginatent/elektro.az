"use client";

import { EVCars } from "@/app/types";
import { Button } from "../ui/button";
import { EVCarCard } from "./EVCard";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface EVGridProps {
  cars: EVCars[] | null;
  title?: string;
  showViewAll?: boolean;
  page: "Home" | "Electric Vehicles";
}
type FilterType = "cheapest" | "fastest" | "most_range" | "most_power" | null;
export function EVGrid({ cars, showViewAll = true, page }: EVGridProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };
  const sortedCars = useMemo(() => {
    if (!cars || !activeFilter) return cars;

    const sorted = [...cars].sort((a, b) => {
      switch (activeFilter) {
        case "cheapest":
          return (a.price || 0) - (b.price || 0);
        case "fastest":
          return (b.speed_km || 0) - (a.speed_km || 0);
        case "most_range":
          return (b.range_km || 0) - (a.range_km || 0);
        case "most_power":
          return (b.engine.engine_power || 0) - (a.engine.engine_power || 0);

        default:
          return 0;
      }
    });

    return sorted;
  }, [cars, activeFilter]);
  const carsToDisplayHome = sortedCars?.slice(0, 8);
  const carsToDisplayElectricVehicles = cars?.slice(0, 8);
  const carsToDisplay =
    page === "Home" ? carsToDisplayHome : carsToDisplayElectricVehicles;

  const sortFilters = [
    { key: "cheapest" as FilterType, label: "Ən ucuz" },
    { key: "fastest" as FilterType, label: "Ən sürətli" },
    { key: "most_range" as FilterType, label: "Ən uzun məsafə" },
    { key: "most_power" as FilterType, label: "Ən güclü" },
  ];
  const title =
    page === "Home" ? "Seçilmiş avtomobillər" : "Bütün avtomobillər";
  return (
    <section className={`pb-16 ${page === "Home" ? "px-8" : "px-2"}`}>
      <div className="flex flex-col items-center justify-between mb-8 md:flex-row lg:flex-row">
        <h2 className="text-base md:text-2xl lg:text-2xl text-center font-bold text-gray-900">
          {title}
        </h2>
        {showViewAll && page === "Home" && (
          <Button
            className="mt-4 cursor-pointer"
            variant="outline"
            onClick={() => router.push("/electric-vehicles")}
          >
            Bütün avtomobillər
          </Button>
        )}
      </div>
      {page === "Home" && (
        <div className="grid grid-cols-2 md:flex lg:flex gap-2 mb-6">
          {sortFilters.map((filter) => (
            <Button
              key={filter.key}
              className={`px-4 py-2 rounded-xs transition-all duration-200 cursor-pointer ${
                activeFilter === filter.key
                  ? "bg-[#023e8a] hover:bg-sky-600 text-white shadow-lg"
                  : "bg-[#1d242a] text-white hover:bg-slate-700"
              }`}
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.label}
            </Button>
          ))}

          {/* Clear Filter Button */}
          {activeFilter && (
            <Button
              className=" bg-red-100 text-red-700 hover:bg-red-200 rounded-xs cursor-pointer"
              onClick={() => setActiveFilter(null)}
            >
              ✕ Filtri təmizlə
            </Button>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {carsToDisplay?.map((car) => (
          <EVCarCard
            key={car.id}
            car={car}
            onViewDetails={() => router.push(`/${car.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
