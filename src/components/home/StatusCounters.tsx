"use client";

import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Stats } from "@/types";
import { statsApi } from "@/api/stats";
import SectionHeader from "../ui/SectionHeader";
import { FaUsers, FaGraduationCap, FaStar } from "react-icons/fa";

const StatusCounters: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await statsApi.getStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
        // Use fallback data if API fails
        setStats({
          students: 500,
          active_courses: 50,
          seasons_completed: 10,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const counterItems = [
    {
      icon: <FaUsers className="w-8 h-8 text-primary" />,
      label: "طالب مسجل",
      value: stats?.students || 0,
      color: "text-primary",
    },
    {
      icon: <FaGraduationCap className="w-8 h-8 text-accent" />,
      label: "كورس نشط",
      value: stats?.active_courses || 0,
      color: "text-accent",
    },
    {
      icon: <FaStar className="w-8 h-8 text-success" />,
      label: "موسم مكتمل",
      value: stats?.seasons_completed || 0,
      color: "text-success",
    },
  ];

  if (loading) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-surface via-surface to-accent/5 overflow-hidden">
      {/* Islamic star pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g fill="none" stroke="%23e47a2e" stroke-opacity="0.15"><polygon points="60,10 70,40 100,40 78,58 88,88 60,70 32,88 42,58 20,40 50,40" stroke-width="1"/><circle cx="60" cy="60" r="25" stroke-opacity="0.1"/></g></svg>\')',
          backgroundSize: "120px 120px",
        }}
      />

      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="إنجازاتنا بالأرقام"
          subtitle="نفخر بما حققناه من نجاحات مع طلابنا عبر السنوات"
          accent={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {counterItems.map((item, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <div
                className={`text-4xl font-bold mb-2 font-arabic ${item.color}`}
              >
                {item.value.toLocaleString("ar")}
              </div>

              <div className="text-text-secondary font-arabic text-lg">
                {item.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatusCounters;
