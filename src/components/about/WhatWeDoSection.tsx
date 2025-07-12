"use client";
import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Calculator } from "lucide-react";
import { IoCarSport } from "react-icons/io5";
import Link from "next/link";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface WhatWeDoSectionProps {
  title?: string;
  subtitle?: string;
  services?: ServiceCard[];
}

const defaultServices: ServiceCard[] = [
  {
    title: "Avtomobil bazası",
    description:
      "Azərbaycanda mövcud olan bütün elektrik və hibrid avtomobillərin ətraflı məlumatları, qiymətləri və spesifikasiyaları.",
    icon: IoCarSport,
    href: "/electric-vehicles",
  },
  {
    title: "Şarj Məntəqələri",
    description:
      "Ölkə üzrə bütün şarj məntəqələrinin xəritəsi, real vaxt məlumatları və istifadə təlimatları.",
    icon: Zap,
    href: "/charger",
  },
  {
    title: "Maliyyə Kalkulyatoru",
    description:
      "Elektromobil sahiblik xərclərini ənənəvi avtomobillərlə müqayisə etmək üçün vasitə.",
    icon: Calculator,
    href: "/cost",
  },
  {
    title: "Yürüş Kalkulyatoru",
    description:
      "Müxtəlif şəraitlərdə elektrik avtomobilinizin yürüş məsafəsini dəqiq hesablayan alət.",
    icon: Calculator,
    href: "/range-calculator",
  },
];

export function WhatWeDoSection({
  title = "Nə Edirik?",
  subtitle = "Elektrik avtomobil sahəsində tam həllərlə istifadəçilərimizə xidmət edirik",
  services = defaultServices,
}: WhatWeDoSectionProps) {
  return (
    <section className="container px-4 pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link key={index} href={service.href}>
            <Card className="rounded-sm p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[220px] flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <service.icon className="h-12 w-12 text-[#023e8a] transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-center leading-relaxed flex-grow">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
