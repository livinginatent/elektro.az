"use client";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiChargingPileFill } from "react-icons/ri";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/cars", label: "Avtomobillərə bax" },
    { href: "/charger", label: "Elektrik doldurma məntəqələri" },
    { href: "/blog", label: "Blog və xəbərlər" },
    { href: "/about", label: "Haqqımızda" },
  ];

  const toolsItems = [
    { href: "/find-car", label: "Avtomobilini tap" },
    { href: "/range-calculator", label: "Yürüş məsafəsi kalkulyatoru" },
    { href: "/cost", label: "Maliyyət kalkulyatoru" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className=" flex h-16 items-center justify-between px-4">
        {/* Icon on the left */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
              <RiChargingPileFill className="h-8 w-8 text-custom-blue" />
            </div>
            <span className="text-xl font-bold text-gray-900">Procar</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex items-center space-x-6">
          <Link
            href="/cars"
            className="text-md font-medium text-gray-700 hover:!text-custom-blue transition-colors duration-200"
          >
            Avtomobillərə bax
          </Link>

          {/* Desktop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-md font-medium text-gray-700 hover:!text-custom-blue transition-colors duration-200 cursor-pointer h-auto p-0"
              >
                Alətlər
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent  align="end" className="w-48">
              {toolsItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-md font-medium text-gray-700 hover:!text-custom-blue transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent border-none hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-br from-white to-gray-50 border-l border-gray-200"
            >
              {/* Header */}
              <div className="flex items-center space-x-2 pb-6 border-b border-gray-200">
                <RiChargingPileFill className="h-6 w-6 text-custom-blue" />
                <span className="text-lg font-bold text-gray-900">Procar</span>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-2 mt-8">
                {/* First nav item */}
                <Link
                  href="/cars"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2"
                  style={{
                    animationDelay: "0ms",
                    animation: isOpen
                      ? "slideIn 0.4s ease-out forwards"
                      : "none",
                  }}
                >
                  <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    Avtomobillərə bax
                  </span>
                </Link>

                {/* Mobile Dropdown Section */}
                <div className="pt-2 border-t border-gray-200 mt-4">
                  <h3 className="text-md font-semibold text-gray-500 mb-3 px-4">
                    Alətlər
                  </h3>
                  {toolsItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2"
                      style={{
                        animationDelay: `${(1 + index) * 100}ms`,
                        animation: isOpen
                          ? "slideIn 0.4s ease-out forwards"
                          : "none",
                      }}
                    >
                      <span className="text-lg font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Remaining nav items */}
                {navItems.slice(1).map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2"
                    style={{
                      animationDelay: `${(1 + toolsItems.length + index) * 100}ms`,
                      animation: isOpen
                        ? "slideIn 0.4s ease-out forwards"
                        : "none",
                    }}
                  >
                    <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="p-4 bg-gradient-to-r from-custom-blue/10 to-purple-500/10 rounded-xl border border-custom-blue/20">
                  <p className="text-sm text-gray-600 text-center">
                    Elektrikli nəqliyyat gələcəyimizdir
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
