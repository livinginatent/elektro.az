import { Battery, Zap, Car, Shield, Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVCars } from "@/app/types";
import { GiPowerLightning } from "react-icons/gi";
import { IoCarSport } from "react-icons/io5";
import { IoSpeedometer } from "react-icons/io5";
import { PiCityBold } from "react-icons/pi";
import { FaPlugCircleBolt, FaRoad, FaRoadBridge } from "react-icons/fa6";
import { FaCarBattery } from "react-icons/fa6";
import { colors } from "@/utils/colors";
import { RiTimerFlashFill } from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
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
          label: "Maksima sürət",
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
      title: "Vehicle Details",
      icon: Car,
      specs: [
        { label: "Year", value: car.year_model.toString(), icon: "📅" },
        { label: "Body Type", value: car.body_type, icon: "🚗" },
        {
          label: "Seating",
          value: `${car.seating_capacity} seats`,
          icon: "👥",
        },
        { label: "Drivetrain", value: car.battery_type, icon: "⚙️" },
        {
          label: "Curb Weight",
          value: `${car?.dimensions?.curb_weight?.toLocaleString()} kq`,
          icon: "⚖️",
        },
      ],
    },
    {
      title: "Dimensions",
      icon: Ruler,
      /* specs: [
        { label: "Length", value: `${car.dimensions.length}"`, icon: "📏" },
        { label: "Width", value: `${car.dimensions.width}"`, icon: "📐" },
        { label: "Height", value: `${car.dimensions.height}"`, icon: "📊" },
        {
          label: "Wheelbase",
          value: `${car.dimensions.wheelbase}"`,
          icon: "🔄",
        },
      ], */
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
            Safety & Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Safety Rating:</span>
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
