"use client";

import Link from "next/link";
import { Car, Calculator, Menu,  Newspaper, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiChargingPileFill } from "react-icons/ri";

export function Header() {
  const navItems = [
    { href: "/electric-vehicles", icon: Car, label: "Avtomobillərə bax" },
    {
      href: "/charger",
      icon: Calculator,
      label: "Şarj məntəqələri",
    },
    { href: "/blog", icon: Newspaper, label: "Blog və xəbərlər" },
    { href: "/about", icon: BookOpen, label: "Haqqımızda" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className=" flex h-16 items-center justify-between px-4">
        {/* Icon on the left */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
              <RiChargingPileFill className="h-8 w-8 text-[#023e8a]" />
            </div>
            <span className="text-xl font-bold text-gray-900">Procar</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-1 text-md font-medium text-gray-700 hover:!text-[#023e8a]"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-lg font-medium"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
