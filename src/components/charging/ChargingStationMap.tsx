"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, Navigation, Zap, Coffee, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChargingStationDetails } from "./ChargingStationDetails";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChargingPoint } from "@/app/types";
import { useScreenSize } from "@/utils/getScreenSize";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { FadeLoader } from "react-spinners";
import { colors } from "@/utils/colors";

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface ChargingStationMapProps {
  chargingPoints: ChargingPoint[];
}

// Custom charging station icon
const createChargingIcon = (hasCafe = false, hasWc = false) => {
  const cafeIcon = hasCafe ? "☕" : "";
  const wcIcon = hasWc ? "🚻" : "";

  return L.divIcon({
    html: `
      <div style="
        background-color: #22c55e;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
        position: relative;
      ">
        ⚡
        <div style="
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 10px;
          display: flex;
          gap: 1px;
        ">
          ${cafeIcon}${wcIcon}
        </div>
      </div>
    `,
    className: "custom-charging-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Component to handle map centering
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export function ChargingStationMap({
  chargingPoints,
}: ChargingStationMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState<ChargingPoint | null>(
    null
  );
  const { width } = useScreenSize();

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    40.4093, 49.8671,
  ]); // Baku coordinates
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [showOnlyWithCafe, setShowOnlyWithCafe] = useState(false);
  const [showOnlyWithWc, setShowOnlyWithWc] = useState(false);
  const [connectorFilter, setConnectorFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("distance");
  const [loading, setLoading] = useState<boolean>(true);
  const [geolocationDenied, setGeolocationDenied] = useState<boolean>(false);

  // Get user's current location
  useEffect(() => {
    // Default fallback coordinates (Baku)
    const defaultCoords: [number, number] = [40.4093, 49.8671];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(coords);
          setMapCenter(coords);
          setLoading(false);
        },
        (error) => {
          // Handle geolocation errors
          console.warn("Geolocation error:", error.message);
          setGeolocationDenied(true);
          // Use default location (Baku) when geolocation is denied/fails
          setUserLocation(defaultCoords);
          setMapCenter(defaultCoords);
          setLoading(false);
        },
        {
          enableHighAccuracy: false, // Don't require high accuracy to avoid timeout issues
          timeout: 10000, // 10 second timeout
          maximumAge: 300000, // Accept cached position up to 5 minutes old
        }
      );
    } else {
      // Geolocation not supported
      console.warn("Geolocation is not supported by this browser");
      setGeolocationDenied(true);
      setUserLocation(defaultCoords);
      setMapCenter(defaultCoords);
      setLoading(false);
    }
  }, []);

  // Calculate distance between two points
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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
  const getWorkingHoursDisplay = (
    workingHours: ChargingPoint["working_hours"]
  ) => {
    const activeHours = workingHours?.filter((hour) => hour.active);
    if (activeHours?.length === 7) {
      // Check if all days have same hours
      const firstDay = activeHours[0];
      const allSame = activeHours?.every(
        (day) => day.start === firstDay.start && day.end === firstDay.end
      );

      if (allSame) {
        if (firstDay.start === 0 && firstDay.end === 1440) {
          return "24/7";
        } else {
          const startHour = Math.floor(firstDay.start / 60);
          const startMin = firstDay.start % 60;
          const endHour = Math.floor(firstDay.end / 60);
          const endMin = firstDay.end % 60;
          return `${startHour.toString().padStart(2, "0")}:${startMin
            .toString()
            .padStart(2, "0")} - ${endHour.toString().padStart(2, "0")}:${endMin
            .toString()
            .padStart(2, "0")}`;
        }
      }
    }
    return "Müxtəlif saatlar";
  };

  // Filter and sort charging points
  const filteredAndSortedPoints = useMemo(() => {
    const filtered = chargingPoints.filter((point) => {
      // Search filter
      if (
        searchQuery &&
        !point.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !point?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Cafe filter
      if (showOnlyWithCafe && !point.cafe) {
        return false;
      }
      // WC filter
      if (showOnlyWithWc && !point.wc) {
        return false;
      }

      // Connector filter
      if (connectorFilter !== "all") {
        if (!point.types.includes(connectorFilter)) {
          return false;
        }
      }

      return true;
    });

    // Sort points
    if (sortBy === "distance" && userLocation) {
      filtered.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation[0],
          userLocation[1],
          a.geometry.coordinates[1],
          a.geometry.coordinates[0]
        );
        const distanceB = calculateDistance(
          userLocation[0],
          userLocation[1],
          b.geometry.coordinates[1],
          b.geometry.coordinates[0]
        );
        return distanceA - distanceB;
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    }

    return filtered;
  }, [
    chargingPoints,
    searchQuery,
    showOnlyWithCafe,
    connectorFilter,
    sortBy,
    userLocation,
    showOnlyWithWc,
  ]);

  const handleStationSelect = (station: ChargingPoint) => {
    setSelectedStation(station);
    setMapCenter([
      station.geometry.coordinates[1],
      station.geometry.coordinates[0],
    ]);
  };

  const handleGetDirections = (station: ChargingPoint) => {
    const [lon, lat] = station.geometry.coordinates;
    const url = `https://maps.google.com/?q=${lat},${lon}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleShowDetails = (station: ChargingPoint) => {
    setSelectedStation(station);
    setDetailsModalOpen(true);
  };

  // Get unique connector types for filter
  const uniqueConnectorTypes = useMemo(() => {
    const types = new Set<string>();
    chargingPoints.forEach((point) => {
      point.types?.forEach((type) => types.add(type));
    });
    return Array.from(types);
  }, [chargingPoints]);

  if (loading) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="min-h-screen flex items-center justify-center">
                <FadeLoader color={colors.primary.blue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col h-full">
          {" "}
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <BsFillLightningChargeFill className="h-6 w-6 text-custom-blue" />
              Elektrik Doldurma Məntəqələri
            </h1>

            {/* Geolocation Notice */}
            {geolocationDenied && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-sm">
                <p className="text-sm text-yellow-800">
                  📍 Yerləşdiyiniz yer təyin edilə bilmədi. Bakı mərkəzindən
                  məsafələr göstərilir.
                </p>
              </div>
            )}

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Ünvan və ya yer axtarın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-sm"
              />
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="cafe-only" className="text-sm font-medium ">
                  Kafe olan yerlər
                </Label>
                <Switch
                  className="cursor-pointer"
                  id="cafe-only"
                  checked={showOnlyWithCafe}
                  onCheckedChange={setShowOnlyWithCafe}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="wc-only" className="text-sm font-medium">
                  Tualet olan yerlər
                </Label>
                <Switch
                  className="cursor-pointer"
                  id="wc-only"
                  checked={showOnlyWithWc}
                  onCheckedChange={setShowOnlyWithWc}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={connectorFilter}
                  onValueChange={setConnectorFilter}
                >
                  <SelectTrigger className="rounded-sm cursor-pointer">
                    <SelectValue placeholder="Konnector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="all">
                      Bütün konnektorlar
                    </SelectItem>
                    {uniqueConnectorTypes.map((type) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={type}
                        value={type}
                      >
                        {getConnectorDisplayName(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-sm cursor-pointer">
                    <SelectValue placeholder="Sıralama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="distance">
                      Məsafəyə görə
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="name">
                      Ada görə
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {filteredAndSortedPoints.length} məntəqə tapıldı
            </div>
          </div>
          {/* Station List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {filteredAndSortedPoints.map((station) => {
                const distance = userLocation
                  ? calculateDistance(
                      userLocation[0],
                      userLocation[1],
                      station.geometry.coordinates[1],
                      station.geometry.coordinates[0]
                    )
                  : null;

                return (
                  <Card
                    key={station._id}
                    className={`cursor-pointer transition-all hover:shadow-md rounded-sm ${
                      selectedStation?._id === station._id
                        ? "ring-1 ring-custom-blue"
                        : ""
                    }`}
                    onClick={() => handleStationSelect(station)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {station.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {station.address}
                            </p>
                          </div>
                          {distance && (
                            <Badge variant="outline" className="text-xs">
                              {distance.toFixed(1)} km
                              {geolocationDenied && "*"}
                            </Badge>
                          )}
                        </div>

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
                        </div>

                        <div className="text-xs text-gray-500">
                          <p>
                            Konnektorlar:{" "}
                            {station.types
                              ?.slice(0, 4)
                              .map((type) => getConnectorDisplayName(type))
                              .join(", ")}
                            {station.types.length > 4 && " və daha çox"}
                          </p>
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 rounded-sm bg-transparent cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGetDirections(station);
                            }}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Yol göstər
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 rounded-sm bg-transparent cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowDetails(station);
                            }}
                          >
                            Ətraflı
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredAndSortedPoints.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Heç bir elektrik doldurma məntəqəsi tapılmadı</p>
                  <p className="text-sm mt-1">
                    Axtarış filtrlərini dəyişməyi cəhd edin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Map */}
        {width > 768 && (
          <div className="flex-1 relative">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController center={mapCenter} />

              {/* User location marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    html: `
                  <div style="
                    background-color: ${geolocationDenied ? "#f59e0b" : "#3b82f6"};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  "></div>
                `,
                    className: "user-location-icon",
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                  })}
                >
                  <Popup>
                    <div className="text-center">
                      <p className="font-semibold">
                        {geolocationDenied
                          ? "Bakı mərkəzi (təxmini yer)"
                          : "Sizin yerləşdiyiniz yer"}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Charging station markers */}
              {filteredAndSortedPoints.map((station) => (
                <Marker
                  key={station._id}
                  position={[
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0],
                  ]}
                  icon={createChargingIcon(station.cafe, station.wc)}
                  eventHandlers={{
                    click: () => handleStationSelect(station),
                  }}
                >
                  <Popup>
                    <div className="min-w-[250px]">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {station.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {station.address}
                      </p>

                      <div className="space-y-2 mb-3">
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
                        </div>

                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Konnektorlar:</strong>
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {station.types?.map((type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {getConnectorDisplayName(type)}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>
                            {getWorkingHoursDisplay(station.working_hours)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 rounded-sm cursor-pointer"
                          onClick={() => handleGetDirections(station)}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Yol göstər
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-sm bg-transparent cursor-pointer"
                          onClick={() => handleShowDetails(station)}
                        >
                          Ətraflı
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend */}
            <Card className="absolute top-4 right-4 z-[1000] rounded-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Xəritə açarı</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ⚡
                    </div>
                    <span>Elektrik doldurma məntəqəsi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs relative">
                      ⚡
                      <div className="absolute -top-1 -right-1 text-xs">☕</div>
                    </div>
                    <span>Kafe ilə</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs relative">
                      ⚡
                      <div className="absolute -top-1 -right-1 text-xs">🚻</div>
                    </div>
                    <span>Tualet ilə</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${geolocationDenied ? "bg-amber-500" : "bg-blue-500"}`}
                    ></div>
                    <span>
                      {geolocationDenied ? "Bakı mərkəzi" : "Sizin yeriniz"}
                    </span>
                  </div>
                  {geolocationDenied && (
                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                      * Məsafələr Bakı mərkəzindən hesablanır
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {/* Details Modal */}
        {selectedStation && (
          <ChargingStationDetails
            station={selectedStation}
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            distance={
              userLocation
                ? calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    selectedStation.geometry.coordinates[1],
                    selectedStation.geometry.coordinates[0]
                  )
                : undefined
            }
          />
        )}
      </div>
      <Footer />
    </>
  );
}
