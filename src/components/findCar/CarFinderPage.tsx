"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Zap,
  Users,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { EVCars } from "@/app/types";
import { CarFinderResults } from "./CarFinderResults";
import { createClient } from "@/app/utils/supabase/client";
import Manat from "@/app/compare/manat";
import { colors } from "@/utils/colors";
import { IoCarSport, IoSpeedometerOutline } from "react-icons/io5";
import SuvIcon from "./SuvIcon";
import { FaRoad } from "react-icons/fa6";
import { GiBatteryPack } from "react-icons/gi";

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

const steps = [
  { id: 1, title: "Büdcə", icon: Manat },
  { id: 2, title: "İstifadə", icon: Route },
  { id: 3, title: "Növ", icon: IoCarSport },
  { id: 4, title: "Oturacaq", icon: Users },
  { id: 5, title: "Məsafə", icon: FaRoad },
  { id: 6, title: "Şarj", icon: Zap },
  { id: 7, title: "Nəticələr", icon: Search },
];

const bodyTypeOptions = [
  {
    value: "Sedan",
    label: "Sedan",
    icon: "🚗",
    description: "Klassik və rahat",
  },
  {
    value: "SUV",
    label: "SUV",
    icon: <SuvIcon width={64} height={64} />,
    description: "Böyük və güclü",
  },
  {
    value: "Minivan",
    label: "Minivan",
    icon: "🚐",
    description: "Ailə üçün ideal",
  },
  {
    value: "Sport",
    label: "Sport",
    icon: "🏎️",
    description: "Sürətli və dinamik",
  },
];

const usageTypeOptions = [
  {
    value: "city",
    label: "Şəhər içi",
    description: "Əsasən şəhər daxilində istifadə",
  },
  {
    value: "highway",
    label: "Uzun məsafə",
    description: "Tez-tez şəhərlərarası səfər",
  },
  {
    value: "mixed",
    label: "Qarışıq",
    description: "Həm şəhər, həm də uzun məsafə",
  },
];

const chargingOptions = [
  {
    value: "home",
    label: "Evdə şarj",
    description: "Əsasən evdə şarj edəcəyəm",
  },
  {
    value: "public",
    label: "İctimai şarj",
    description: "İctimai şarj məntəqələrindən istifadə",
  },
  {
    value: "workplace",
    label: "İş yerində",
    description: "İş yerində şarj imkanı var",
  },
  {
    value: "mixed",
    label: "Qarışıq",
    description: "Müxtəlif yerlərdə şarj edəcəyəm",
  },
];

const priorityFeatures = [
  { value: "range", label: "Uzun məsafə", icon: <GiBatteryPack /> },
  { value: "speed", label: "Sürət", icon: IoSpeedometerOutline },
  { value: "luxury", label: "Lüks", icon: "✨" },
  { value: "efficiency", label: "Qənaət", icon: "🌱" },
  { value: "technology", label: "Texnologiya", icon: "📱" },
  { value: "safety", label: "Təhlükəsizlik", icon: "🛡️" },
];

