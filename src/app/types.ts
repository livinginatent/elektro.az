import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import type React from "react";
export interface CarDimensions {
  length: number | null;
  width: number | null;
  height: number | null;
  wheelbase: number | null;
  curb_weight: number | null;
  trunk_size: number | null;
}
export interface Engine {
  engine_type: "Plug-in Hibrid" | "Tam Elektrik";
  engine_power: number | null;
  engine_displacement: number | null;
}
export interface Dealership {
  name: string;
  phone_number: string;
  address: string;
}
export interface EVCars {
  brand: string;
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
  engine: Engine;
  torque: number | null;
  charging_ports: string[];
  efficiency_city: number;
  efficiency_highway: number;
  year_model: string;
  carousel_images: string[];
  body_type: "Sedan" | "SUV" | "Minivan" | "Sport";
  seating_capacity: number;
  dimensions: CarDimensions;
  safety: string[];
  id: string | null | number;
  dealership: Dealership;
}

export interface QuickTool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const COMPARE_CATEGORIES = [
  "brand",
  "model",
  "price",
  "range_km",
  "acceleration",
  "engine.engine_power",
  "engine.engine_type",
  "charging_time",
  "warranty",
  "availability",
] as const;

export type CompareCategory = (typeof COMPARE_CATEGORIES)[number];
