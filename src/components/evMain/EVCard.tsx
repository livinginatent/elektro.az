"use client";
import Image from "next/image";
import { MapPin, Battery, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { getAvailabilityLabel } from "@/utils/getAvailabilityLabel";
import { formatPrice } from "@/utils/formatPrice";
import { formatValue } from "@/utils/formatValue";
import { useCompareStore } from "@/lib/compareStore";
import { BsFuelPumpFill } from "react-icons/bs";

interface EVCarCardProps {
  car: EVCars;
  onViewDetails?: (car: EVCars) => void;
  isElectric: boolean;
}

export function EVCarCard({ car, onViewDetails, isElectric }: EVCarCardProps) {
  const { addCar, removeCar, isSelected, selectedCars } = useCompareStore();
  const selected = isSelected(car.id);
  const disabled = !selected && selectedCars.length >= 4;
  console.log(isElectric);
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden max-w-md">
      <CardHeader className="p-0">
        <div className="relative p-1">
          <Image
            src={car.mainImage || "/placeholder.svg"}
            alt={`${car.brand || "Avtomobil"} ${car.model || ""}`}
            width={340}
            height={260}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            {getAvailabilityLabel(car.availability)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {car.brand || "Naməlum marka"} {car.model || ""}
            </h3>
            <p className="text-xl font-bold text-custom-blue">
              {formatPrice(car?.price)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Məsafə</p>
                </div>
                <p className="font-semibold ml-1">
                  {formatValue(car.range_km, " km")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Battery className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Mühərrik</p>
                </div>
                <p className="font-semibold">
                  {car.engine?.engine_type
                    ? `${car.engine.engine_type}`
                    : "Mövcud deyil"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  {!isElectric ? (
                    <>
                      <BsFuelPumpFill className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Sərfiyyat</p>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Şarj vaxtı</p>
                    </>
                  )}
                </div>
                <p className="font-semibold">
                  {!isElectric
                    ? formatValue(car.fuel_consumption, " L/100km")
                    : formatValue(car.charging_time, " saat")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Zap className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">0-100 km/saat</p>
                </div>
                <p className="font-semibold">
                  {formatValue(car.acceleration, " saniyə")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              className={`flex-1 bg-custom-blue cursor-pointer hover:bg-[#034ba3]`}
              onClick={() => onViewDetails?.(car)}
            >
              Ətraflı
            </Button>
            <Button
              variant={selected ? "default" : "outline"}
              className={`flex-1 ${
                selected
                  ? "bg-blue-900 text-white"
                  : "bg-slate-700 text-white hover:bg-slate-600 hover:text-white"
              } cursor-pointer`}
              onClick={() => (selected ? removeCar(car.id) : addCar(car))}
              disabled={disabled}
            >
              {selected ? "Seçildi" : "Müqayisə et"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
