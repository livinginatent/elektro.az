"use client";

import { Phone, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { colors } from "@/utils/colors";

interface Dealership {
  name: string;
  phone_number: string;
  address: string;
}

interface DealershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealership: Dealership;
  carBrand?: string | null;
  carModel?: string | null;
}

export function DealershipModal({
  isOpen,
  onClose,
  dealership,
  carBrand,
  carModel,
}: DealershipModalProps) {
  const handleCallDealer = () => {
    window.open(`tel:${dealership.phone_number}`, "_self");
  };

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(dealership.address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Diler məlumatları
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Car Info */}
          {carBrand && carModel && (
            <Card className="bg-blue-50 border-blue-200 rounded-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">Seçilmiş avtomobil:</p>
                <p className="font-semibold text-gray-900">
                  {carBrand} {carModel}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Dealership Information */}
          <div className="space-y-4">
            {/* Dealership Name */}
            <div className="flex items-start gap-3">
              <Building
                color={colors.primary.blue}
                className="h-5 w-5 text-gray-500 mt-0.5"
              />
              <div>
                <p className="text-sm text-gray-600">Diler</p>
                <p className="font-semibold text-gray-900">{dealership.name}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-3">
              <Phone
                color={colors.primary.blue}
                className="h-5 w-5 text-gray-500 mt-0.5"
              />
              <div>
                <p className="text-sm text-gray-600">Telefon nömrəsi</p>
                <p className="font-semibold text-gray-900">
                  {dealership.phone_number}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin
                color={colors.primary.blue}
                className="h-5 w-5 text-gray-500 mt-0.5"
              />
              <div>
                <p className="text-sm text-gray-600">Ünvan</p>
                <p className="font-semibold text-gray-900">
                  {dealership.address}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleCallDealer}
              className="w-full bg-green-600 hover:bg-green-700 rounded-sm cursor-pointer"
              size="lg"
            >
              <Phone className="h-4 w-4 mr-2 cursor-pointer" />
              Zəng et
            </Button>

            <Button
              onClick={handleGetDirections}
              variant="outline"
              className="w-full rounded-sm bg-transparent cursor-pointer"
              size="lg"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Yol göstər
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-sm bg-transparent cursor-pointer"
            >
              Bağla
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Diler ilə əlaqə saxlayarkən {carBrand} {carModel} haqqında
              soruşmağı unutmayın
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
