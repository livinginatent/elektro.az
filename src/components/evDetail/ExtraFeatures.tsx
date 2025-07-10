import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown, ChevronUp,  LucideIcon } from "lucide-react";
import { EVCars } from "@/app/types";

type Props = {
  mainTitle: string;
  secondaryTitle: string;
  data: string[];
  hasMoreFeatures: boolean;
  setShowAllFeatures: () => void;
  showAllFeatures: boolean;
  car: EVCars;
  Icon: LucideIcon;
};

const ExtraFeatures = ({
  mainTitle,
  secondaryTitle,
  data,
  hasMoreFeatures,
  setShowAllFeatures,
  showAllFeatures,
  car,
  Icon
}: Props) => {
  return (
    <Card className=" rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          {mainTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Exterior Features Section */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">
              {secondaryTitle}
            </h4>
            <div className="space-y-2">
              {data?.map((exterior, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {exterior}
                  </span>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {hasMoreFeatures && (
              <button
                onClick={() => setShowAllFeatures()}
                className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
              >
                {showAllFeatures ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Daha az göstər
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 " />
                    Hamısını göstər ({car.exterior?.length - 3} daha)
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtraFeatures;
