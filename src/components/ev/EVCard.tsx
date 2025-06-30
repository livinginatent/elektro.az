import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Battery, Clock, Zap } from "lucide-react";

export interface EVCar {
  id: number;
  make: string;
  model: string;
  image: string;
  price: number;
  range: number;
  batteryCapacity: number;
  chargingTime: string;
  acceleration: string;
  topSpeed: number;
  available: boolean;
}

export default function EVCard({ car }: { car: EVCar }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={car.image || "/placeholder.svg"}
            alt={`${car.make} ${car.model}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            {car.available ? (
              <Badge className="bg-green-500 hover:bg-green-600">
                Available
              </Badge>
            ) : (
              <Badge variant="secondary">Coming Soon</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {car.make} {car.model}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Range</p>
                <p className="font-semibold">{car.range} mi</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Battery</p>
                <p className="font-semibold">{car.batteryCapacity} kWh</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Charging</p>
                <p className="font-semibold">{car.chargingTime}h</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">0-60 mph</p>
                <p className="font-semibold">{car.acceleration}s</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1">View Details</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Compare
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
