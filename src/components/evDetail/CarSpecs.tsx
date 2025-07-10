import {
  Battery,
  Zap,
  Car,
  Ruler,
  Shield,
  GalleryHorizontalEnd,
  
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { GiPowerLightning, GiWeight } from "react-icons/gi";
import { IoCalendarNumber, IoCarSport } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import { PiCityBold, PiTireBold } from "react-icons/pi";
import {
  FaCar,
  FaPlugCircleBolt,
  FaRoad,
  FaRoadBridge,
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

  const specSections = [
    {
      title: "Performans",
      icon: Zap,
      specs: [
        {
          label: "Yürüş məsafəsi",
          value: formatValue(car.range_km, " kilometr"),
          icon: <FaRoadBridge color={colors.primary.blue} />,
        },
        {
          label: "0-100 km/saat",
          value: formatValue(car.acceleration, " sn"),
          icon: <IoCarSport color={colors.primary.blue} />,
        },
        {
          label: "Maksimal sürət",
          value: formatValue(car.speed_km, " km/saat"),
          icon: <IoSpeedometer color={colors.primary.blue} />,
        },
        {
          label: "Mühərrik gücü",
          value: formatValue(car.engine.engine_power, " a.g"),
          icon: <GiPowerLightning color={colors.primary.blue} />,
        },
        {
          label: "Mühərrik tork",
          value: formatValue(car.torque, " n/metr"),
          icon: <BsGearFill color={colors.primary.blue} />,
        },
      ],
    },
    {
      title: "Batareya & Şarj",
      icon: Battery,
      specs: [
        {
          label: "Batareya tutumu",
          value: formatValue(car.battery_capacity, " kWh"),
          icon: <FaCarBattery color={colors.primary.blue} />,
        },
        {
          label: "Şarj müddəti",
          value: formatValue(car.charging_time, "h (DC Fast)"),
          icon: <RiTimerFlashFill color={colors.primary.blue} />,
        },
        {
          label: "Şarj portları",
          value:
            car.charging_ports && car.charging_ports.length > 0
              ? car.charging_ports.join(", ")
              : "Mövcud deyil",
          icon: <FaPlugCircleBolt color={colors.primary.blue} />,
        },
        {
          label: "Şəhəriçi sərfiyyat",
          value: formatValue(car.efficiency_city, " 100"),
          icon: <PiCityBold color={colors.primary.blue} />,
        },
        {
          label: "Magistral sərfiyyatı",
          value: formatValue(car.efficiency_highway, " MPGe"),
          icon: <FaRoad color={colors.primary.blue} />,
        },
      ],
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
          value: car.dimensions?.length || "Mövcud deyil",
          icon: <FaRulerHorizontal color={colors.primary.blue} />,
        },
        {
          label: "En",
          value: car.dimensions?.width || "Mövcud deyil",
          icon: <RiExpandWidthLine color={colors.primary.blue} />,
        },
        {
          label: "Hündürlük",
          value: car.dimensions?.height || "Mövcud deyil",
          icon: <FaRulerVertical color={colors.primary.blue} />,
        },
        {
          label: "Təkər bazası",
          value: car.dimensions?.wheelbase || "Mövcud deyil",
          icon: <PiTireBold color={colors.primary.blue} />,
        },
        {
          label: "Bagaj həcmi",
          value: car.dimensions?.trunk_size || "Mövcud deyil",
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
                  <div
                    key={specIndex}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600 flex items-center gap-2">
                      <span>{spec.icon}</span>
                      {spec.label}
                    </span>
                    <span className="font-semibold">{spec.value}</span>
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
      />
    </div>
  );
}
