"use client";

import React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Calculator,
  Car,
  Thermometer,
  Wind,
  Route,
  Zap,
  Info,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { EVCars } from "@/app/types";
import Image from "next/image";
import { GiBullseye, GiHorizonRoad } from "react-icons/gi";
import { colors } from "@/utils/colors";
import {
  MdBatteryChargingFull,
  MdEco,
  MdOutlineWindPower,
} from "react-icons/md";
import {
  RiEmotionHappyFill,
  RiProgress1Fill,
  RiProgress4Fill,
  RiProgress6Fill,
} from "react-icons/ri";
import { IoCarSport, IoClose } from "react-icons/io5";
import { BsSpeedometer } from "react-icons/bs";
import {
  FaCity,
  FaGears,
  FaHillRockslide,
  FaMountainSun,
  FaRoad,
} from "react-icons/fa6";
import { ShareModal } from "../modals/ShareModal";
import { useScreenSize } from "@/utils/getScreenSize";

interface StepByStepRangeCalculatorProps {
  initialCars: EVCars[];
}

interface CalculationResult {
  estimatedRange: number | null;
  originalRange: number | null;
  factors: {
    temperature: number | null;
    drivingStyle: number | null;
    terrain: number | null;
    acUsage: number | null;
    speed: number | null;
  };
}

