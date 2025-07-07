import { Battery, Zap, Car, Shield, Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { GiPowerLightning, GiWeight } from "react-icons/gi";
import { IoCalendarNumber, IoCarSport } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import { PiCityBold, PiTireBold } from "react-icons/pi";
import { FaCar, FaPlugCircleBolt, FaRoad, FaRoadBridge, FaRulerHorizontal, FaRulerVertical } from "react-icons/fa6";
import { FaCarBattery } from "react-icons/fa6";
import { colors } from "@/utils/colors";
import { RiCustomSize, RiExpandWidthLine, RiTimerFlashFill } from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
interface CarSpecsProps {
  car: EVCars;
}

export function CarSpecs({ car }: CarSpecsProps) {
  const specSections = [
    {
      title: "Performans",
      icon: Zap,
      specs: [
        {
          label: "Yürüş məsafəsi",
          value: `${car.range_km} kilometr`,
          icon: <FaRoadBridge color={colors.primary.blue} />,
        },
        {
          label: "0-100 km/saat",
          value: `${car.acceleration} sn`,
          icon: <IoCarSport color={colors.primary.blue} />,
        },
        {
          label: "Maksimal sürət",
          value: `${car.speed_km} km/saat`,
          icon: <IoSpeedometer color={colors.primary.blue} />,
        },
        {
          label: "Mühərrik gücü",
          value: `${car.engine_power} a.g`,
          icon: <GiPowerLightning color={colors.primary.blue} />,
        },
        {
          label: "Mühərrik tork",
          value: `${car.torque} n/metr`,
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
          value: `${car.battery_capacity} kWh`,
          icon: <FaCarBattery color={colors.primary.blue} />,
        },
        {
          label: "Şarj müddəti",
          value: `${car.charging_time}h (DC Fast)`,
          icon: <RiTimerFlashFill color={colors.primary.blue} />,
        },
        {
          label: "Şarj portları",
          value: car.charging_ports.join(", "),
          icon: <FaPlugCircleBolt color={colors.primary.blue} />,
        },

        {
          label: "Şəhəriçi sərfiyyat",
          value: `${car.efficiency_city} 100`,
          icon: <PiCityBold color={colors.primary.blue} />,
        },
        {
          label: "Magistral sərfiyyatı",
          value: `${car.efficiency_highway} MPGe`,
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
          value: car.year_model.toString(),
          icon: <IoCalendarNumber color={colors.primary.blue} />,
        },
        {
          label: "Ban növü",
          value: car.body_type,
          icon: <FaCar color={colors.primary.blue} />,
        },
        {
          label: "Oturacaq sayı",
          value: `${car.seating_capacity} oturacaq`,
          icon: <MdAirlineSeatReclineNormal color={colors.primary.blue} />,
        },
        {
          label: "Batareya növü",
          value: car.battery_type,
          icon: <FaCarBattery color={colors.primary.blue} />,
        },
        {
          label: "Çəki",
          value: `${car?.dimensions?.curb_weight?.toLocaleString()} kq`,
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
          value: `${car.dimensions.length}`,
          icon: <FaRulerHorizontal color={colors.primary.blue} />,
        },
        {
          label: "En",
          value: `${car.dimensions.width}`,
          icon: <RiExpandWidthLine color={colors.primary.blue} />,
        },
        {
          label: "Hündürlük",
          value: `${car.dimensions.height}`,
          icon: <FaRulerVertical color={colors.primary.blue} />,
        },
        {
          label: "Təkər bazası",
          value: `${car.dimensions.wheelbase}`,
          icon: <PiTireBold color={colors.primary.blue} />,
        },
        {
          label: "Bagaj həcmi",
          value: `${car.dimensions.trunk_size}`,
          icon: <RiCustomSize color={colors.primary.blue} />,
        },
      ],
    },
  ];

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
      <Card className=" rounded-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Təhlükəsizlik & Digər
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Təhlükəsizlik</span>
              {/*  <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < car.safety.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div> */}
              {/*   <span className="font-semibold">{car.safety.rating}/5</span> */}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {/* {car.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))} */}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Safety Features:</h4>
              <div className="flex flex-wrap gap-2">
                {/* {car.safety.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))} */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
