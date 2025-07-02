"use client";

import { ArrowLeft, Heart, Share2, Calculator, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { CarSpecs } from "./CarSpecs";
interface CarDetailPageProps {
  car: EVCars;
  onBack?: () => void;
  onCalculateRange?: () => void;
  onFindCharging?: () => void;
}

export function CarDetailPage({
  car,
  onBack,
  onCalculateRange,
  onFindCharging,
}: CarDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button variant="outline" onClick={onBack} className="mb-6 bg-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Carousel */}
          <div>
           {/*  <ImageCarousel
              images={car.mainImage}
              alt={`${car.brand} ${car.model}`}
            /> */}
          </div>

          {/* Car Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.model}
                </h1>
                {car.availability ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${car.price}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Key Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {car.range_km}
                    </div>
                    <div className="text-sm text-gray-600">Miles Range</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {car.acceleration}s
                    </div>
                    <div className="text-sm text-gray-600">0-60 mph</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {car.battery_capacity}
                    </div>
                    <div className="text-sm text-gray-600">kWh Battery</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {car.charging_time}h
                    </div>
                    <div className="text-sm text-gray-600">Fast Charging</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  Request Test Drive
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={onCalculateRange}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Range
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={onFindCharging}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Charging
                </Button>
              </div>
            </div>

            {/* Warranty Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Warranty:</span>
                  <span className="font-semibold">{car.warranty}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detailed Specifications
          </h2>
          <CarSpecs car={car}/>
        </div>
      </div>
    </div>
  );
}
