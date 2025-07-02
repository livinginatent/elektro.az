"use client";

import { EVCars } from "@/app/types";
import { Button } from "../ui/button";
import { EVCarCard } from "./EVCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EVGridProps {
  cars: EVCars[] | null;
  title?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onViewDetails?: (car: EVCars) => void;
  onCompare?: (car: EVCars) => void;
}

export function EVGrid({
  cars,
  title = " Seçilmiş Elektrikli Avtomobillər",
  showViewAll = true,

  onCompare,
}: EVGridProps) {
  const router = useRouter();
  const [showAll, setShowAll] = useState<boolean>(false);
  const handleViewDetails = (car: EVCars) => {
    // Navigate to the car's detail page using the car's ID
    router.push(`/${car.id}`);
  };
  const carsToDisplay = showAll ? cars : cars?.slice(0, 4);
  const handleViewAll = () => {
    setShowAll(!showAll);
  };
  return (
    <section className=" px-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-center font-bold text-gray-900">
          {title}
        </h2>
        {showViewAll && (
          <Button variant="outline" onClick={handleViewAll}>
            {showAll ? "Daha az" : "Hamısını göstər"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {carsToDisplay?.map((car) => (
          <EVCarCard
            key={car.id}
            car={car}
            onViewDetails={handleViewDetails}
            onCompare={onCompare}
          />
        ))}
      </div>
    </section>
  );
}
