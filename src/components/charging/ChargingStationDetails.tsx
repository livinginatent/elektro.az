"use client";

import { useState } from "react";
import {
  MapPin,
  Zap,
  Clock,
  Phone,
  Coffee,
  Car,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChargingPoint } from "@/app/types";

interface ChargingStationDetailsProps {
  station: ChargingPoint;
  isOpen: boolean;
  onClose: () => void;
  distance?: number;
}

export function ChargingStationDetails({
  station,
  isOpen,
  onClose,
  distance,
}: ChargingStationDetailsProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleGetDirections = () => {
    setIsNavigating(true);
    const [lon, lat] = station.geometry.coordinates;
    const url = `https://maps.google.com/?q=${lat},${lon}`;
    window.open(url, "_blank");
    setTimeout(() => setIsNavigating(false), 2000);
  };

  // Get connector type display name
  const getConnectorDisplayName = (type: string) => {
    const connectorNames: { [key: string]: string } = {
      wall_euro: "Wall Euro",
      chademo: "CHAdeMO",
      ccs_combo_1: "CCS Combo 1",
      ccs_combo_2: "CCS Combo 2",
      type_2: "Type 2",
      type_1: "Type 1",
    };
    return connectorNames[type] || type.toUpperCase();
  };

  // Get working hours display
  const getDetailedWorkingHours = (
    workingHours: ChargingPoint["working_hours"]
  ) => {
    return workingHours.map((day) => {
      if (!day.active) {
        return { day: day.name, hours: "Bağlı" };
      }

      if (day.start === 0 && day.end === 1440) {
        return { day: day.name, hours: "24 saat" };
      }

      const startHour = Math.floor(day.start / 60);
      const startMin = day.start % 60;
      const endHour = Math.floor(day.end / 60);
      const endMin = day.end % 60;

      return {
        day: day.name,
        hours: `${startHour.toString().padStart(2, "0")}:${startMin
          .toString()
          .padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${endMin
          .toString()
          .padStart(2, "0")}`,
      };
    });
  };

  const workingHoursDetails = getDetailedWorkingHours(station.working_hours);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            {station.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <Card className="rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-wrap gap-1">
                  {station.cafe && (
                    <Badge variant="secondary" className="text-xs">
                      <Coffee className="h-3 w-3 mr-1" />
                      Kafe
                    </Badge>
                  )}
                  {station.wc && (
                    <Badge variant="secondary" className="text-xs">
                      🚻 Tualet
                    </Badge>
                  )}
                  {Number.parseInt(station.quantity) > 0 && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                      {station.quantity} şarj yeri
                    </Badge>
                  )}
                </div>
                {distance && (
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {distance.toFixed(1)} km
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-700">{station.address}</p>
                </div>

                {station.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a
                      href={`tel:${station.phone}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {station.phone}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Connector Types */}
          <Card className="rounded-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="h-4 w-4" />
                Konnector növləri
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {station.types.map((type, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {getConnectorDisplayName(type)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="rounded-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                İş saatları
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {workingHoursDetails.map((dayInfo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {dayInfo.day === "Monday" && "Bazar ertəsi"}
                      {dayInfo.day === "Tuesday" && "Çərşənbə axşamı"}
                      {dayInfo.day === "Wednesday" && "Çərşənbə"}
                      {dayInfo.day === "Thursday" && "Cümə axşamı"}
                      {dayInfo.day === "Friday" && "Cümə"}
                      {dayInfo.day === "Saturday" && "Şənbə"}
                      {dayInfo.day === "Sunday" && "Bazar"}
                    </span>
                    <span
                      className={`${
                        dayInfo.hours === "Bağlı"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {dayInfo.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGetDirections}
              className="flex-1 rounded-sm"
              disabled={isNavigating}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isNavigating ? "Açılır..." : "Yol göstər"}
            </Button>

            {station.phone && (
              <Button
                variant="outline"
                className="rounded-sm bg-transparent"
                onClick={() => window.open(`tel:${station.phone}`, "_self")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Zəng et
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
