import { Battery, Zap, Car, Shield, Ruler } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVCars } from "@/app/types";

interface CarSpecsProps {
  car: EVCars;
}

export function CarSpecs({ car }: CarSpecsProps) {
  const specSections = [
    {
      title: "Performance",
      icon: Zap,
      specs: [
        { label: "Range", value: `${car.range_km} miles`, icon: "🔋" },
        { label: "0-60 mph", value: `${car.acceleration}s`, icon: "⚡" },
        { label: "Top Speed", value: `${car.speed_km} mph`, icon: "🏎️" },
        { label: "Motor Power", value: `${car.engine_power} hp`, icon: "⚙️" },
        { label: "Torque", value: `${car.torque} lb-ft`, icon: "🔧" },
      ],
    },
    {
      title: "Battery & Charging",
      icon: Battery,
      specs: [
        {
          label: "Battery Capacity",
          value: `${car.battery_capacity} kWh`,
          icon: "🔋",
        },
        {
          label: "Charging Time",
          value: `${car.charging_time}h (DC Fast)`,
          icon: "⚡",
        },
        {
          label: "Charging Ports",
          value: car.charging_ports.join(", "),
          icon: "🔌",
        },

        {
          label: "City Efficiency",
          value: `${car.efficiency_city} MPGe`,
          icon: "🏙️",
        },
        {
          label: "Highway Efficiency",
          value: `${car.efficiency_highway} MPGe`,
          icon: "🛣️",
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
