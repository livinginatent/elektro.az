"use client";
import type React from "react";
import { Car, Users, Zap, LucideGoal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { colors } from "@/utils/colors";
import { FaAward } from "react-icons/fa6";
import { WhatWeDoSection } from "./WhatWeDoSection";

interface Statistic {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const statistics: Statistic[] = [
  {
    number: "50+",
    label: "Elektrik və hibrid avtomobil",
    icon: Car,
  },
  {
    number: "186",
    label: "Şarj Məntəqəsi",
    icon: Zap,
  },
  {
    number: "1K+",
    label: "Aktiv İstifadəçi",
    icon: Users,
  },
];

export function AboutUsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className=" md:py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-2xl px-4 py-2">
              Haqqımızda
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-[#023e8a]"> Elektrik </span>
              Nəqliyyatın Gələcəyini Formalaşdırırıq
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold">Procar.az </span> olaraq, Azərbaycanda
              elektrik və hibrid avtomobillərin populyarlaşdırılması və
              əlçatanlığının artırılması üçün çalışırıq. Bizim məqsədimiz hər
              kəsin uyğun elektrik avtomobilini tapa bilməsidir.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-sm p-8 bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <LucideGoal color={colors.primary.blue} size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Missiyamız
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Azərbaycanda elektrik nəqliyyat infrastrukturunun inkişafına
                  töhfə verərək, ətraf mühitin qorunması və davamlı nəqliyyat
                  həllərinin təşviqi. Hər kəsin öz ehtiyaclarına uyğun elektrik
                  & hibrid avtomobilini asanlıqla tapa bilməsi üçün müasir
                  platform təqdim etmək.
                </p>
              </div>
            </Card>

            <Card className="rounded-sm p-8 bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                    <FaAward color={colors.primary.blue} size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Vizyonumuz
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Azərbaycanda elektrik nəqliyyat sahəsində aparıcı platforma
                  olmaq və ölkədə hər 10 avtomobildən birinin elektrik olmasına
                  töhfə vermək. Regionda ən etibarlı və ən geniş elektrik
                  avtomobil məlumat bazasına sahib olmaq.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section className="container px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rəqəmlərlə Procar.az
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platformamızın böyüməsi və istifadəçilərimizin etimadı bizim üçün
              ən böyük motivasiyadır
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <Card
                key={index}
                className="rounded-sm text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <stat.icon className="h-12 w-12 text-[#023e8a] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        {/*  <section className="container px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dəyərlərimiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bizim işimizi istiqamətləndirən və hər gün bizi irəliyə aparan
              əsas prinsiplər
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="rounded-sm p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Team Section */}
        {/*  <section className="container px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Komandamız</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elektrik nəqliyyat sahəsində təcrübəli və həvəsli mütəxəssislərdən
            ibarət komandamız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="rounded-sm bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="aspect-square bg-gray-100">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

        {/* What We Do */}
        <WhatWeDoSection />

        {/* CTA Section */}
       
      </div>
      <Footer />
    </>
  );
}
