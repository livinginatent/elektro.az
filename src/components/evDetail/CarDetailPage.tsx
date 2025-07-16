"use client";

import { useState } from "react";
import { ArrowLeft, Share2, ChartColumnStacked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EVCars } from "@/app/types";
import { ImageCarousel } from "./ImageCarousel";
import { getAvailabilityLabel } from "@/utils/getAvailabilityLabel";
import { colors } from "@/utils/colors";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { DealershipModal } from "../modals/DealershipModal";
import { ShareModal } from "../modals/ShareModal";
import { useCompareStore } from "@/lib/compareStore";
import CompareBar from "../compareBar/CompareBar";
import { CarSpecs } from "./CarSpecs";

interface CarDetailPageProps {
  car: EVCars;
  onBack?: () => void;
  onCalculateRange?: () => void;
  onFindCharging?: () => void;
}

export function CarDetailPage({ car, onBack }: CarDetailPageProps) {
  const [isDealershipModalOpen, setIsDealershipModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { addCar, removeCar, isSelected, selectedCars } = useCompareStore();
  const selected = isSelected(car.id);
  const disabled = !selected && selectedCars.length >= 4;

  const handleContactDealer = () => {
    setIsDealershipModalOpen(true);
  };

  const handleCloseDealershipModal = () => {
    setIsDealershipModalOpen(false);
  };
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className=" px-4 py-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri qayıt
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Carousel */}
            <div>
              <ImageCarousel
                images={car.carousel_images}
                alt={`${car.brand} ${car.model}`}
              />
            </div>
            {/* Car Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car.brand} {car.model}
                  </h1>
                  {getAvailabilityLabel(car.availability)}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {car.description}
                </p>
              </div>
              {/* Key Stats */}
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Əsas Spesifikasiyalar
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      style={{ color: colors.primary.blue }}
                      className="text-center p-4 bg-blue-50  rounded-sm"
                    >
                      <div className="text-2xl font-bold ">
                        {car.engine.engine_type !== "Tam Elektrik"
                          ? `${car.total_range} km`
                          : `${car.electric_range} km`}
                      </div>
                      <div className="text-sm text-gray-600">
                        Yürüş məsafəsi
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-sm">
                      <div className="text-2xl font-bold text-green-600">
                        {car.acceleration} saniyə
                      </div>
                      <div className="text-sm text-gray-600">0-100 km/saat</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-sm">
                      <div className="text-2xl font-bold text-purple-600">
                        {car.engine.engine_power} a.g
                      </div>
                      <div className="text-sm text-gray-600">Mühərrik gücü</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-sm">
                      {car.engine.engine_type === "Tam Elektrik" ? (
                        <>
                          <div className="text-2xl font-bold text-orange-600">
                            {car.charging_time} dəqiqə
                          </div>
                          <div className="text-sm text-gray-600">
                            Şarj vaxtı
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-orange-600">
                            {car.fuel_consumption} Litr/100Km
                          </div>
                          <div className="text-sm text-gray-600">Sərfiyyat</div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <p
                style={{ color: colors.primary.blue }}
                className="text-4xl font-bold  mb-4"
              >
                ₼{car.price}
              </p>
              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex  gap-3">
                  <Button
                    onClick={handleContactDealer}
                    className="flex-1 hover:bg-custom-blue cursor-pointer rounded-sm"
                    size="lg"
                  >
                    Dilerlə əlaqə saxla
                  </Button>
                </div>
                <div className="flex w-full flex-col md:flex-row lg:flex-row  gap-3">
                  <Button
                    variant={selected ? "default" : "outline"}
                    className={`flex-1 ${
                      selected ? "bg-blue-600 text-white" : "bg-transparent"
                    } cursor-pointer rounded-sm`}
                    onClick={() => (selected ? removeCar(car.id) : addCar(car))}
                    disabled={disabled}
                  >
                    <ChartColumnStacked className="h-4 w-4 mr-2" />
                    {selected ? "Seçildi" : "Müqayisə et"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="flex-1 cursor-pointer rounded-sm bg-transparent"
                    variant="outline"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
              {/* Warranty Info */}
              <Card className=" rounded-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Zəmanət:</span>
                    <p className="font-semibold self-let">{car.warranty}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Detailed Specifications */}
          <div>
            <h2 className="text-2xl text-center md:text-left lg:text-left font-bold text-gray-900 mb-6">
              Detallı spesifikasiyalar
            </h2>
            <CarSpecs car={car} />
          </div>
        </div>
      </div>

      {/* Dealership Modal */}
      <DealershipModal
        isOpen={isDealershipModalOpen}
        onClose={handleCloseDealershipModal}
        dealership={car.dealership}
        carBrand={car.brand}
        carModel={car.model}
        carImage={car.mainImage}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        carBrand={car.brand}
        carModel={car.model}
        carPrice={car.price}
        carUrl={`elektro-az.vercel.app/${car.id}`}
      />
      <Footer />
      <CompareBar />
    </>
  );
}
