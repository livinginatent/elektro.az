"use client";

import Image from "next/image";
import { MapPin, Battery, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { getAvailabilityLabel } from "@/utils/getAvailabilityLabel";

interface EVCarCardProps {
  car: EVCars;
  onViewDetails?: (car: EVCars) => void;
  onCompare?: (car: EVCars) => void;
}

export function EVCarCard({ car, onViewDetails, onCompare }: EVCarCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden max-w-md">
      <CardHeader className="p-0">
        <div className="relative p-1">
          <Image
            src={car.mainImage || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
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
              {car.brand} {car.model}
            </h3>
            <p className="text-xl font-bold text-blue-600">
              ${car?.price?.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center  space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Məsafə</p>
                </div>
                <p className="font-semibold ml-1">{car.range_km} km</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Battery className="h-4 w-4 text-gray-500" />

                  <p className="text-sm text-gray-500">Mühərrik gücü</p>
                </div>
                <p className="font-semibold">{car.engine_power} a.g</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">Şarj vaxtı</p>
                </div>
                <p className="font-semibold">{car.charging_time} saat</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Zap className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-500">0-100 km/saat</p>
                </div>
                <p className="font-semibold">{car.acceleration} sn</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className={`flex-1 bg-[#1d242a]  cursor-pointer hover:bg-slate-700`}
              onClick={() => onViewDetails?.(car)}
            >
              Ətraflı
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-[#caf0f8] hover:bg-blue-200"
              onClick={() => onCompare?.(car)}
            >
              Müqayisə et
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
