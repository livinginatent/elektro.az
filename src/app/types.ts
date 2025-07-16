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
  cyl: number | null;
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
  electric_range: number | null;
  speed_km: number | null;
  acceleration: number | null;
  battery_type: string | null;
  charging_speed_kw: number | null;
  battery_capacity: number | null;
  charging_time: number | null;
  price: number | null;
  availability: "Satışda var" | "Sifariş ilə" | "Satışda yoxdur";
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
  electricity_consumption: number;
  safety: string[];
  id: string | null | number;
  dealership: Dealership;
  exterior: string[];
  interior: string[];
  fuel_consumption: number;
  total_range: number | null; // Total range for hybrid cars
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
  "electric_range",
  "acceleration",
  "engine.engine_power",
  "engine.engine_type",
  "charging_time",
  "warranty",
] as const;

export interface ChargingPoint {
  _id: string;
  address: string;
  cafe: boolean;
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
  name?: string;
  operator?: string;
  power?: number | null; // kW
  connector_types?: string[];
  availability?: "available" | "occupied" | "out_of_service";
  price?: number | null; // qəpik per kWh
  opening_hours?: {
    active: boolean;
    start: number;
    end: number;
    name: string;
  }[];
  phone?: string;
  amenities?: string[];
  rating?: number | null;
  reviews_count?: number | null;
  last_updated?: string | null;
  // Added for compatibility with data and code usage:
  types: string[];
  wc: boolean;
  quantity: string;
  working_hours: {
    active: boolean;
    start: number;
    end: number;
    name: string;
  }[];
}

export interface ChargingFilter {
  availability?: string[];
  powerRange?: {
    min: number;
    max: number;
  };
  connectorTypes?: string[];
  amenities?: string[];
  maxDistance?: number;
}

export type CompareCategory = (typeof COMPARE_CATEGORIES)[number];

// NOTE: Use EVCars[] (never null) for car lists, and EVCars | undefined for single car selection throughout the codebase for best practices.
