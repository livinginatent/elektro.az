"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { colors } from "@/utils/colors";

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  onPriceFilter?: (range: string) => void;
  onRangeFilter?: (range: string) => void;
  onMoreFilters?: () => void;
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  return (
    <section className="container w-1/2 px-4 pb-8">
      <div className="rounded-sm p-2">
        {" "}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-5 w-5" />
            <Input
              placeholder="Search by make, model, or features..."
              style={{
                borderWidth: 2,
                borderColor: colors.primary.slate,
                borderRadius: 5,
              }}
              className="pl-10 border border-red h-12 text-black text-lg"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4"></div>
        </div>
      </div>
    </section>
  );
}
