"use client";

import {  EVCars } from "@/app/types";
import { Button } from "../ui/button";
import { EVCarCard } from "./EVCard";

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
  title = "Featured Electric Vehicles",
  showViewAll = true,
  onViewAll,
  onViewDetails,
  onCompare,
}: EVGridProps) {
  return (
    <section className="container px-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {showViewAll && (
          <Button variant="outline" onClick={onViewAll}>
            View All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars?.map((car) => (
          <EVCarCard
            key={car.id}
            car={car}
            onViewDetails={onViewDetails}
            onCompare={onCompare}
          />
        ))}
      </div>
    </section>
  );
}
