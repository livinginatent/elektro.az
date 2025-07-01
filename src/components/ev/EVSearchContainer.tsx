"use client";
import { useState, useEffect, useRef } from "react";
import { SearchFilter } from "./SearchFilter";
import { EVGrid } from "./EVGrid";
import { EVCars } from "@/app/types";

interface Props {
  initialCars: EVCars[];
}

export function EVSearchContainer({ initialCars }: Props) {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<EVCars[]>(initialCars);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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
    </div>
  );
}
