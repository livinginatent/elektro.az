import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EVSearchFilter() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search by make, model, or features..."
            className="pl-10 h-12 text-lg"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-50k">Under $50k</SelectItem>
              <SelectItem value="50k-100k">$50k - $100k</SelectItem>
              <SelectItem value="over-100k">Over $100k</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-300">Under 300 miles</SelectItem>
              <SelectItem value="300-400">300-400 miles</SelectItem>
              <SelectItem value="over-400">Over 400 miles</SelectItem>
            </SelectContent>
          </Select>
          <Button size="lg" variant="outline">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
