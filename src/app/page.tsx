"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import SearchFilters from "@/components/home/SearchFilters";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import StatusCounters from "@/components/home/StatusCounters";
import Testimonials from "@/components/home/Testimonials";
import { SearchFilters as SearchFiltersType } from "@/types";

export default function HomePage() {
  const handleFiltersChange = (filters: SearchFiltersType) => {
    // Handle search filters change
    console.log("Filters changed:", filters);
    // In a real app, this would update the courses list based on filters
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search and Filters */}
      <SearchFilters onFiltersChange={handleFiltersChange} />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Statistics Counters */}
      <StatusCounters />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
