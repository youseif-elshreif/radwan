import React, { useState } from "react";
import { CourseFilters } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FiSearch, FiFilter } from "react-icons/fi";

interface FilterBarProps {
  onFiltersChange: (filters: CourseFilters) => void;
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
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFiltersChange({
      search: value || undefined,
      category: selectedCategory || undefined,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFiltersChange({
      search: search || undefined,
      category: category || undefined,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
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

        {/* Filter Toggle Button */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full"
        >
          <FiFilter className="ml-2" />
          الفلاتر
        </Button>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          >
            <option value="">جميع التخصصات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(search || selectedCategory) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-sm"
              disabled={isLoading}
            >
              مسح الفلاتر
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-4">
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

            {(search || selectedCategory) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="w-full"
                disabled={isLoading}
              >
                مسح الفلاتر
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
