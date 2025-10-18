import React, { useState } from "react";
import { CourseFilters } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

export interface SortOption {
  value: string;
  label: string;
}

export interface ExtendedFilters extends CourseFilters {
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  level?: string;
}

interface FilterBarProps {
  onFiltersChange: (filters: ExtendedFilters) => void;
  categories: string[];
  isLoading?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFiltersChange,
  categories,
  isLoading = false,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: SortOption[] = [
    { value: "name_asc", label: "الاسم (أ - ي)" },
    { value: "name_desc", label: "الاسم (ي - أ)" },
    { value: "price_asc", label: "السعر (الأقل أولاً)" },
    { value: "price_desc", label: "السعر (الأعلى أولاً)" },
    { value: "date_desc", label: "الأحدث" },
    { value: "date_asc", label: "الأقدم" },
    { value: "rating_desc", label: "الأعلى تقييماً" },
  ];

  const levels = ["مبتدئ", "متوسط", "متقدم", "جميع المستويات"];

  const updateFilters = () => {
    const filters: ExtendedFilters = {};

    if (search) filters.search = search;
    if (selectedCategory) filters.category = [selectedCategory];
    if (selectedLevel) filters.level = selectedLevel;
    if (sortBy) filters.sortBy = sortBy;
    if (priceRange.min) filters.minPrice = Number(priceRange.min);
    if (priceRange.max) filters.maxPrice = Number(priceRange.max);

    onFiltersChange(filters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setTimeout(() => updateFilters(), 300); // Debounce search
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters();
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    updateFilters();
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateFilters();
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
    setTimeout(() => updateFilters(), 500); // Debounce price changes
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedLevel("");
    setSortBy("");
    setPriceRange({ min: "", max: "" });
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      {/* Islamic decorative header */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <FiFilter className="text-primary" />
            </div>
            <h3 className="font-semibold text-primary">فلترة وترتيب الدورات</h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <FiChevronDown
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Search Input */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن الدورات..."
              value={search}
              onChange={handleSearchChange}
              className="pr-10"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-4 flex-wrap">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right min-w-[140px]"
            >
              <option value="">جميع التخصصات</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right min-w-[120px]"
            >
              <option value="">جميع المستويات</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right min-w-[140px]"
            >
              <option value="">ترتيب حسب</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="من"
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="إلى"
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right text-sm"
              />
              <span className="text-xs text-gray-500">ج.م</span>
            </div>

            {(search ||
              selectedCategory ||
              selectedLevel ||
              sortBy ||
              priceRange.min ||
              priceRange.max) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent/80"
                disabled={isLoading}
              >
                مسح الفلاتر
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden px-6 pb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التخصص
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                >
                  <option value="">جميع التخصصات</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المستوى
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => handleLevelChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                >
                  <option value="">جميع المستويات</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ترتيب حسب
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
              >
                <option value="">ترتيب حسب</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نطاق السعر (ج.م)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="من"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="إلى"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
                />
              </div>
            </div>

            {(search ||
              selectedCategory ||
              selectedLevel ||
              sortBy ||
              priceRange.min ||
              priceRange.max) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="w-full mt-4"
                disabled={isLoading}
              >
                مسح جميع الفلاتر
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
