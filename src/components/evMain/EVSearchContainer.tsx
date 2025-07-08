"use client";
import { useState, useEffect, useRef } from "react";
import { SearchFilter } from "./SearchFilter";
import { EVGrid } from "./EVGrid";
import { EVCars } from "@/app/types";
import { useCompareStore } from "@/lib/compareStore";

interface Props {
  initialCars: EVCars[];
}

export function EVSearchContainer({ initialCars }: Props) {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<EVCars[]>(initialCars);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { selectedCars, removeCar, clear } = useCompareStore();

  useEffect(() => {
    if (!search) {
      setCars(initialCars);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data) => setCars(data.cars));
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, initialCars]);

  return (
    <div>
      <SearchFilter value={search} onChange={setSearch} />

      <EVGrid cars={cars} />

      {/* Compare Bar */}
      {selectedCars.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50 flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
          <div className="flex flex-1 gap-2 overflow-x-auto">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center bg-blue-200 rounded px-2 py-1 mr-2"
              >
                <span className="font-semibold text-sm mr-2">
                  {car.brand} {car.model}
                </span>
                <button
                  onClick={() => removeCar(car.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            className={`px-6 py-2 rounded bg-[#023e8a] cursor-pointer text-white font-bold transition-all ${
              selectedCars.length > 1
                ? "hover:bg-blue-700"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={selectedCars.length <= 1}
            onClick={() => {
              if (selectedCars.length > 1) window.location.href = "/compare";
            }}
          >
            Müqayisə et ({selectedCars.length})
          </button>
          <button
            onClick={clear}
            className="ml-4 px-6 bg-[#caf0f8] py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Hamısını sil
          </button>
        </div>
      )}
    </div>
  );
}
