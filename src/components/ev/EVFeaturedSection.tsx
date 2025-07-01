import { Button } from "@/app/components/ui/button";
import { EVCarCard } from "./EVCard";
import { EVCar } from "@/app/types";

export default function EVFeaturedSection({ cars }: { cars: EVCar[] }) {
  return (
    <section className="container px-4 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Electric Vehicles
        </h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <EVCarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
