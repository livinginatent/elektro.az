"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { EVCars } from "../types";
import { createClient } from "../utils/supabase/client";
import { CarDetailPage } from "@/components/evDetail/CarDetailPage";
import { FadeLoader } from "react-spinners";
import { colors } from "@/utils/colors";
import Head from "next/head";

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

  // SEO meta tags
  const pageTitle = car
    ? `${car.brand || "Elektrik Avtomobil"} ${car.model || ""} - Qiymət, Xüsusiyyətlər və Texniki Məlumatlar | Procar.az`
    : "Elektrik Avtomobil Detalları - Procar.az";
  const pageDescription = car
    ? `${car.brand || "Elektrik avtomobil"} ${car.model || ""} haqqında ətraflı məlumat, texniki göstəricilər, qiymət, yürüş məsafəsi və digər xüsusiyyətlər. Azərbaycanda elektrik və hibrid avtomobillər üçün ən yaxşı platforma - Procar.az.`
    : "Azərbaycanda elektrik və hibrid avtomobillər haqqında ətraflı məlumat, texniki göstəricilər və qiymətlər. Elektrik avtomobil platforması - Procar.az.";
  const canonicalUrl = car
    ? `https://procar.az/${car.id}`
    : "https://procar.az";
  const ogImage =
    car && car.mainImage && typeof car.mainImage === "string"
      ? car.mainImage
      : "/og-car.jpg";

  if (loading) {
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="Procar.az" />
          <meta
            name="keywords"
            content="elektrik avtomobil,  texniki göstəricilər, qiymət, yürüş məsafəsi, Azərbaycan, hibrid avtomobil, procar.az"
          />
          <meta name="robots" content="index, follow" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <FadeLoader color={colors.primary.blue} />
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Head>
          <title>Avtomobil Tapılmadı - Procar.az</title>
          <meta
            name="description"
            content="Axtardığınız elektrik avtomobili tapılmadı. Azərbaycanda elektrik və hibrid avtomobillər haqqında ən son məlumatlar Procar.az-da."
          />
          <link rel="canonical" href="https://procar.az" />
          <meta name="robots" content="noindex, follow" />
        </Head>
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
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Procar.az" />
        <meta
          name="keywords"
          content={`elektrik avtomobil, ${car.brand}, ${car.model}, texniki göstəricilər, qiymət, yürüş məsafəsi, Azərbaycan, hibrid avtomobil, procar.az`}
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <CarDetailPage
        car={car}
        onBack={handleBack}
        onCalculateRange={handleCalculateRange}
        onFindCharging={handleFindCharging}
      />
    </>
  );
}
