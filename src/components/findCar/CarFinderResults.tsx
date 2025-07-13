"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  SortAsc,
  Car,
  Zap,
  Users,
  MapPin,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { EVCars } from "@/app/types";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";


interface UserPreferences {
  budget: [number, number];
  usageType: string;
  bodyTypes: string[];
  seatingCapacity: number;
  rangeRequirement: number;
  chargingPreference: string;
  brandPreferences: string[];
  priorityFeatures: string[];
}

interface CarFinderResultsProps {
  cars: EVCars[];
  preferences: UserPreferences;
  onStartOver: () => void;
}

export function CarFinderResults({
  cars,
  preferences,
  onStartOver,
}: CarFinderResultsProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const getMatchPercentage = (car: EVCars) => {
    let score = 0;
    let maxScore = 0;

    // Budget match (20 points)
    maxScore += 20;
    if (
      car.price &&
      car.price >= preferences.budget[0] &&
      car.price <= preferences.budget[1]
    ) {
      score += 20;
    } else if (car.price && car.price <= preferences.budget[1] * 1.1) {
      score += 10;
    }

    // Body type match (15 points)
    maxScore += 15;
    if (preferences.bodyTypes.includes(car.body_type)) {
      score += 15;
    }

    // Seating capacity match (10 points)
    maxScore += 10;
    if (car.seating_capacity >= preferences.seatingCapacity) {
      score += 10;
    }

    // Range match (20 points)
    maxScore += 20;
    if (car.range_km && car.range_km >= preferences.rangeRequirement) {
      score += 20;
    } else if (
      car.range_km &&
      car.range_km >= preferences.rangeRequirement * 0.8
    ) {
      score += 10;
    }

    // Brand preference (10 points)
    maxScore += 10;
    if (
      preferences.brandPreferences.length === 0 ||
      preferences.brandPreferences.includes(car.brand)
    ) {
      score += 10;
    }

    // Priority features (25 points)
    maxScore += 25;
    const featureScore = 25 / Math.max(preferences.priorityFeatures.length, 1);
    preferences.priorityFeatures.forEach((feature) => {
      switch (feature) {
        case "range":
          if (car.range_km && car.range_km > 400) score += featureScore;
          break;
        case "speed":
          if (car.speed_km && car.speed_km > 180) score += featureScore;
          break;
        case "efficiency":
          if (car.efficiency_city > 100) score += featureScore;
          break;
        case "luxury":
          if (car.price && car.price > 80000) score += featureScore;
          break;
        case "technology":
          score += featureScore * 0.5; // Assume all modern EVs have good tech
          break;
        case "safety":
          if (car.safety && car.safety.length > 5) score += featureScore;
          break;
      }
    });

    return Math.round((score / maxScore) * 100);
  };

  const sortedCars = [...cars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "range":
        return (b.range_km || 0) - (a.range_km || 0);
      case "efficiency":
        return (b.efficiency_city || 0) - (a.efficiency_city || 0);
      case "relevance":
      default:
        return getMatchPercentage(b) - getMatchPercentage(a);
    }
  });

  const handleViewDetails = (car: EVCars) => {
    router.push(`/${car.id}`);
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "Avaialable":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Mövcuddur</Badge>
        );
      case "Pre-order":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Sifariş</Badge>
        );
      case "Not avaialble":
        return <Badge variant="secondary">Mövcud deyil</Badge>;
      default:
        return <Badge variant="secondary">Naməlum</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="mb-4 md:mb-0 rounded-sm bg-transparent cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Yenidən başla
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sizə Uyğun Avtomobillər
            </h1>
            <p className="text-gray-600">
              {cars.length} avtomobil tapıldı • Seçimlərinizə uyğun sıralanıb
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full  rounded-sm">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Uyğunluq</SelectItem>
                <SelectItem value="price-low">Qiymət (aşağı)</SelectItem>
                <SelectItem value="price-high">Qiymət (yüksək)</SelectItem>
                <SelectItem value="range">Məsafə</SelectItem>
                <SelectItem value="efficiency">Səmərəlilik</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-sm bg-transparent cursor-pointer"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtrlər
            </Button>
          </div>
        </div>

        {/* Filters Summary */}
        <Card className="rounded-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge variant="outline">
                Büdcə: ₼{preferences.budget[0].toLocaleString()}-
                {preferences.budget[1].toLocaleString()}
              </Badge>
              {preferences.bodyTypes.map((type) => (
                <Badge key={type} variant="outline">
                  {type}
                </Badge>
              ))}
              <Badge variant="outline">
                {preferences.seatingCapacity}+ nəfər
              </Badge>
              <Badge variant="outline">
                {preferences.rangeRequirement}+ km
              </Badge>
              {preferences.brandPreferences.map((brand) => (
                <Badge key={brand} variant="outline">
                  {brand}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {cars.length === 0 ? (
          <Card className="rounded-sm text-center p-12">
            <CardContent>
              <Car className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Heç bir avtomobil tapılmadı
              </h3>
              <p className="text-gray-600 mb-4">
                Seçimlərinizə uyğun avtomobil yoxdur. Filtrlərə yenidən baxın.
              </p>
              <Button
                onClick={onStartOver}
                className="rounded-sm cursor-pointer"
              >
                Yenidən cəhd edin
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCars.map((car) => {
              const matchPercentage = getMatchPercentage(car);

              return (
                <Card
                  key={car.id}
                  className="rounded-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Match Percentage Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      {matchPercentage}% uyğun
                    </Badge>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {getAvailabilityBadge(car.availability)}
                  </div>

                  {/* Car Image */}
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={car.mainImage || "/placeholder.svg"}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Car Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {car.brand} {car.model}
                        </h3>
                        {car.variant && (
                          <p className="text-gray-600">{car.variant}</p>
                        )}
                        <p className="text-2xl font-bold text-blue-600 mt-2">
                          {car.price
                            ? `₼${car.price.toLocaleString()}`
                            : "Qiymət yoxdur"}
                        </p>
                      </div>

                      {/* Key Specs */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Məsafə</p>
                            <p className="font-semibold">
                              {car.range_km || "N/A"} km
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Şarj</p>
                            <p className="font-semibold">
                              {car.charging_time || "N/A"}h
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Oturacaq</p>
                            <p className="font-semibold">
                              {car.seating_capacity} nəfər
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Növ</p>
                            <p className="font-semibold">{car.body_type}</p>
                          </div>
                        </div>
                      </div>

                      {/* Why it matches */}
                      <div className="bg-green-50 p-3 rounded-sm">
                        <p className="text-xs font-medium text-green-800 mb-1">
                          Niyə uyğundur:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {preferences.bodyTypes.includes(car.body_type) && (
                            <Badge  variant="secondary" className="text-xs">
                              Növ uyğun
                            </Badge>
                          )}
                          {car.range_km &&
                            car.range_km >= preferences.rangeRequirement && (
                              <Badge variant="secondary" className="text-xs">
                                Məsafə kifayət
                              </Badge>
                            )}
                          {car.seating_capacity >=
                            preferences.seatingCapacity && (
                            <Badge variant="secondary" className="text-xs">
                              Oturacaq kifayət
                            </Badge>
                          )}
                          {car.price &&
                            car.price >= preferences.budget[0] &&
                            car.price <= preferences.budget[1] && (
                              <Badge variant="secondary" className="text-xs">
                                Büdcəyə uyğun
                              </Badge>
                            )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 rounded-sm cursor-pointer"
                          onClick={() => handleViewDetails(car)}
                        >
                          Ətraflı bax
                        </Button>
                  
                     
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {cars.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="rounded-sm bg-transparent cursor-pointer"
            >
              Daha çox göstər
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
