import { EVGrid } from "./EVGrid";
import { EVCars } from "@/app/types";
import CompareBar from "../compareBar/CompareBar";

interface Props {
  initialCars: EVCars[];
}

export function EVSearchContainer({ initialCars }: Props) {
  return (
    <div>
      <EVGrid page="Home" cars={initialCars} />

      {/* Compare Bar */}
      <CompareBar />
    </div>
  );
}
