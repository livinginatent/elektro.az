import {
  Battery,
  Zap,
  Car,
  Ruler,
  Shield,
  GalleryHorizontalEnd,
  ScreenShare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { GiCarWheel, GiPowerLightning, GiWeight } from "react-icons/gi";
import { IoCalendarNumber } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import {
  PiCityBold,
  PiCylinderBold,
  PiEngineBold,
  PiTireBold,
} from "react-icons/pi";
import {
  FaCar,
  FaPlugCircleBolt,
  FaRoad,
  FaRulerHorizontal,
  FaRulerVertical,
} from "react-icons/fa6";
import { FaCarBattery } from "react-icons/fa6";
import { colors } from "@/utils/colors";
import {
  RiCustomSize,
  RiExpandWidthLine,
  RiTimerFlashFill,
} from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useState } from "react";
import ExtraFeatures from "./ExtraFeatures";

interface CarSpecsProps {
  car: EVCars;
}

export function CarSpecs({ car }: CarSpecsProps) {
  const [showAllSafety, setShowAllSafety] = useState(false);
  const [showAllExterior, setShowAllExterior] = useState(false);
  const [showAllInterior, setShowAllInterior] = useState(false);

  // Helper function to handle null/undefined values
  const formatValue = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    unit: string = "",
    fallback: string = "Mövcud deyil"
  ) => {
    if (value === null || value === undefined || value === "" || value === 0) {
      return fallback;
    }
    return `${value}${unit}`;
  };
  // Define specs for Performans section based on engine type
  const performanceSpecsElectric = [
    // Example: You can edit these specs for electric cars
    {
      label: "Mühərrik",
      value: formatValue(car.engine.engine_type),
      icon: <PiEngineBold color={colors.primary.blue} />,
    },
    {
      label: "Maksimal sürət",
      value: formatValue(car.speed_km, " km/saat"),
      icon: <IoSpeedometer color={colors.primary.blue} />,
    },
    {
      label: "Güc",
      value: formatValue(car.engine.engine_power, " a.g"),
      icon: <GiPowerLightning color={colors.primary.blue} />,
    },
    {
      label: "Tork",
      value: formatValue(car.torque, " n/metr"),
      icon: <BsGearFill color={colors.primary.blue} />,
    },
    {
      label: "Ötürücü",
      value: formatValue(car.drivetrain, ""),
      icon: <GiCarWheel color={colors.primary.blue} />,
    },
    // Add more or change as needed
  ];

  const performanceSpecsNonElectric = [
    // Example: You can edit these specs for non-electric cars
    {
      label: "Mühərrik həcmi",
      value: formatValue(
        car.engine.engine_displacement,
        ` litr (${car.engine.engine_type})`
      ),
      icon: <PiEngineBold color={colors.primary.blue} />,
    },
    {
      label: "Mühərrik gücü",
      value: formatValue(car.engine.engine_power, " a.g"),
      icon: <GiPowerLightning color={colors.primary.blue} />,
    },
    {
      label: "Elektrik mühərrik gücü",
      value: formatValue(car.engine.electric_power, " a.g"),
      icon: <PiCylinderBold color={colors.primary.blue} />,
    },
    {
      label: "Maksimal sürət",
      value: formatValue(car.speed_km, " km/saat"),
      icon: <IoSpeedometer color={colors.primary.blue} />,
    },
    {
      label: "Ümumi tork (elektrik + mühərrik)",
      value: formatValue(car.torque, " n/metr"),
      icon: <BsGearFill color={colors.primary.blue} />,
    },
    // Add more or change as needed
  ];
  const hybridBatterySection = [
    {
      label: "Batareya tutumu",
      value: formatValue(car.battery_capacity, " kWh"),
      icon: <FaCarBattery color={colors.primary.blue} />,
    },
    {
      label: "Batareya növü",
      value: car.battery_type ? car.battery_type : "Mövcud deyil",
      icon: <FaPlugCircleBolt color={colors.primary.blue} />,
    },
    {
      label: "DC (sürətli) Şarj müddəti",
      value: formatValue(car.dc_charging_time, " saat"),
      icon: <RiTimerFlashFill color={colors.primary.blue} />,
    },
    {
      label: "Elektrik yürüş məsafəsi",
      value: formatValue(car.electric_range, " km"),
      icon: <PiCityBold color={colors.primary.blue} />,
    },
    {
      label: "WLTC Sərfiyyat (elektrik + yanacaq)",
      value: formatValue(car.wltc_consumption, " L/100Km"),
      icon: <FaRoad color={colors.primary.blue} />,
    },
  ];
  const electricBatterySection = [
    {
      label: "Batareya tutumu",
      value: formatValue(car.battery_capacity, " kWh"),
      icon: <FaCarBattery color={colors.primary.blue} />,
    },
    {
      label: "Batareya növü",
      value: car.battery_type ? car.battery_type : "Mövcud deyil",
      icon: <FaPlugCircleBolt color={colors.primary.blue} />,
    },
    {
      label: "DC (sürətli) Şarj müddəti",
      value: formatValue(car.dc_charging_time, " saat"),
      icon: <RiTimerFlashFill color={colors.primary.blue} />,
    },
    {
      label: "Yürüş məsafəsi",
      value: formatValue(car.electric_range, " km"),
      icon: <PiCityBold color={colors.primary.blue} />,
    },
    {
      label: "Elektrik sərfiyyatı",
      value: formatValue(car.electricity_consumption, " Wh/100Km"),
      icon: <FaRoad color={colors.primary.blue} />,
    },
  ];
  const specSections = [
    {
      title: "Performans",
      icon: Zap,
      specs:
        car.engine.engine_type === "Tam Elektrik"
          ? performanceSpecsElectric
          : performanceSpecsNonElectric,
    },
    {
      title: "Batareya & Şarj",
      icon: Battery,
      specs:
        car.engine.engine_type === "Tam Elektrik"
          ? electricBatterySection
          : hybridBatterySection,
    },
    {
      title: "Avtomobil haqqında",
      icon: Car,
      specs: [
        {
          label: "Buraxılış ili",
          value: car.year_model ? car.year_model.toString() : "Mövcud deyil",
          icon: <IoCalendarNumber color={colors.primary.blue} />,
        },
        {
          label: "Ban növü",
          value: car.body_type || "Mövcud deyil",
          icon: <FaCar color={colors.primary.blue} />,
        },
        {
          label: "Oturacaq sayı",
          value: formatValue(car.seating_capacity, " oturacaq"),
          icon: <MdAirlineSeatReclineNormal color={colors.primary.blue} />,
        },
        {
          label: "Batareya növü",
          value: car.battery_type || "Mövcud deyil",
          icon: <FaCarBattery color={colors.primary.blue} />,
        },
        {
          label: "Çəki",
          value: car?.dimensions?.curb_weight
            ? `${car.dimensions.curb_weight.toLocaleString()} kq`
            : "Mövcud deyil",
          icon: <GiWeight color={colors.primary.blue} />,
        },
      ],
    },
    {
      title: "Parametrlər",
      icon: Ruler,
      specs: [
        {
          label: "Uzunluq",
          value: formatValue(car.dimensions?.length, " mm") || "Mövcud deyil",
          icon: <FaRulerHorizontal color={colors.primary.blue} />,
        },
        {
          label: "En",
          value: formatValue(car.dimensions?.width, " mm") || "Mövcud deyil",
          icon: <RiExpandWidthLine color={colors.primary.blue} />,
        },
        {
          label: "Hündürlük",
          value: formatValue(car.dimensions?.height, " mm") || "Mövcud deyil",
          icon: <FaRulerVertical color={colors.primary.blue} />,
        },
        {
          label: "Təkər bazası",
          value:
            formatValue(car.dimensions?.wheelbase, " mm") || "Mövcud deyil",
          icon: <PiTireBold color={colors.primary.blue} />,
        },
        {
          label: "Bagaj həcmi",
          value:
            formatValue(car.dimensions?.trunk_size, " litr") || "Mövcud deyil",
          icon: <RiCustomSize color={colors.primary.blue} />,
        },
      ],
    },
  ];

  // Display logic for safety features
  const visibleSafetyFeatures = showAllSafety
    ? car.safety
    : car.safety?.slice(0, 3);
  const hasMoreSafetyFeatures = car.safety && car.safety.length > 3;
  const visibleExteriorFeatures = showAllExterior
    ? car.exterior
    : car.exterior?.slice(0, 3);
  const hasMoreExteriorFeatures = car.exterior && car.exterior.length > 3;
  const visibleInteriorFeatures = showAllInterior
    ? car.interior
    : car.interior?.slice(0, 3);
  const hasMoreInteriorFeatures = car.interior && car.interior.length > 3;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specSections.map((section, index) => (
          <Card className=" rounded-sm" key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-blue-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.specs?.map((spec, specIndex) => (
                  <div key={specIndex} className="space-y-1">
                    {/* Mobile: Stacked layout */}
                    <div className="sm:hidden">
                      <div className="flex items-center gap-2 text-gray-600 text-sm ">
                        <span className="flex-shrink-0">{spec.icon}</span>
                        <span className="break-words">{spec.label}</span>
                      </div>
                      <div className="font-semibold text-sm ml-6 break-words">
                        {spec.value}
                      </div>
                    </div>

                    {/* Desktop: Side-by-side layout with improved handling */}
                    <div className="hidden sm:flex sm:justify-between sm:items-start sm:gap-3">
                      <span className="text-gray-600 flex items-center gap-2 flex-shrink-0 min-w-0">
                        <span className="flex-shrink-0">{spec.icon}</span>
                        <span className="break-words text-sm lg:text-base">
                          {spec.label}
                        </span>
                      </span>
                      <span className="font-semibold text-right text-sm lg:text-base break-words max-w-[50%]">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Rating */}

      <ExtraFeatures
        mainTitle="Təhlükəsizlik və digər"
        secondaryTitle="Təhlükəsizlik xüsusiyyətləri"
        data={visibleSafetyFeatures}
        hasMoreFeatures={hasMoreSafetyFeatures}
        setShowAllFeatures={() => setShowAllSafety(!showAllSafety)}
        car={car}
        showAllFeatures={showAllSafety}
        Icon={Shield}
        section="safety"
      />
      <ExtraFeatures
        mainTitle="Eksteryer"
        secondaryTitle="Eksteryer"
        data={visibleExteriorFeatures}
        hasMoreFeatures={hasMoreExteriorFeatures}
        setShowAllFeatures={() => setShowAllExterior(!showAllExterior)}
        car={car}
        showAllFeatures={showAllExterior}
        Icon={GalleryHorizontalEnd}
        section="exterior"
      />
      <ExtraFeatures
        mainTitle="İnteryer"
        secondaryTitle="İnteryer"
        data={visibleInteriorFeatures}
        hasMoreFeatures={hasMoreInteriorFeatures}
        setShowAllFeatures={() => setShowAllInterior(!showAllInterior)}
        car={car}
        showAllFeatures={showAllExterior}
        Icon={ScreenShare}
        section="interior"
      />
    </div>
  );
}
