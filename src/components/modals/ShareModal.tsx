/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Share2, Copy, Check, Calculator, Car, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BsWhatsapp } from "react-icons/bs";
import { SiTelegram } from "react-icons/si";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  carBrand?: string | null;
  carModel?: string | null;
  carPrice?: number | null;
  carUrl: string;
  page?: "Car" | "Range" | "Blog";
  // Range calculator specific props
  estimatedRange?: number | null;
  originalRange?: number | null;
  batteryLevel?: number;
  conditions?: {
    temperature: number;
    drivingStyle: string;
    terrain: string;
    acUsage: string;
    averageSpeed: number;
  };
  //Blog specific props
  blogTitle?: string;
  blogExcerpt?: string;
  blogAuthor?: string;
  blogDate?: string;
  blogCategories?: string[];
}

export function ShareModal({
  isOpen,
  onClose,
  carBrand,
  carModel,
  carPrice,
  carUrl,
  page = "Car",
  estimatedRange,
  originalRange,
  batteryLevel,
  conditions,
  blogTitle,
  blogExcerpt,
  blogAuthor,
  blogDate,
  blogCategories,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // Generate different share text based on page type
  const getShareText = () => {
    if (
      page === "Range" &&
      estimatedRange &&
      originalRange &&
      batteryLevel &&
      conditions
    ) {
      const rangeDifference = estimatedRange - originalRange;
      const rangeDifferenceText =
        rangeDifference > 0 ? `+${rangeDifference}` : `${rangeDifference}`;

      return `🔋 ${carBrand} ${carModel} - Yürüş Məsafəsi Hesablaması

📊 Nəticə: ${estimatedRange} km (${batteryLevel}% batareya)
📈 Baza məsafəsi: ${originalRange} km
📉 Dəyişiklik: ${rangeDifferenceText} km
🌡️ Temperatur: ${conditions.temperature}°C
🚗 Sürücülük: ${conditions.drivingStyle}
🛣️ Ərazi: ${conditions.terrain}
❄️ Kondisioner: ${conditions.acUsage}
⚡ Orta sürət: ${conditions.averageSpeed} km/s

Elektrik avtomobillərin real yürüş məsafəsini öyrənin! 🚗⚡`;
    } else if (page === "Blog" && blogTitle) {
      const categoriesText = blogCategories?.length
        ? `\n🏷️ Kateqoriya: ${blogCategories.join(", ")}`
        : "";

      return `📖 ${blogTitle}

${blogExcerpt || "Elektrik və hibrid avtomobillər haqqında maraqlı məlumat"}${categoriesText}

${blogAuthor ? `✍️ Müəllif: ${blogAuthor}` : ""}${blogDate ? `\n📅 ${blogDate}` : ""}

Procar.az-da daha çox faydalı məlumat üçün! 🚗⚡`;
    } else {
      return `${carBrand} ${carModel}${
        carPrice ? ` - ₼${carPrice} qiymətində` : ""
      } möhtəşəm elektrik avtomobili! 🚗⚡`;
    }
  };

  const shareText = getShareText();
  const shareUrl = carUrl;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <BsWhatsapp />,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${shareText}\n\n${shareUrl}`
      )}`,
    },
    {
      name: "Telegram",
      icon: <SiTelegram />,
      color: "bg-[#24A1DE] hover:bg-blue-600",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Facebook",
      icon: <FaSquareFacebook />,
      color: "bg-[#1877F2] hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitterSquare />,
      color: "bg-[#1DA1F2] hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyResults = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getModalTitle = () => {
    switch (page) {
      case "Range":
        return "Hesablama nəticəsini paylaş";
      case "Blog":
        return "Blog yazısını paylaş";
      default:
        return "Avtomobili paylaş";
    }
  };

  const getModalIcon = () => {
    switch (page) {
      case "Range":
        return <Calculator className="h-5 w-5 text-blue-600" />;
      case "Blog":
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      default:
        return <Car className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Content Info */}
          <Card className="bg-blue-50 border-blue-200 rounded-sm">
            <CardContent className="p-4">
              {page === "Range" ? (
                // Range Calculator Results
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <p className="font-semibold text-lg text-gray-900">
                      Yürüş Məsafəsi Hesablaması
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="font-semibold text-xl text-gray-900">
                      {carBrand} {carModel}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {estimatedRange} km
                        </p>
                        <p className="text-xs text-gray-600">Təxmini məsafə</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-blue-600">
                          {batteryLevel}%
                        </p>
                        <p className="text-xs text-gray-600">Batareya</p>
                      </div>
                    </div>
                  </div>

                  {conditions && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white rounded px-2 py-1">
                        <span className="text-gray-600">Temperatur:</span>
                        <span className="font-medium ml-1">
                          {conditions.temperature}°C
                        </span>
                      </div>
                      <div className="bg-white rounded px-2 py-1">
                        <span className="text-gray-600">Sürət:</span>
                        <span className="font-medium ml-1">
                          {conditions.averageSpeed} km/s
                        </span>
                      </div>
                      <div className="bg-white rounded px-2 py-1">
                        <span className="text-gray-600">Tərz:</span>
                        <span className="font-medium ml-1 capitalize">
                          {conditions.drivingStyle}
                        </span>
                      </div>
                      <div className="bg-white rounded px-2 py-1">
                        <span className="text-gray-600">Ərazi:</span>
                        <span className="font-medium ml-1 capitalize">
                          {conditions.terrain}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : page === "Blog" ? (
                // Blog Details
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <p className="font-semibold text-lg text-gray-900">
                      Blog Yazısı
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="font-semibold text-lg text-gray-900 mb-2">
                      {blogTitle}
                    </p>
                    {blogExcerpt && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {blogExcerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      {blogAuthor && (
                        <div className="flex items-center gap-1">
                          <span>✍️</span>
                          <span>{blogAuthor}</span>
                        </div>
                      )}
                      {blogDate && (
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{blogDate}</span>
                        </div>
                      )}
                    </div>

                    {blogCategories && blogCategories.length > 0 && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <span className="text-xs text-gray-500">🏷️</span>
                        <div className="flex flex-wrap gap-1">
                          {blogCategories.map((category, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white px-2 py-1 rounded text-gray-700"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Car Details
                <div className="flex items-center justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="h-5 w-5 text-blue-600" />
                      <p className="font-semibold text-xl text-gray-900">
                        {carBrand} {carModel}
                      </p>
                    </div>
                    {carPrice && (
                      <p className="font-semibold text-custom-blue text-xl">
                        ₼{carPrice}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share Options */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Paylaşım seçimləri:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className={`${option.color} text-white rounded-sm h-12 flex items-center justify-start gap-3 px-4 cursor-pointer`}
                  variant="default"
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Copy Options */}
          <div className="space-y-3">
            {/* Copy Results Text (for Range Calculator and Blog) */}
            {(page === "Range" || page === "Blog") && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {page === "Range" ? "Nəticəni kopyala:" : "Məzmunu kopyala:"}
                </p>
                <Button
                  onClick={handleCopyResults}
                  variant="outline"
                  className={`w-full rounded-sm cursor-pointer ${
                    copied ? "bg-green-50 border-green-200" : "bg-transparent"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-600">
                        {page === "Range"
                          ? "Nəticə kopyalandı"
                          : "Məzmun kopyalandı"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      {page === "Range"
                        ? "Hesablama nəticəsini kopyala"
                        : "Blog məzmununu kopyala"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full rounded-sm bg-transparent cursor-pointer"
          >
            Bağla
          </Button>

          {/* Additional Info */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              {page === "Range"
                ? "Hesablama nəticənizi dostlarınızla paylaşın və elektrik avtomobillərin real performansını göstərin!"
                : page === "Blog"
                  ? "Bu faydalı məlumatı dostlarınızla paylaşın və elektrik avtomobillərin dünyasını kəşf edin!"
                  : "Bu avtomobili dostlarınızla paylaşın və onlara da elektrik/hibrid avtomobillərin üstünlüklərini göstərin!"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
