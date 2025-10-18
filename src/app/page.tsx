"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Activities from "@/components/home/Activities";
import SearchFilters from "@/components/home/SearchFilters";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import CallToAction from "@/components/home/CallToAction";
import Testimonials from "@/components/home/Testimonials";
import StatusCounters from "@/components/home/StatusCounters";
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

      {/* Statistics Counters */}
      <StatusCounters />

      {/* About Section (Why Choose Us?) */}
      <About />

      {/* Activities Section */}
      <Activities />

      {/* Search and Filters */}
      <SearchFilters onFiltersChange={handleFiltersChange} />

      {/* Courses Section */}
      <FeaturedCourses />

      {/* Call To Action Section */}
      <CallToAction />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