export default function CarFinderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: [30000, 100000],
    usageType: "",
    bodyTypes: [],
    seatingCapacity: 5,
    rangeRequirement: 300,
    chargingPreference: "",
    brandPreferences: [],
    priorityFeatures: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [matchedCars, setMatchedCars] = useState<EVCars[]>([]);
  const [cars, setCars] = useState<EVCars[]>([]);
  /*   function getUnique<T, K extends keyof T>(arr: T[], key: K): T[K][] {
    return Array.from(new Set(arr.map((item) => item[key]))).filter(
      Boolean
    ) as T[K][];
  } */
  // Get unique brands from data
  /*   const availableBrands1 = [...new Set(evCarsData.map((car:EVCars) => car.brand))].sort()
   */ useEffect(() => {
    const fetchCars = async () => {
      const supabase = await createClient();
      const { data: carsRaw } = await supabase.from("EVs").select("*");
      setCars(carsRaw || []);
    };
    fetchCars();
  }, []);

  // Get filter options only when cars data is available
  /*   const availableBrands = useMemo(
    () => (cars ? getUnique(cars, "brand") : []),
    [cars]
  ); */
  const updatePreferences = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 2:
        return preferences.usageType !== "";
      case 3:
        return preferences.bodyTypes.length > 0;
      case 5:
        return preferences.rangeRequirement > 0;
      case 6:
        return preferences.chargingPreference !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep === 7) {
      findMatchingCars();
    } else if (canProceedToNextStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const findMatchingCars = () => {
    const filtered = cars.filter((car: EVCars) => {
      // Budget filter
      if (
        car.price &&
        (car.price < preferences.budget[0] || car.price > preferences.budget[1])
      ) {
        return false;
      }

      // Body type filter
      if (
        preferences.bodyTypes.length > 0 &&
        !preferences.bodyTypes.includes(car.body_type)
      ) {
        return false;
      }

      // Seating capacity filter
      if (car.seating_capacity < preferences.seatingCapacity) {
        return false;
      }

      // Range requirement filter
      if (
        car.electric_range &&
        car.electric_range < preferences.rangeRequirement
      ) {
        return false;
      }

      // Brand preference filter (if any selected)
      if (
        preferences.brandPreferences.length > 0 &&
        !preferences.brandPreferences.includes(car.brand)
      ) {
        return false;
      }

      return true;
    });

    // Sort by relevance based on usage type and priority features
    filtered.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Usage type scoring
      if (preferences.usageType === "city") {
        scoreA += a.efficiency_city || 0;
        scoreB += b.efficiency_city || 0;
      } else if (preferences.usageType === "highway") {
        scoreA += a.efficiency_highway || 0;
        scoreB += b.efficiency_highway || 0;
      }

      // Priority features scoring
      preferences.priorityFeatures.forEach((feature) => {
        switch (feature) {
          case "range":
            scoreA += (a.electric_range || 0) / 10;
            scoreB += (b.electric_range || 0) / 10;
            break;
          case "speed":
            scoreA += (a.speed_km || 0) / 10;
            scoreB += (b.speed_km || 0) / 10;
            break;
          case "efficiency":
            scoreA +=
              ((a.efficiency_city || 0) + (a.efficiency_highway || 0)) / 2;
            scoreB +=
              ((b.efficiency_city || 0) + (b.efficiency_highway || 0)) / 2;
            break;
        }
      });

      return scoreB - scoreA;
    });

    setMatchedCars(filtered.slice(0, 20)); // Show top 20 matches
    setShowResults(true);
  };

  const resetFinder = () => {
    setCurrentStep(1);
    setShowResults(false);
    setPreferences({
      budget: [30000, 100000],
      usageType: "",
      bodyTypes: [],
      seatingCapacity: 5,
      rangeRequirement: 300,
      chargingPreference: "",
      brandPreferences: [],
      priorityFeatures: [],
    });
  };

  if (showResults) {
    return (
      <CarFinderResults
        cars={matchedCars}
        preferences={preferences}
        onStartOver={resetFinder}
      />
    );
  }

  const StepIcon = steps[currentStep - 1].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sizə uyğun elektrik vəya hibrid avtomobili tapın!
          </h1>
          <p className="text-gray-600 text-lg">
            Bir neçə sadə sual cavablandıraraq sizə ən uyğun elektrik vəya
            avtomobili tapın
          </p>
        </div>

        {/* Progress Steps - Mobile Optimized */}
        <div className="mb-8">
          {/* Desktop Progress */}
          <div className="hidden md:flex items-center justify-between mb-6">
            {" "}
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.id <= currentStep
                          ? "bg-custom-blue border-custom-blue text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                      }`}
                    >
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <p
                      className={`text-xs mt-2  text-center  ${
                        step.id === currentStep
                          ? "text-custom-blue font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${step.id < currentStep ? "bg-custom-blue" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Addım {currentStep} / {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {steps[currentStep - 1].title}
              </span>
            </div>
            <Progress
              value={(currentStep / steps.length) * 100}
              className="h-2"
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="rounded-sm min-h-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              {StepIcon && <StepIcon className="h-6 w-6 text-custom-blue" />}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Budget */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center justify-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Büdcə aralığınızı seçin
                  </h3>
                  <p className="text-gray-600">
                    Nə qədər xərcləməyi planlaşdırırsınız?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-custom-blue">
                      ₼{preferences.budget[0].toLocaleString()} - ₼
                      {preferences.budget[1].toLocaleString()}
                    </div>
                  </div>

                  <div className="px-4">
                    <Slider
                      color={colors.primary.blue}
                      value={preferences.budget}
                      onValueChange={(value) =>
                        updatePreferences("budget", value as [number, number])
                      }
                      max={200000}
                      min={20000}
                      step={5000}
                      className="w-full e"
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 px-4">
                    <span>₼20,000</span>
                    <span>₼200,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { min: 20000, max: 40000, label: "₼20K-40K" },
                    { min: 40000, max: 70000, label: "₼40K-70K" },
                    { min: 70000, max: 100000, label: "₼70K-100K" },
                    { min: 100000, max: 200000, label: "₼100K+" },
                  ].map((range) => (
                    <Button
                      key={range.label}
                      variant={
                        preferences.budget[0] === range.min &&
                        preferences.budget[1] === range.max
                          ? "default"
                          : "outline"
                      }
                      className="rounded-sm  cursor-pointer"
                      onClick={() =>
                        updatePreferences("budget", [range.min, range.max])
                      }
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Usage Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Avtomobili necə istifadə edəcəksiniz?
                  </h3>
                  <p className="text-gray-600">
                    Bu, uyğun məsafə və səmərəlilik seçiminə kömək edəcək
                  </p>
                </div>

                <RadioGroup
                  value={preferences.usageType}
                  onValueChange={(value) =>
                    updatePreferences("usageType", value)
                  }
                  className="space-y-4"
                >
                  {usageTypeOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-gray-500">
                            {option.description}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Body Type */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Hansı avtomobil növünü üstün tutursunuz?
                  </h3>
                  <p className="text-gray-600">
                    Bir və ya bir neçə seçim edə bilərsiniz
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bodyTypeOptions.map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all rounded-sm ${
                        preferences.bodyTypes.includes(option.value)
                          ? "ring-2 ring-custom-blue bg-blue-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => {
                        const newBodyTypes = preferences.bodyTypes.includes(
                          option.value
                        )
                          ? preferences.bodyTypes.filter(
                              (type) => type !== option.value
                            )
                          : [...preferences.bodyTypes, option.value];
                        updatePreferences("bodyTypes", newBodyTypes);
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        {/* <div className="text-3xl mb-2">{option.icon}</div> */}
                        <h4 className="font-semibold mb-1">{option.label}</h4>
                        <p className="text-sm text-gray-500">
                          {option.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Seating Capacity */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Neçə nəfərlik avtomobil lazımdır?
                  </h3>
                  <p className="text-gray-600">Minimum oturacaq sayını seçin</p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-custom-blue">
                      {preferences.seatingCapacity} nəfər
                    </div>
                  </div>

                  <div className="px-4">
                    <Slider
                      value={[preferences.seatingCapacity]}
                      onValueChange={(value) =>
                        updatePreferences("seatingCapacity", value[0])
                      }
                      max={8}
                      min={2}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 px-4">
                    <span>2 nəfər</span>
                    <span>8+ nəfər</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[2, 4, 5, 7].map((capacity) => (
                    <Button
                      key={capacity}
                      variant={
                        preferences.seatingCapacity === capacity
                          ? "default"
                          : "outline"
                      }
                      className="rounded-sm cursor-pointer"
                      onClick={() =>
                        updatePreferences("seatingCapacity", capacity)
                      }
                    >
                      {capacity} nəfər
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Range Requirement */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Minimum yürüş məsafəsi tələbiniz?
                  </h3>
                  <p className="text-gray-600">
                    Bir dəfə şarj etdikdən sonra nə qədər getməlisiniz?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-custom-blue">
                      {preferences.rangeRequirement} km
                    </div>
                  </div>

                  <div className="px-4">
                    <Slider
                      value={[preferences.rangeRequirement]}
                      onValueChange={(value) =>
                        updatePreferences("rangeRequirement", value[0])
                      }
                      max={600}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 px-4">
                    <span>100 km</span>
                    <span>600+ km</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[200, 300, 400, 500].map((range) => (
                    <Button
                      key={range}
                      variant={
                        preferences.rangeRequirement === range
                          ? "default"
                          : "outline"
                      }
                      className="rounded-sm cursor-pointer"
                      onClick={() =>
                        updatePreferences("rangeRequirement", range)
                      }
                    >
                      {range} km
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Charging Preference */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    Əsasən harada şarj edəcəksiniz?
                  </h3>
                  <p className="text-gray-600">
                    Bu, uyğun şarj sürəti seçiminə kömək edəcək
                  </p>
                </div>

                <RadioGroup
                  value={preferences.chargingPreference}
                  onValueChange={(value) =>
                    updatePreferences("chargingPreference", value)
                  }
                  className="space-y-4"
                >
                  {chargingOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-gray-500">
                            {option.description}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Optional: Brand Preferences */}
                {/*     <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-4">
                    Marka üstünlüyünüz varmı? (İstəyə bağlı)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={preferences.brandPreferences.includes(brand)}
                          onCheckedChange={(checked) => {
                            const newBrands = checked
                              ? [...preferences.brandPreferences, brand]
                              : preferences.brandPreferences.filter(
                                  (b) => b !== brand
                                );
                            updatePreferences("brandPreferences", newBrands);
                          }}
                        />
                        <Label
                          htmlFor={brand}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Priority Features */}
                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-4">
                    Sizin üçün əhəmiyyətli xüsusiyyətlər
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {priorityFeatures.map((feature) => (
                      <Card
                        key={feature.value}
                        className={`cursor-pointer transition-all rounded-sm ${
                          preferences.priorityFeatures.includes(feature.value)
                            ? "ring-2 ring-blue-500 bg-blue-50"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => {
                          const newFeatures =
                            preferences.priorityFeatures.includes(feature.value)
                              ? preferences.priorityFeatures.filter(
                                  (f) => f !== feature.value
                                )
                              : [
                                  ...preferences.priorityFeatures,
                                  feature.value,
                                ];
                          updatePreferences("priorityFeatures", newFeatures);
                        }}
                      >
                        <CardContent className="p-4 text-center">
                          {/* <div className="text-2xl mb-1">{feature.icon}</div> */}
                          <span className="text-sm font-medium">
                            {feature.label}
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Review */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Seçimlərinizi yoxlayın
                  </h3>
                  <p className="text-gray-600">
                    Hər şey düzgündürsə, nəticələri görün
                  </p>
                </div>

                <div className="space-y-4">
                  <Card className="rounded-sm">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Büdcə:
                          </span>
                          <span className="ml-2">
                            ₼{preferences.budget[0].toLocaleString()} - ₼
                            {preferences.budget[1].toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            İstifadə:
                          </span>
                          <span className="ml-2">
                            {
                              usageTypeOptions.find(
                                (o) => o.value === preferences.usageType
                              )?.label
                            }
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Növ:
                          </span>
                          <span className="ml-2">
                            {preferences.bodyTypes.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Oturacaq:
                          </span>
                          <span className="ml-2">
                            {preferences.seatingCapacity} nəfər
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Məsafə:
                          </span>
                          <span className="ml-2">
                            {preferences.rangeRequirement} km
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Şarj:
                          </span>
                          <span className="ml-2">
                            {
                              chargingOptions.find(
                                (o) =>
                                  o.value === preferences.chargingPreference
                              )?.label
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {preferences.brandPreferences.length > 0 && (
                    <Card className="rounded-sm">
                      <CardContent className="p-4">
                        <span className="font-medium text-gray-600">
                          Üstün tutulan markalar:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {preferences.brandPreferences.map((brand) => (
                            <Badge key={brand} variant="secondary">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {preferences.priorityFeatures.length > 0 && (
                    <Card className="rounded-sm">
                      <CardContent className="p-4">
                        <span className="font-medium text-gray-600">
                          Prioritet xüsusiyyətlər:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {preferences.priorityFeatures.map((feature) => (
                            <Badge key={feature} variant="outline">
                              {
                                priorityFeatures.find(
                                  (f) => f.value === feature
                                )?.label
                              }
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 1}
            variant="outline"
            className="rounded-sm cursor-pointer cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Əvvəlki
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              !canProceedToNextStep() &&
              currentStep !== 1 &&
              currentStep !== 4 &&
              currentStep !== 7
            }
            className="rounded-sm cursor-pointer"
          >
            {currentStep === 7 ? (
              <>
                <Search className="h-4 w-4 mr-2" />
                Nəticələri Gör
              </>
            ) : (
              <>
                Növbəti
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
