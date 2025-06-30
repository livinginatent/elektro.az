
import { Calculator } from "lucide-react";
import Header from "../layout/Header";
import EVSearchFilter from "../components/ev/EVSearchFilter";
import EVFeaturedSection from "../components/ev/EVFeaturedSection";
import EVToolsSection from "../components/ev/EVToolsSection";
import Footer from "../layout/Footer";
import { Button } from "@/components/ui/button";

const evCars = [
  {
    id: 1,
    make: "Tesla",
    model: "Model S",
    image: "/placeholder.svg?height=200&width=300",
    price: 94990,
    range: 405,
    batteryCapacity: 100,
    chargingTime: "1.5",
    acceleration: "3.1",
    topSpeed: 200,
    available: true,
  },
  {
    id: 2,
    make: "BMW",
    model: "iX",
    image: "/placeholder.svg?height=200&width=300",
    price: 83200,
    range: 324,
    batteryCapacity: 111.5,
    chargingTime: "2.1",
    acceleration: "4.6",
    topSpeed: 200,
    available: true,
  },
  {
    id: 3,
    make: "Audi",
    model: "e-tron GT",
    image: "/placeholder.svg?height=200&width=300",
    price: 102400,
    range: 238,
    batteryCapacity: 93.4,
    chargingTime: "1.8",
    acceleration: "3.9",
    topSpeed: 245,
    available: false,
  },
  {
    id: 4,
    make: "Mercedes",
    model: "EQS",
    image: "/placeholder.svg?height=200&width=300",
    price: 102310,
    range: 453,
    batteryCapacity: 107.8,
    chargingTime: "2.2",
    acceleration: "4.3",
    topSpeed: 210,
    available: true,
  },
  {
    id: 5,
    make: "Lucid",
    model: "Air Dream",
    image: "/placeholder.svg?height=200&width=300",
    price: 169000,
    range: 516,
    batteryCapacity: 118,
    chargingTime: "1.2",
    acceleration: "2.5",
    topSpeed: 270,
    available: true,
  },
  {
    id: 6,
    make: "Ford",
    model: "Mustang Mach-E",
    image: "/placeholder.svg?height=200&width=300",
    price: 42895,
    range: 314,
    batteryCapacity: 88,
    chargingTime: "2.5",
    acceleration: "4.8",
    topSpeed: 180,
    available: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your Complete
            <span className="text-blue-600"> Electric Vehicle</span>
            <br />
            Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, compare, and find the perfect electric vehicle for your
            needs. Get real-time pricing, calculate range, and stay updated with
            the latest EV news and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8">
              Explore EVs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Range Calculator
            </Button>
          </div>
        </div>
      </section>
      {/* Search and Filter Section */}
      <section className="container px-4 pb-8">
        <EVSearchFilter />
      </section>
      {/* Featured EVs Section */}
      <EVFeaturedSection cars={evCars} />
      {/* Quick Tools Section */}
      <EVToolsSection />
      <Footer />
    </div>
  );
}
