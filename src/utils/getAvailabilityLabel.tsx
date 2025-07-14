import { Badge } from "@/components/ui/badge";

export const getAvailabilityLabel = (availability: string) => {
  if (availability === "Satışda var") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">Satışda var</Badge>
    );
  } else if (availability === "Satışda yoxdur") {
    return (
      <Badge className="bg-red-500 hover:bg-red-600">Satışda yoxdur</Badge>
    );
  } else {
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600">Sifariş ilə</Badge>
    );
  }
};
