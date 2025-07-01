import { Calculator, MapPin, DollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { QuickTool } from "@/app/types";

interface QuickToolsProps {
  tools?: QuickTool[];
  title?: string;
}

const defaultTools: QuickTool[] = [
  {
    icon: Calculator,
    title: "Range Calculator",
    description:
      "Calculate your EV's range based on driving conditions and habits.",
    buttonText: "Try Calculator",
    href: "/calculator",
  },
  {
    icon: MapPin,
    title: "Charging Stations",
    description: "Find charging stations near you with real-time availability.",
    buttonText: "Find Stations",
    href: "/charging",
  },
  {
    icon: DollarSign,
    title: "Cost Calculator",
    description: "Compare EV ownership costs vs traditional vehicles.",
    buttonText: "Calculate Savings",
    href: "/cost",
  },
];

export function QuickTools({
  tools = defaultTools,
  title = "EV Tools & Resources",
}: QuickToolsProps) {
  return (
    <section className="container px-4 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="text-center p-8 hover:shadow-lg transition-shadow"
          >
            <tool.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <Button variant="outline">{tool.buttonText}</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
