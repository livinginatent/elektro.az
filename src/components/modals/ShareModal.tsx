"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
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
  carBrand: string | null;
  carModel: string | null;
  carPrice: number | null;
  carUrl: string;
}

export function ShareModal({
  isOpen,
  onClose,
  carBrand,
  carModel,
  carPrice,
  carUrl,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${carBrand} ${carModel} - ₼${carPrice} qiymətində möhtəşəm elektrik avtomobili! 🚗⚡`;
  const shareUrl =
    /* typeof window !== "undefined" ? window.location.href : */ carUrl;

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

/*   const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${carBrand} ${carModel}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  }; */

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            Avtomobili paylaş
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Car Info */}
          <Card className="bg-blue-50 border-blue-200 rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-semibold text-xl text-gray-900">
                    {carBrand} {carModel}
                  </p>
                  <p className="font-semibold text-[#023e8a] text-xl">
                    ₼{carPrice}
                  </p>
                </div>
              </div>
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

          {/* Native Share (Mobile) */}

          {/* Copy Link */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Və ya linki kopyala:
            </p>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 text-sm bg-gray-50 rounded-sm"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className={`px-3 rounded-sm cursor-pointer ${
                  copied ? "bg-green-50 border-green-200" : "bg-transparent"
                }`}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-green-600">
                Link kopyalandı
              </p>
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
              Bu avtomobili dostlarınızla paylaşın və onlara da elektrik/hibrid
              avtomobillərin üstünlüklərini göstərin!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
