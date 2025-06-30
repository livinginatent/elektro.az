"use client";

import Link from "next/link";
import { Zap, Car, Calculator, Newspaper, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EVHub</span>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/cars"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Car className="h-4 w-4" />
            <span>Browse EVs</span>
          </Link>
          <Link
            href="/calculator"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Calculator className="h-4 w-4" />
            <span>Range Calculator</span>
          </Link>
          <Link
            href="/news"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Newspaper className="h-4 w-4" />
            <span>News</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <BookOpen className="h-4 w-4" />
            <span>Blog</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex bg-transparent">
            Sign In
          </Button>
          <Button className="hidden sm:flex">Get Started</Button>
          {/* Mobile Menu */}
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
                <Link
                  href="/cars"
                  className="flex items-center space-x-2 text-lg font-medium"
                >
                  <Car className="h-5 w-5" />
                  <span>Browse EVs</span>
                </Link>
                <Link
                  href="/calculator"
                  className="flex items-center space-x-2 text-lg font-medium"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Range Calculator</span>
                </Link>
                <Link
                  href="/news"
                  className="flex items-center space-x-2 text-lg font-medium"
                >
                  <Newspaper className="h-5 w-5" />
                  <span>News</span>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center space-x-2 text-lg font-medium"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Blog</span>
                </Link>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
