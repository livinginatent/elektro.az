"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import type { EVCars } from "../types";
import { EVGrid } from "@/components/evMain/EVGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { FadeLoader } from "react-spinners";
import { colors } from "@/utils/colors";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import CompareBar from "@/components/compareBar/CompareBar";

// Helper to get unique values for filters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUnique(arr: any[], key: string) {
  return Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean);
}

export default function ElectricVehiclesPage() {
  const [cars, setCars] = useState<EVCars[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const supabase = await createClient();
      const { data: carsRaw } = await supabase.from("EVs").select("*");
      setCars(carsRaw);
      setLoading(false);
    };
    fetchCars();
  }, []);

  // Get filter options only when cars data is available
  const makes = useMemo(() => (cars ? getUnique(cars, "brand") : []), [cars]);
  const bodyStyles = useMemo(
    () => (cars ? getUnique(cars, "body_type") : []),
    [cars]
  );
  const seatCounts = useMemo(
    () => (cars ? getUnique(cars, "seating_capacity") : []),
    [cars]
  );

  if (loading) {
    return (
      <div className=" bg-gray-50">
        <div className=" mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="min-h-screen flex items-center justify-center">
                <FadeLoader color={colors.primary.blue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ElectricVehiclesClient
        cars={cars}
        makes={makes}
        bodyStyles={bodyStyles}
        seatCounts={seatCounts}
      />
    </div>
  );
}

function ElectricVehiclesClient({
  cars,
  makes,
  bodyStyles,
  seatCounts,
}: {
  cars: EVCars[] | null;
  makes: string[];
  bodyStyles: string[];
  seatCounts: number[];
}) {
  const [search, setSearch] = useState("");
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedBodyStyles, setSelectedBodyStyles] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [range, setRange] = useState<[number, number]>([0, 500]);
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Filtering logic
  const filtered = useMemo(() => {
    return cars?.filter((car) => {
      const matchesSearch =
        !search ||
        car?.brand?.toLowerCase().includes(search.toLowerCase()) ||
        car?.model?.toLowerCase().includes(search.toLowerCase());
      const matchesMake =
        selectedMakes.length === 0 || selectedMakes.includes(car?.brand);
      const matchesBody =
        selectedBodyStyles.length === 0 ||
        selectedBodyStyles.includes(car?.body_type);
      const matchesSeats =
        selectedSeats.length === 0 ||
        selectedSeats.includes(car?.seating_capacity);
      const matchesRange =
        !car?.range_km ||
        (car?.range_km >= range[0] && car.range_km <= range[1]);
      const matchesPrice =
        !car.price || (car.price >= price[0] && car.price <= price[1]);

      return (
        matchesSearch &&
        matchesMake &&
        matchesBody &&
        matchesSeats &&
        matchesRange &&
        matchesPrice
      );
    });
  }, [
    cars,
    search,
    selectedMakes,
    selectedBodyStyles,
    selectedSeats,
    range,
    price,
  ]);

  // Pagination
  const totalPages = filtered?.length && Math.ceil(filtered.length / perPage);
  const paginated =
    filtered && filtered.slice((page - 1) * perPage, page * perPage);

  // Handlers
  const handleCheckbox = (
    value: string,
    arr: string[],
    setArr: (a: string[]) => void
  ) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    );
  };

  const handleSeatsCheckbox = (value: number) => {
    setSelectedSeats(
      selectedSeats.includes(value)
        ? selectedSeats.filter((v) => v !== value)
        : [...selectedSeats, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyStyles([]);
    setSelectedSeats([]);
    setRange([0, 2000]);
    setPrice([0, 100000]);
    setSearch("");
    setPage(1);
  };

  const activeFiltersCount =
    selectedMakes.length +
    selectedBodyStyles.length +
    selectedSeats.length +
    (range[0] > 0 || range[1] < 2000 ? 1 : 0) +
    (price[0] > 0 || price[1] < 200000 ? 1 : 0);
  console.log(makes);
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Elektrik və Hibrid Avtomobillər
          </h1>
          <p className="text-gray-600 text-lg">
            Gələcəyin avtomobillərini kəfş edin
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Sidebar */}
          <aside className=" space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filterlər
                  </CardTitle>
                  {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Təmizlə
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Make Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Marka</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {makes.map((make) => (
                      <div key={make} className="flex items-center space-x-2">
                        <Checkbox
                          color="green"
                          id={`make-${make}`}
                          checked={selectedMakes.includes(make)}
                          onCheckedChange={() =>
                            handleCheckbox(
                              make,
                              selectedMakes,
                              setSelectedMakes
                            )
                          }
                        />
                        <Label
                          htmlFor={`make-${make}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {make}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Body Style Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Ban növü</h3>
                  <div className="space-y-2">
                    {bodyStyles.map((body) => (
                      <div key={body} className="flex items-center space-x-2">
                        <Checkbox
                          id={`body-${body}`}
                          checked={selectedBodyStyles.includes(body)}
                          onCheckedChange={() =>
                            handleCheckbox(
                              body,
                              selectedBodyStyles,
                              setSelectedBodyStyles
                            )
                          }
                        />
                        <Label
                          htmlFor={`body-${body}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {body}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Seats Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Oturacaq sayı
                  </h3>
                  <div className="space-y-2">
                    {seatCounts.map((seat) => (
                      <div key={seat} className="flex items-center space-x-2">
                        <Checkbox
                          id={`seat-${seat}`}
                          checked={selectedSeats.includes(seat)}
                          onCheckedChange={() => handleSeatsCheckbox(seat)}
                        />
                        <Label
                          htmlFor={`seat-${seat}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {seat} oturacaq
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Range Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Yürüş məsafəsi (km)
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={range[0]}
                      min={0}
                      max={range[1]}
                      onChange={(e) => setRange([+e.target.value, range[1]])}
                      className="w-20"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      type="number"
                      value={range[1]}
                      min={range[0]}
                      max={2000}
                      onChange={(e) => setRange([range[0], +e.target.value])}
                      className="w-20"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <Separator />

                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Qiymət (₼)
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={price[0]}
                      min={0}
                      max={price[1]}
                      onChange={(e) => setPrice([+e.target.value, price[1]])}
                      className="w-24"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      type="number"
                      value={price[1]}
                      min={price[0]}
                      max={200000}
                      onChange={(e) => setPrice([price[0], +e.target.value])}
                      className="w-24"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
          {/* Main content */}x
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Marka vəya model üzrə axtarış..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filtered?.length || 0} avtomobil tapıldı
              </p>
              {/*  <p className="text-sm text-gray-500">
                {page} Səhifədən {totalPages || 1}
              </p> */}
            </div>

            {/* Cars Grid */}
            <div className="mb-8">
              <EVGrid
                page="Electric Vehicles"
                cars={paginated ? paginated : null}
              />
            </div>

            {/* Pagination */}
            {totalPages && totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Əvvəlki
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className="w-10 h-10 cursor-pointer"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  Sonrakı
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      <CompareBar />
      <Footer />
    </>
  );
}
