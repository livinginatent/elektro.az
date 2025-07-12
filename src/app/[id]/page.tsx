"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { EVCars } from "../types";
import { createClient } from "../utils/supabase/client";
import { CarDetailPage } from "@/components/evDetail/CarDetailPage";
import { FadeLoader } from "react-spinners";
import { colors } from "@/utils/colors";

// CarPageProps definition with params as a promise
interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default function CarPage(props: CarPageProps) {
  const params = use(props.params);
  const router = useRouter();
  const [car, setCar] = useState<EVCars | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  // Unwrap the params using React.use() when they are resolved
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };

    unwrapParams();
  }, [params]);
  useEffect(() => {
    const fetchCar = async () => {
      if (unwrappedParams) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("EVs")
          .select("*")
          .eq("id", unwrappedParams.id)
          .single();

        if (error || !data) {
          setCar(undefined);
        } else {
          setCar(data);
        }

        setLoading(false);
      }
    };

    if (unwrappedParams) {
      fetchCar();
    }
  }, [unwrappedParams]);

  const handleBack = () => {
    router.back();
  };

  const handleCalculateRange = () => {
    if (car) router.push(`/calculator?car=${car.id}`);
  };

  const handleFindCharging = () => {
    if (car) router.push(`/charging?car=${car.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FadeLoader color={colors.primary.blue} />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Car Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The car you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <CarDetailPage
      car={car}
      onBack={handleBack}
      onCalculateRange={handleCalculateRange}
      onFindCharging={handleFindCharging}
    />
  );
}