export function StepByStepRangeCalculator({
  initialCars,
}: StepByStepRangeCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<EVCars[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<EVCars | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };
  // Step 2: Battery and basic settings
  const [batteryLevel, setBatteryLevel] = useState([100]);

  // Step 3: Driving conditions
  const [temperature, setTemperature] = useState([20]);
  const [drivingStyle, setDrivingStyle] = useState("");
  const [terrain, setTerrain] = useState("");

  // Step 4: Additional factors
  const [acUsage, setAcUsage] = useState("");
  const [averageSpeed, setAverageSpeed] = useState([60]);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { width } = useScreenSize();
  const steps = [
    { number: 1, title: "Avtomobil seçin", icon: Car },
    { number: 2, title: "Batareya səviyyəsi", icon: Zap },
    { number: 3, title: "Sürücülük şəraiti", icon: Route },
    { number: 4, title: "Əlavə amillər", icon: Thermometer },
    { number: 5, title: "Nəticə", icon: Calculator },
  ];

  // Search functionality
  useEffect(() => {
    if (!search) {
      setCars(initialCars);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const filteredCars = initialCars.filter(
        (car) =>
          car.brand.toLowerCase().includes(search.toLowerCase()) ||
          car.model?.toLowerCase().includes(search.toLowerCase())
      );
      setCars(filteredCars);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, initialCars]);

  const handleCarSelect = (car: EVCars) => {
    setSelectedCar(car);
    setSearch(`${car.brand} ${car.model}`);
    setShowDropdown(false);
  };

  const calculateRange = () => {
    if (!selectedCar) return;

    const baseRange = selectedCar.range_km;
    let rangeFactor = 1;

    // Temperature effect
    const temp = temperature[0];
    if (temp < 0) rangeFactor *= 0.7;
    else if (temp < 10) rangeFactor *= 0.8;
    else if (temp > 35) rangeFactor *= 0.85;
    else if (temp > 25) rangeFactor *= 0.9;

    // Driving style effect
    switch (drivingStyle) {
      case "eco":
        rangeFactor *= 1.15;
        break;
      case "normal":
        rangeFactor *= 1.0;
        break;
      case "sport":
        rangeFactor *= 0.8;
        break;
      case "aggressive":
        rangeFactor *= 0.65;
        break;
    }

    // Terrain effect
    switch (terrain) {
      case "flat":
        rangeFactor *= 1.0;
        break;
      case "hilly":
        rangeFactor *= 0.85;
        break;
      case "mountainous":
        rangeFactor *= 0.7;
        break;
      case "city":
        rangeFactor *= 0.9;
        break;
    }

    // AC usage effect
    switch (acUsage) {
      case "off":
        rangeFactor *= 1.0;
        break;
      case "low":
        rangeFactor *= 0.95;
        break;
      case "moderate":
        rangeFactor *= 0.9;
        break;
      case "high":
        rangeFactor *= 0.8;
        break;
    }

    // Speed effect
    const speed = averageSpeed[0];
    if (speed > 120) rangeFactor *= 0.7;
    else if (speed > 100) rangeFactor *= 0.8;
    else if (speed > 80) rangeFactor *= 0.9;
    else if (speed < 30) rangeFactor *= 0.85;

    // Battery level effect
    const battery = batteryLevel[0] / 100;

    const estimatedRange =
      baseRange && Math.round(baseRange * rangeFactor * battery);

    setResult({
      estimatedRange,
      originalRange: baseRange && Math.round(baseRange * battery),
      factors: {
        temperature:
          temp < 0 || temp > 35 ? (temp < 0 ? -30 : -15) : temp > 25 ? -10 : 0,
        drivingStyle:
          drivingStyle === "eco"
            ? 15
            : drivingStyle === "sport"
            ? -20
            : drivingStyle === "aggressive"
            ? -35
            : 0,
        terrain:
          terrain === "hilly"
            ? -15
            : terrain === "mountainous"
            ? -30
            : terrain === "city"
            ? -10
            : 0,
        acUsage:
          acUsage === "high"
            ? -20
            : acUsage === "moderate"
            ? -10
            : acUsage === "low"
            ? -5
            : 0,
        speed:
          speed > 120
            ? -30
            : speed > 100
            ? -20
            : speed > 80
            ? -10
            : speed < 30
            ? -15
            : 0,
      },
    });
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2:
        return selectedCar !== undefined;
      case 3:
        return selectedCar !== undefined;
      case 4:
        return (
          selectedCar !== undefined && drivingStyle !== "" && terrain !== ""
        );
      case 5:
        return (
          selectedCar !== undefined &&
          drivingStyle !== "" &&
          terrain !== "" &&
          acUsage !== ""
        );
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (currentStep === 5) {
      calculateRange();
    } else if (canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "current";
    return "upcoming";
  };
  // Get display names for conditions
  const getDrivingStyleDisplay = (style: string) => {
    switch (style) {
      case "eco":
        return "Eco";
      case "normal":
        return "Normal";
      case "sport":
        return "Sport";
      case "aggressive":
        return "Aqressiv";
      default:
        return style;
    }
  };

  const getTerrainDisplay = (terrain: string) => {
    switch (terrain) {
      case "flat":
        return "Düz yol";
      case "hilly":
        return "Təpəlik";
      case "mountainous":
        return "Dağlıq";
      case "city":
        return "Şəhər içi";
      default:
        return terrain;
    }
  };

  const getAcUsageDisplay = (usage: string) => {
    switch (usage) {
      case "off":
        return "Bağlı";
      case "low":
        return "Aşağı";
      case "moderate":
        return "Orta";
      case "high":
        return "Yüksək";
      default:
        return usage;
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-col items-center justify-center gap-2">
          Elektromobil Yürüş Məsafəsi Kalkulyatoru
          <Calculator className="h-8 w-8 text-blue-600" />
        </h1>
        <p className="text-gray-600">
          Addım-addım elektrik avtomobilinizin yürüş məsafəsini hesablayın
        </p>
      </div>

      {/* Progress Steps */}
      {width > 768 && (
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between  mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    getStepStatus(step.number) === "completed"
                      ? "bg-green-500 border-green-500 text-white"
                      : getStepStatus(step.number) === "current"
                      ? "bg-[#023e8a] border-[#023e8a] text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                >
                  {getStepStatus(step.number) === "completed" ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <p
                  className={`text-xs mt-2 text-center max-w-20 ${
                    getStepStatus(step.number) === "current"
                      ? "text-[#023e8a] font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    getStepStatus(step.number) === "completed"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }     hidden sm:block`} // Hide on mobile (sm and below), show on larger screens`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        <p className="text-sm text-gray-500 mt-2 text-center">
          Addım {currentStep} / {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <Card className="rounded-sm min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "h-5 w-5 text-[#023e8a]",
            })}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Car Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Avtomobil axtarın (məs: Tesla Model 3)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 rounded-sm h-12 text-xs md:text-lg lg:text-lg"
                />

                {showDropdown && cars.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                    {cars.slice(0, 5).map((car) => (
                      <button
                        key={car.id}
                        onClick={() => handleCarSelect(car)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {car.brand} {car.model}
                            </p>
                            <p className="text-sm text-gray-500">
                              {car.range_km} km yürüş məsafəsi
                            </p>
                          </div>
                          <Badge
                            className="bg-[#023e8a] text-white"
                            variant="secondary"
                          >
                            ₼{car.price}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCar && (
                <Card className="bg-blue-50 border-blue-200 rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
                      <div>
                        <p className="text-xl text-center md:text-left lg:text-left font-semibold text-gray-900">
                          {selectedCar.brand} {selectedCar.model}
                        </p>
                        <p className="text-gray-600">
                          Baza yürüş məsafəsi: {selectedCar.range_km} km
                        </p>
                        <p className="text-gray-600">
                          Batareya tutumu: {selectedCar.battery_capacity} kWh
                        </p>
                        <p className="text-[#023e8a] text-center md:text-left lg:text-left font-semibold text-lg">
                          ₼{selectedCar.price}
                        </p>
                      </div>
                      <Image
                        src={selectedCar.mainImage}
                        width={200}
                        height={200}
                        alt=""
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedCar && (
                <div className="text-center py-12 text-gray-500">
                  <Car className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Hesablamaya başlamaq üçün avtomobil seçin</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Battery Level */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl flex justify-center items-center mb-4">
                  <MdBatteryChargingFull color={colors.primary.blue} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Batareya səviyyəsini seçin
                </h3>
                <p className="text-gray-600">Cari batareya səviyyənizi seçin</p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#023e8a]">
                    {batteryLevel[0]}%
                  </div>
                  <p className="text-gray-600">Batareya səviyyəsi</p>
                </div>

                <Slider
                  value={batteryLevel}
                  onValueChange={setBatteryLevel}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {selectedCar && (
                <Card className="bg-blue-50 border-blue-200 rounded-sm">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Təxmini mövcud məsafə
                      </p>
                      <p className="text-2xl font-bold text-blue-800">
                        {selectedCar.range_km &&
                          Math.round(
                            (selectedCar.range_km * batteryLevel[0]) / 100
                          )}
                        km
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Driving Conditions */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl justify-center items-center flex mb-4">
                  <GiHorizonRoad color={colors.primary.blue} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Sürücülük şəraitini seçin
                </h3>
                <p className="text-gray-600">
                  Bu amillər yürüş məsafəsinə təsir edir
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Sürücülük tərzi
                  </Label>
                  <Select value={drivingStyle} onValueChange={setDrivingStyle}>
                    <SelectTrigger className="rounded-sm h-12">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eco">
                        {<MdEco color={colors.primary.blue} />} Eco (qənaətcil)
                        : +15% məsafə
                      </SelectItem>
                      <SelectItem value="normal">
                        {<RiEmotionHappyFill color={colors.primary.blue} />}{" "}
                        Normal: standart məsafə
                      </SelectItem>
                      <SelectItem value="sport">
                        {<IoCarSport color={colors.primary.blue} />} Sport: -20%
                        məsafə
                      </SelectItem>
                      <SelectItem value="aggressive">
                        {<BsSpeedometer color={colors.primary.blue} />}{" "}
                        Aqressiv: -35% məsafə
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Ərazi növü</Label>
                  <Select value={terrain} onValueChange={setTerrain}>
                    <SelectTrigger className="rounded-sm h-12">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">
                        {<FaRoad color={colors.primary.blue} />} Düz yol:
                        standart məsafə
                      </SelectItem>
                      <SelectItem value="hilly">
                        {<FaHillRockslide color={colors.primary.blue} />}{" "}
                        Təpəlik: -15% məsafə
                      </SelectItem>
                      <SelectItem value="mountainous">
                        {<FaMountainSun color={colors.primary.blue} />} Dağlıq:
                        -30% məsafə
                      </SelectItem>
                      <SelectItem value="city">
                        {<FaCity color={colors.primary.blue} />} Şəhər içi: -10%
                        məsafə
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Hava temperaturu: {temperature[0]}°C
                </Label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={45}
                  min={-20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>-20°C (çox soyuq)</span>
                  <span>20°C (ideal)</span>
                  <span>45°C (çox isti)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Additional Factors */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl flex justify-center items-center mb-4">
                  <FaGears color={colors.primary.blue} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Əlavə amillər</h3>
                <p className="text-gray-600">Son tənzimləmələr</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <MdOutlineWindPower className="h-4 w-4" />
                    Kondisioner istifadəsi
                  </Label>
                  <Select value={acUsage} onValueChange={setAcUsage}>
                    <SelectTrigger className="rounded-sm h-12">
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">
                        {<IoClose color={"red"} />} Bağlı - standart məsafə
                      </SelectItem>
                      <SelectItem value="low">
                        {<RiProgress1Fill color={colors.primary.blue} />} Aşağı
                        - -5% məsafə
                      </SelectItem>
                      <SelectItem value="moderate">
                        {<RiProgress4Fill color={colors.primary.blue} />} Orta -
                        -10% məsafə
                      </SelectItem>
                      <SelectItem value="high">
                        {<RiProgress6Fill color={colors.primary.blue} />} Yüksək
                        - -20% məsafə
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Orta sürət: {averageSpeed[0]} km/saat
                  </Label>
                  <Slider
                    value={averageSpeed}
                    onValueChange={setAverageSpeed}
                    max={150}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>20 km/s</span>
                    <span>80 km/s (optimal)</span>
                    <span>150 km/s</span>
                  </div>
                </div>
              </div>

              <Card className="bg-yellow-50 border-yellow-200 rounded-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">
                        Məsləhət:
                      </p>
                      <p className="text-sm text-yellow-700">
                        80 km/saat sürətdə getmək və Eco rejimini istifadə etmək
                        ən yaxşı məsafə verir
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Results */}
          {currentStep === 5 && result && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl flex justify-center items-center mb-4">
                  <GiBullseye color={colors.primary.blue} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Hesablama tamamlandı!
                </h3>
                <p className="text-gray-600">Seçdiyiniz şəraitə görə nəticə</p>
              </div>

              {/* Main Result */}
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-[#023e8a]">
                  {result.estimatedRange} km
                </div>
                <p className="text-gray-600 text-lg">Təxmini yürüş məsafəsi</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span>Baza məsafəsi: {result.originalRange} km</span>
                  <span>•</span>
                  <span>
                    Dəyişiklik:{" "}
                    {result.estimatedRange != null &&
                    result.originalRange != null
                      ? result.estimatedRange - result.originalRange > 0
                        ? "+"
                        : ""
                      : ""}
                    {result.estimatedRange != null &&
                    result.originalRange != null
                      ? result.estimatedRange - result.originalRange
                      : "-"}{" "}
                    km
                  </span>
                </div>
              </div>

              {/* Factors Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-sm">
                  <Thermometer className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Temperatur</p>
                  <p
                    className={`font-semibold ${
                      result.factors.temperature != null &&
                      result.factors.temperature >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.factors.temperature != null &&
                    result.factors.temperature >= 0
                      ? "+"
                      : ""}
                    {result.factors.temperature != null
                      ? result.factors.temperature
                      : "-"}
                    %
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-sm">
                  <Car className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-gray-600">Sürücülük</p>
                  <p
                    className={`font-semibold ${
                      result.factors.drivingStyle != null &&
                      result.factors.drivingStyle >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.factors.drivingStyle != null &&
                    result.factors.drivingStyle >= 0
                      ? "+"
                      : ""}
                    {result.factors.drivingStyle != null
                      ? result.factors.drivingStyle
                      : "-"}
                    %
                  </p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-sm">
                  <Route className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm text-gray-600">Ərazi</p>
                  <p
                    className={`font-semibold ${
                      result.factors.terrain != null &&
                      result.factors.terrain >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.factors.terrain != null &&
                    result.factors.terrain >= 0
                      ? "+"
                      : ""}
                    {result.factors.terrain != null
                      ? result.factors.terrain
                      : "-"}
                    %
                  </p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-sm">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Kondisioner</p>
                  <p
                    className={`font-semibold ${
                      result.factors.acUsage != null &&
                      result.factors.acUsage >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.factors.acUsage != null &&
                    result.factors.acUsage >= 0
                      ? "+"
                      : ""}
                    {result.factors.acUsage != null
                      ? result.factors.acUsage
                      : "-"}
                    %
                  </p>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-sm">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="text-sm text-gray-600">Sürət</p>
                  <p
                    className={`font-semibold ${
                      result.factors.speed != null && result.factors.speed >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.factors.speed != null && result.factors.speed >= 0
                      ? "+"
                      : ""}
                    {result.factors.speed != null ? result.factors.speed : "-"}%
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="rounded-sm cursor-pointer"
                >
                  Yenidən hesabla
                </Button>
                <Button
                  onClick={handleShare}
                  className="rounded-sm cursor-pointer"
                >
                  Nəticəni paylaş
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          variant="outline"
          className="rounded-sm bg-transparent cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Əvvəlki addım
        </Button>

        <Button
          onClick={handleNextStep}
          disabled={!canProceedToStep(currentStep + 1) && currentStep < 5}
          className="rounded-sm cursor-pointer"
        >
          {currentStep === 5 ? (
            result ? (
              "Hesablama tamamlandı"
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Hesabla
              </>
            )
          ) : (
            <>
              Növbəti addım
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
      {selectedCar && result && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={handleCloseShareModal}
          carBrand={selectedCar.brand}
          carModel={selectedCar.model}
          carUrl={`elektro-az.vercel.app/calculator?car=${selectedCar.id}`}
          page="Range"
          estimatedRange={result.estimatedRange}
          originalRange={result.originalRange}
          batteryLevel={batteryLevel[0]}
          conditions={{
            temperature: temperature[0],
            drivingStyle: getDrivingStyleDisplay(drivingStyle),
            terrain: getTerrainDisplay(terrain),
            acUsage: getAcUsageDisplay(acUsage),
            averageSpeed: averageSpeed[0],
          }}
        />
      )}
    </div>
  );
}
