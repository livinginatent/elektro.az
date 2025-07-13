import Link from "next/link";
import { Zap } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  companyName?: string;
  description?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Kəşf et",
    links: [
      { label: "Elektrik & Hibrid Avtomobillər", href: "/cars" },
      { label: "Elektrik Doldurma Məntəqələri", href: "/charge" },
    ],
  },
  {
    title: "Alətlər",
    links: [
      { label: "Yürüş məsafəsi kalkulyatoru", href: "/range-calculator" },
      { label: "Maliyyət kalkulyatoru", href: "/cost" },
    ],
  },
  {
    title: "Oxu",
    links: [
      { label: "Bloq və xəbərlər", href: "/blog" },
      { label: "Haqqımızda", href: "/about" },
    ],
  },
];

export function Footer({
  sections = defaultSections,
  companyName = "Procar",
  description = "Elektrik və hibrid avtomobillərə aid hərşey bu platformada.",
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-gray-400">{description}</p>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {companyName}. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
}
