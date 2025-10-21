import React from "react";
import { Course } from "@/types";
import { CourseWithDetails } from "@/types/course";
import CourseCard from "@/components/home/CourseCard";

interface CourseListProps {
  courses: CourseWithDetails[];
  onEnrollClick?: (course: CourseWithDetails) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEnrollClick }) => {
  const handleEnrollWrapper = (course: Course | CourseWithDetails) => {
    if (onEnrollClick) {
      onEnrollClick(course as CourseWithDetails);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEnrollClick={handleEnrollWrapper}
        />
      ))}
    </div>
  );
};

export default CourseList;
