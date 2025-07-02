"use client";

import Image from "next/image";
import { MapPin, Battery, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { colors } from "@/utils/colors";
import { EVCars } from "@/app/types";

interface EVCarCardProps {
  car: EVCars;
  onViewDetails?: (car: EVCars) => void;
  onCompare?: (car: EVCars) => void;
}

export function EVCarCard({ car, onViewDetails, onCompare }: EVCarCardProps) {
  const availabilityLabel = (availability: string) => {
    if (availability === "In Stock") {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Satışda var</Badge>
      );
    } else if (availability === "Out of stock") {
      return <Badge className="bg-red-500 hover:bg-red-600">Satışda yoxdur</Badge>;
    }else{
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600">Sifarişlə</Badge>
      );
    }
  };
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden max-w-md">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={car.mainImage || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            width={340}
            height={260}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            {availabilityLabel(car.availability)}
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
              <MapPin className="h-4 w-4 text-gray-500" />
              <div className="">
                <p className="text-sm text-gray-500">Məsafə</p>
                <p className="font-semibold">{car.range_km} km</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Batareya</p>
                <p className="font-semibold">{car.battery_capacity} kWh</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Şarj vaxtı</p>
                <p className="font-semibold">{car.charging_time} dəq</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">0-100 km/saat</p>
                <p className="font-semibold">{car.acceleration} sn</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              style={{ background: colors.primary.blue, cursor: "pointer" }}
              onClick={() => onViewDetails?.(car)}
            >
              Ətraflı
            </Button>
            <Button
              variant="outline"
              style={{
                background: colors.primary.lightBlue,
                cursor: "pointer",
              }}
              className="flex-1"
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
