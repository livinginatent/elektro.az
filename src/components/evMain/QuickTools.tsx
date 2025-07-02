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
    title: "Yürüş məsafəsi kalkulyatoru",
    description:
      "Yol vəziyyəti və sürüş vərdişinizə əsasən elektromobilinizin sürüş məsafəsini hesablayın.",
    buttonText: "Kalkulyatoru yoxlayın",
    href: "/calculator",
  },
  {
    icon: MapPin,
    title: "Elektrik doldurma məntəqələri",
    description:
      "Sizə yaxın olan elektrik doldurma məntəqələrini xəritədən tapın.",
    buttonText: "EDM tapın",
    href: "/charging",
  },
  {
    icon: DollarSign,
    title: "Maliyyət kalkulyatoru",
    description:
      "Elektromobil sahiblik xərclərini ənənəvi avtomobillərlə müqayisə edin.",
    buttonText: "Qənaətinizi hesablayın",
    href: "/cost",
  },
];

export function QuickTools({
  tools = defaultTools,
  title = "Elektrikli avtomobil alətləri & Resurslar",
}: QuickToolsProps) {
  return (
    <section className="mt-6 px-4 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="text-center p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <tool.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
            <Button className="cursor-pointer mt-auto" variant="outline">
              {tool.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
