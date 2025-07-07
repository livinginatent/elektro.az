import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EVCars } from "@/app/types";

interface CompareState {
  selectedCars: EVCars[];
  addCar: (car: EVCars) => void;
  removeCar: (carId: string | number | null) => void;
  clear: () => void;
  isSelected: (carId: string | number | null) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedCars: [],
      addCar: (car) => {
        set((state) => {
          // Check if car is already selected or limit reached
          if (
            state.selectedCars.length >= 4 ||
            state.selectedCars.some((c) => c.id === car.id)
          ) {
            return { ...state }; // Return a new object to ensure re-render
          }
          return { selectedCars: [...state.selectedCars, car] };
        });
      },
      removeCar: (carId) => {
        set((state) => ({
          selectedCars: state.selectedCars.filter((c) => c.id !== carId),
        }));
      },
      clear: () => set({ selectedCars: [] }),
      isSelected: (carId) => get().selectedCars.some((c) => c.id === carId),
    }),
    {
      name: "compare-cars",
      partialize: (state) => ({ selectedCars: state.selectedCars }),
      storage:
        typeof window !== "undefined"
          ? {
              getItem: (name) => {
                const item = window.sessionStorage.getItem(name);
                return item ? JSON.parse(item) : null;
              },
              setItem: (name, value) =>
                window.sessionStorage.setItem(name, JSON.stringify(value)),
              removeItem: (name) => window.sessionStorage.removeItem(name),
            }
          : undefined,
    }
  )
);
