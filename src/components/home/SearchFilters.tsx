"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { SearchFilters as SearchFiltersType } from "@/types";
import { FaSearch, FaFilter } from "react-icons/fa";

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    season: "",
    category: [],
    ageRange: { min: 5, max: 18 },
    priceRange: { min: 0, max: 1000 },
  });

  const handleFilterChange = (
    key: keyof SearchFiltersType,
    value: string | string[] | { min: number; max: number }
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const seasons = ["الصيف 2025", "الشتاء 2024-2025", "ربيع 2025"];
  const categories = [
    "علوم",
    "رياضيات",
    "لغة عربية",
    "لغة إنجليزية",
    "برمجة",
    "فنون",
  ];

  return (
    <section className="bg-surface py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-text-primary font-arabic mb-6 text-right flex items-center justify-end gap-2">
            <span>ابحث عن الكورس المناسب</span>
            <FaFilter className="text-accent" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary font-arabic mb-2 text-right">
                البحث
              </label>
              <Input placeholder="ابحث عن كورس..." className="w-full" />
            </div>

            {/* Season Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary font-arabic mb-2 text-right">
                الموسم
              </label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg text-right font-arabic bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={filters.season}
                onChange={(e) => handleFilterChange("season", e.target.value)}
                dir="rtl"
              >
                <option value="">كل المواسم</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary font-arabic mb-2 text-right">
                العمر (سنة)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="من"
                  value={filters.ageRange?.min.toString()}
                  onChange={(e) =>
                    handleFilterChange("ageRange", {
                      min: parseInt(e.target.value) || 5,
                      max: filters.ageRange?.max || 18,
                    })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="إلى"
                  value={filters.ageRange?.max.toString()}
                  onChange={(e) =>
                    handleFilterChange("ageRange", {
                      min: filters.ageRange?.min || 5,
                      max: parseInt(e.target.value) || 18,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary font-arabic mb-2 text-right">
                السعر (جنيه)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="من"
                  value={filters.priceRange?.min.toString()}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      min: parseInt(e.target.value) || 0,
                      max: filters.priceRange?.max || 1000,
                    })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="إلى"
                  value={filters.priceRange?.max.toString()}
                  onChange={(e) =>
                    handleFilterChange("priceRange", {
                      min: filters.priceRange?.min || 0,
                      max: parseInt(e.target.value) || 1000,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-text-primary font-arabic mb-3 text-right">
              التخصصات
            </label>
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const newCategories = filters.category?.includes(category)
                      ? filters.category.filter((c) => c !== category)
                      : [...(filters.category || []), category];
                    handleFilterChange("category", newCategories);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-arabic transition-colors ${
                    filters.category?.includes(category)
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="min-w-40 flex items-center gap-2"
            >
              <span>ابحث</span>
              <FaSearch />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
