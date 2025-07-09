"use client";
import { useCompareStore } from "@/lib/compareStore";
import React from "react";

const CompareBar = () => {
  const { selectedCars, removeCar, clear } = useCompareStore();
  return (
    <div>
      {" "}
      {selectedCars.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t z-50 flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
          <div className="flex flex-1 gap-2 overflow-x-auto">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center bg-blue-200 rounded px-2 py-1 mr-2"
              >
                <span className="font-semibold text-sm mr-2">
                  {car.brand} {car.model}
                </span>
                <button
                  onClick={() => removeCar(car.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`px-6 py-2 rounded bg-[#023e8a] cursor-pointer text-white font-bold transition-all ${
                selectedCars.length > 1
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={selectedCars.length <= 1}
              onClick={() => {
                if (selectedCars.length > 1) window.location.href = "/compare";
              }}
            >
              Müqayisə et ({selectedCars.length})
            </button>
            <button
              onClick={clear}
              className="ml-4 px-6 rounded bg-[#caf0f8] py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Hamısını sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareBar;
