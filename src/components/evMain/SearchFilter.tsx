"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { colors } from "@/utils/colors";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  onPriceFilter?: (range: string) => void;
  onRangeFilter?: (range: string) => void;
  onMoreFilters?: () => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <section className="flex justify-center items-center w-full px-4 pb-8">
      <div className="rounded-sm p-2 w-full max-w-xl mx-auto">
        {" "}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-5 w-5" />
            <Input
              placeholder="Marka, model üzrə axtarış..."
              style={{
                borderWidth: 1.5,
                borderColor: colors.primary.slate,
                borderRadius: 5,
              }}
              className="pl-10 py-6 border border-red h-12 text-black text-lg w-full"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4"></div>
        </div>
      </div>
    </section>
  );
}
