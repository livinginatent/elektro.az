"use client";

import { Calculator } from "lucide-react";
import { Button } from "../ui/button";
import { colors } from "@/utils/colors";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export function HeroSection({
  title = "Elektrikli və hibrid avtomobillər",
  subtitle = "İstəklərinizə cavab verən elektrik & hibrid avtomobili tapın, müqayisə edin. Real qiymətlər, məsafə kalkulyatoru, və ən son yeniliklər bir yerdə.",
  primaryButtonText = "Avtomobillərə bax",
  secondaryButtonText = "Yürüş məsafəsini hesabla",
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section
      style={{ background: colors.primary.slate }}
      className="  px-4 py-16 md:py-24"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          {title.split("Elektrikli").map((part, index) => (
            <span key={index}>
              {part}
              {index === 0 && (
                <span style={{ color: colors.primary.blue }}>Elektrik</span>
              )}
            </span>
          ))}
        </h1>
        <h2 className="text-xl text-white max-w-3xl mx-auto">{subtitle}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg  px-8 hover:bg-[#023e8a] transition-colors cursor-pointer"
            onClick={() => router.push("/electric-vehicles")}
          >
            {primaryButtonText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-transparent text-white cursor-pointer"
            onClick={() => router.push("/range-calculator")}
          >
            <Calculator className="h-5 w-5 mr-2 " />
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
