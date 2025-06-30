import { Calculator, MapPin, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EVToolsSection() {
  return (
    <section className="container px-4 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        EV Tools & Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
          <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Range Calculator</h3>
          <p className="text-gray-600 mb-4">
            Calculate your EV's range based on driving conditions and habits.
          </p>
          <Button variant="outline">Try Calculator</Button>
        </Card>
        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Charging Stations</h3>
          <p className="text-gray-600 mb-4">
            Find charging stations near you with real-time availability.
          </p>
          <Button variant="outline">Find Stations</Button>
        </Card>
        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
          <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Cost Calculator</h3>
          <p className="text-gray-600 mb-4">
            Compare EV ownership costs vs traditional vehicles.
          </p>
          <Button variant="outline">Calculate Savings</Button>
        </Card>
      </div>
    </section>
  );
}
