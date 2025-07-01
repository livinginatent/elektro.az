import { StaticImageData } from "next/image";
import type React from "react";
export interface EVCars  {
  brand: string | null;
  model: string | null;
  variant: string | null;
  range_km: number | null;
  speed_km: number | null;
  acceleration: number | null;
  battery_type: string | null;
  charging_speed_kw: number | null;
  battery_capacity:number,
  charging_time:number,
  price: number | null;
  availability: "Avaialable" | "Pre-order" | "Not avaialble";
  brand_image: string | null | StaticImageData;
  id: string | null | number; // UUIDs are typically represented as strings in TypeScript
};

export interface QuickTool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}
