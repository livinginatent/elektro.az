import { FaBolt, FaCar, FaChargingStation, FaLeaf } from "react-icons/fa6";

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Yeni Modellər":
      return FaCar;
    case "İnfrastruktur":
      return FaChargingStation;
    case "Texnologiya":
      return FaBolt;
    case "Davamlılıq":
      return FaLeaf;
    default:
      return FaCar;
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Yeni Modellər":
      return "bg-blue-500";
    case "İnfrastruktur":
      return "bg-green-500";
    case "Müqayisə":
      return "bg-purple-500";
    case "Necə etməli":
      return "bg-orange-500";
    case "Bazar Analizi":
      return "bg-red-500";
    case "Texnologiya":
      return "bg-yellow-500";
    case "Davamlılıq":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};