import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">EVHub</span>
            </div>
            <p className="text-gray-400">
              Your complete electric vehicle platform for the future of
              transportation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/cars" className="hover:text-white">
                  Browse EVs
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/calculator" className="hover:text-white">
                  Range Calculator
                </Link>
              </li>
              <li>
                <Link href="/charging" className="hover:text-white">
                  Charging Stations
                </Link>
              </li>
              <li>
                <Link href="/cost" className="hover:text-white">
                  Cost Calculator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/news" className="hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EVHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
