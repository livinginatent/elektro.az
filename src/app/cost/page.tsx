"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Zap, Car, TrendingDown } from "lucide-react";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import Head from "next/head";

interface CostBreakdown {
  energyCost: number;
  maintenanceCost: number;
  insuranceCost: number;
  totalAnnual: number;
  totalMonthly: number;
}

export default function EVCostCalculator() {
  // Vehicle and usage inputs
  const [vehicleType, setVehicleType] = useState<
    "Tam Elektrik" | "Plug-in Hibrid"
  >("Tam Elektrik");
  const [annualMileage, setAnnualMileage] = useState(15000);
  const [electricityRate, setElectricityRate] = useState(0.084); // per kWh
  const [fuelPrice, setFuelPrice] = useState(1.1); // per liter

  // EV/Hybrid specific inputs
  const [efficiencyCity, setEfficiencyCity] = useState(15); // kWh/100km for EV, L/100km for hybrid fuel
  const [efficiencyHighway, setEfficiencyHighway] = useState(18); // kWh/100km for EV, L/100km for hybrid fuel
  const [fuelConsumption, setFuelConsumption] = useState(6); // L/100km for hybrid
  const [electricDrivingRatio, setElectricDrivingRatio] = useState(70); // % of driving on electric for hybrid

  // ICE car comparison (average values)
  const [iceFuelConsumption] = useState(8.5); // L/100km average

  // Cost calculations
  const [evCosts, setEvCosts] = useState<CostBreakdown>({
    energyCost: 0,
    maintenanceCost: 0,
    insuranceCost: 0,
    totalAnnual: 0,
    totalMonthly: 0,
  });

  const [iceCosts, setIceCosts] = useState<CostBreakdown>({
    energyCost: 0,
    maintenanceCost: 0,
    insuranceCost: 0,
    totalAnnual: 0,
    totalMonthly: 0,
  });

  const calculateCosts = () => {
    // City/Highway split (60% city, 40% highway)
    const cityMileage = annualMileage * 0.6;
    const highwayMileage = annualMileage * 0.4;

    // EV/Hybrid Costs
    let evEnergyCost = 0;

    if (vehicleType === "Tam Elektrik") {
      // Full electric - only electricity costs
      const cityEnergyUsed = (cityMileage / 100) * efficiencyCity;
      const highwayEnergyUsed = (highwayMileage / 100) * efficiencyHighway;
      evEnergyCost = (cityEnergyUsed + highwayEnergyUsed) * electricityRate;
    } else {
      // Plug-in Hybrid - combination of electricity and fuel
      const electricRatio = electricDrivingRatio / 100;
      const fuelRatio = 1 - electricRatio;

      // Electric portion
      const electricMileage = annualMileage * electricRatio;
      const cityElectricMileage = electricMileage * 0.6;
      const highwayElectricMileage = electricMileage * 0.4;
      const electricityUsed =
        (cityElectricMileage / 100) * efficiencyCity +
        (highwayElectricMileage / 100) * efficiencyHighway;
      const electricityCost = electricityUsed * electricityRate;

      // Fuel portion
      const fuelMileage = annualMileage * fuelRatio;
      const fuelUsed = (fuelMileage / 100) * fuelConsumption;
      const fuelCost = fuelUsed * fuelPrice;

      evEnergyCost = electricityCost + fuelCost;
    }

    // EV maintenance is typically 40% less than ICE
    const evMaintenanceCost = 800; // Annual maintenance for EV/Hybrid
    const evInsuranceCost = 75; // Slightly higher insurance for EV

    const evTotalAnnual = evEnergyCost + evMaintenanceCost + evInsuranceCost;

    setEvCosts({
      energyCost: evEnergyCost,
      maintenanceCost: evMaintenanceCost,
      insuranceCost: evInsuranceCost,
      totalAnnual: evTotalAnnual,
      totalMonthly: evTotalAnnual / 12,
    });

    // ICE Car Costs
    const iceFuelUsed = (annualMileage / 100) * iceFuelConsumption;
    const iceFuelCost = iceFuelUsed * fuelPrice;
    const iceMaintenanceCost = 1300; // Higher maintenance for ICE
    const iceInsuranceCost = 100; // Standard insurance

    const iceTotalAnnual = iceFuelCost + iceMaintenanceCost + iceInsuranceCost;

    setIceCosts({
      energyCost: iceFuelCost,
      maintenanceCost: iceMaintenanceCost,
      insuranceCost: iceInsuranceCost,
      totalAnnual: iceTotalAnnual,
      totalMonthly: iceTotalAnnual / 12,
    });
  };

  useEffect(() => {
    calculateCosts();
  }, [
    vehicleType,
    annualMileage,
    electricityRate,
    fuelPrice,
    efficiencyCity,
    efficiencyHighway,
    fuelConsumption,
    electricDrivingRatio,
  ]);

  const savings = iceCosts.totalAnnual - evCosts.totalAnnual;
  const savingsPercentage =
    iceCosts.totalAnnual > 0 ? (savings / iceCosts.totalAnnual) * 100 : 0;

  // SEO meta tags
  const pageTitle =
    "Maliyyə Kalkulyatoru - Elektrik və Hibrid Avtomobil Xərcləri | Procar.az";
  const pageDescription =
    "Elektrik və hibrid avtomobillərin illik və aylıq xərclərini ənənəvi avtomobillərlə müqayisə edin. Enerji, yanacaq, təmir və sığorta xərclərini Procar.az maliyyə kalkulyatoru ilə hesablayın.";
  const canonicalUrl = "https://procar.az/cost";
  const ogImage = "/og-cost.jpg";
  const keywords =
    "maliyyə kalkulyatoru, elektrik avtomobil, hibrid avtomobil, xərclər, müqayisə, enerji xərci, yanacaq xərci, təmir, sığorta, Azərbaycan, procar.az";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Procar.az" />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className=" mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="h-8 w-8 text-custom-blue" />
              <h1 className="text-3xl font-bold text-gray-900">
                Maliyyə Kalkulyatoru
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elektrik və hibrid avtomobillərin idarə etmə xərclərini ənənəvi
              yanacaqlı avtomobillərlə müqayisə edin.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-custom-blue" />
                  Avtomobil & İstifadə Detalları
                </CardTitle>
                <CardDescription>
                  Avtomobil spesifikasiyalarınızı və sürüş vərdişlərinizi daxil
                  edin.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Vehicle Type */}
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Avtomobil növü</Label>
                  <Select
                    value={vehicleType}
                    onValueChange={(value: "Tam Elektrik" | "Plug-in Hibrid") =>
                      setVehicleType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tam Elektrik">Tam Elektrik</SelectItem>
                      <SelectItem value="Plug-in Hibrid">
                        Plug-in Hibrid
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Annual Mileage */}
                <div className="space-y-2">
                  <Label htmlFor="mileage">İllik yürüş (km)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={annualMileage}
                    onChange={(e) => setAnnualMileage(Number(e.target.value))}
                  />
                </div>

                {/* Electricity Rate */}
                <div className="space-y-2">
                  <Label htmlFor="electricity-rate">
                    Elektrik qiyməti ( azn/kWh)
                  </Label>
                  <Input
                    id="electricity-rate"
                    type="number"
                    step="0.01"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Number(e.target.value))}
                  />
                </div>

                {/* Fuel Price */}
                <div className="space-y-2">
                  <Label htmlFor="fuel-price">Yanacaq qiyməti (azn/L)</Label>
                  <Input
                    id="fuel-price"
                    type="number"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                  />
                </div>

                <Separator />

                {/* Vehicle Efficiency */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Avtomobil sərfiyyatı</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="efficiency-city">
                        Şəhər ({vehicleType === "Tam Elektrik" ? "kWh" : "kWh"}
                        /100km)
                      </Label>
                      <Input
                        id="efficiency-city"
                        type="number"
                        step="0.1"
                        value={efficiencyCity}
                        onChange={(e) =>
                          setEfficiencyCity(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="efficiency-highway">
                        Magistral (
                        {vehicleType === "Tam Elektrik" ? "kWh" : "kWh"}
                        /100km)
                      </Label>
                      <Input
                        id="efficiency-highway"
                        type="number"
                        step="0.1"
                        value={efficiencyHighway}
                        onChange={(e) =>
                          setEfficiencyHighway(Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Hybrid-specific inputs */}
                {vehicleType === "Plug-in Hibrid" && (
                  <div className="space-y-4">
                    <Separator />
                    <h3 className="font-semibold">Hibrid Avtomobil</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fuel-consumption">
                          Yanacaq Sərfiyyatı (L/100km)
                        </Label>
                        <Input
                          id="fuel-consumption"
                          type="number"
                          step="0.1"
                          value={fuelConsumption}
                          onChange={(e) =>
                            setFuelConsumption(Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="electric-ratio">
                          Elektrik Sürüş Nisbəti (%)
                        </Label>
                        <Input
                          id="electric-ratio"
                          type="number"
                          min="0"
                          max="100"
                          value={electricDrivingRatio}
                          onChange={(e) =>
                            setElectricDrivingRatio(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={calculateCosts}
                  className="w-full bg-custom-blue hover:bg-[#034ba3] rounded-sm"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Maliyyəti hesabla
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Savings Summary */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    Maliyyət Müqayisə Nəticəsi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-green-600">
                        ₼{savings.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">İllik Qənaət</div>
                    </div>
                    <Badge
                      variant={savings > 0 ? "default" : "destructive"}
                      className="text-lg px-4 py-2 bg-custom-blue"
                    >
                      {savingsPercentage > 0
                        ? ` ${savingsPercentage.toFixed(1)}% Qənaət`
                        : ` ${Math.abs(savingsPercentage).toFixed(
                            1
                          )}% Daha çox`}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      Aylıq Qənaət:{" "}
                      <span className="font-semibold">
                        ₼{(savings / 12).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EV/Hybrid Costs */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-custom-blue" />
                    Sizin {vehicleType} Xərcləriniz
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Enerji Xərci
                      </span>
                      <span className="font-semibold">
                        {evCosts.energyCost.toFixed(0)}₼/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Təmir</span>
                      <span className="font-semibold">
                        {evCosts.maintenanceCost.toFixed(0)} ₼/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sığorta</span>
                      <span className="font-semibold">
                        {evCosts.insuranceCost.toFixed(0)}₼/il
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Ümumi İllik</span>
                      <span>{evCosts.totalAnnual.toFixed(0)}₼</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Aylıq</span>
                      <span>{evCosts.totalMonthly.toFixed(0)}₼</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ICE Car Costs */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-gray-600" />
                    Ortalama Ənənəvi Yanacaqlı Avtomobil Xərcləri{" "}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Yanacaq Xərci
                      </span>
                      <span className="font-semibold">
                        {iceCosts.energyCost.toFixed(0)}₼/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Təmir</span>
                      <span className="font-semibold">
                        {iceCosts.maintenanceCost.toFixed(0)}₼/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sığorta</span>
                      <span className="font-semibold">
                        {iceCosts.insuranceCost.toFixed(0)}₼/il
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Ümumi İllik</span>
                      <span> {iceCosts.totalAnnual.toFixed(0)}₼</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Aylıq</span>
                      <span> {iceCosts.totalMonthly.toFixed(0)}₼</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Hesablama Notları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>
                {" "}
                • Hesablamalar, 60% şəhər sürüşü və 40% avtomobil yolu sürüşü
                əsas götürülərək aparılır.{" "}
              </p>{" "}
              <p>
                {" "}
                • EV (elektrikli avtomobil) xidmət xərcləri adətən DYM (daxili
                yanma mühərriki) avtomobillərindən 40% aşağıdır.{" "}
              </p>{" "}
              <p>
                {" "}
                • Sığorta xərcləri, avtomobilin dəyəri və yerə əsasən dəyişə
                bilər.{" "}
              </p>{" "}
              <p>
                {" "}
                • Hibridlər üçün xərclər, elektriklə sürmə nisbətinizə əsasən
                hesablanır.{" "}
              </p>{" "}
              <p>
                • DYM müqayisəsi 100 km-də 8.5L ortalama yanacaq istehlakı ilə
                istifadə olunur.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
