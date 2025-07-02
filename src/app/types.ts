import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import type React from "react";
export interface EVCars {
  brand: string | null;
  model: string | null;
  description: string;
  variant: string | null;
  range_km: number | null;
  speed_km: number | null;
  acceleration: number | null;
  battery_type: string | null;
  charging_speed_kw: number | null;
  battery_capacity: number | null;
  charging_time: number | null;
  price: number | null;
  availability: "Avaialable" | "Pre-order" | "Not avaialble";
  brand_image: string | null | StaticImageData;
  mainImage: string | StaticImport;
  warranty: never;
  engine_power: string | null;
  torque: number | null;
  charging_ports: string[];
  efficiency_city: number;
  efficiency_highway: number;
  year_model: string;
  id: string | null | number; // UUIDs are typically represented as strings in TypeScript
}

export interface QuickTool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}
