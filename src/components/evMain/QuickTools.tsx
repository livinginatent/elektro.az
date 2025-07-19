"use client";
import { Calculator, MapPin } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { QuickTool } from "@/app/types";
import Manat from "@/app/compare/manat";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface QuickToolsProps {
  tools?: QuickTool[];
  title?: string;
}

const defaultTools: QuickTool[] = [
  {
    icon: FaMagnifyingGlass,
    title: "Elektrik vəya hibrid avtomobilinizi tapın",
    description:
      "Sizə ən uyğun elektrik vəya hibrid avtomobili 90 saniyə ərzində tapın",
    buttonText: "Avtomobilinizi tapın",
    href: "/find-car",
  },
  {
    icon: MapPin,
    title: "Elektrik doldurma məntəqələri",
    description:
      "Sizə yaxın olan elektrik doldurma məntəqələrini xəritədən tapın.",
    buttonText: "EDM tapın",
    href: "/charger",
  },
  {
    icon: Calculator,
    title: "Yürüş məsafəsi kalkulyatoru",
    description:
      "Yol vəziyyəti və sürüş vərdişinizə əsasən elektromobilinizin sürüş məsafəsini hesablayın.",
    buttonText: "Məsafəni hesablayın",
    href: "/range-calculator",
  },
  {
    icon: Manat,
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
  const router = useRouter();

  return (
    <section className="mt-6 px-4 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="text-center p-6 hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            <tool.icon className="h-12 w-12 text-custom-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
            <Button
              onClick={() => router.push(tool.href)}
              className="cursor-pointer mt-auto"
              variant="outline"
            >
              {tool.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
