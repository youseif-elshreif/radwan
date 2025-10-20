import React from "react";
import { CourseWithDetails } from "@/types/course";
import CourseCard from "@/components/home/CourseCard";

interface CourseListProps {
  courses: CourseWithDetails[];
  onEnrollClick?: (course: CourseWithDetails) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEnrollClick }) => {
  const handleEnroll = (courseId: string) => {
    const course = courses.find((c) => c.id.toString() === courseId);
    if (course && onEnrollClick) {
      onEnrollClick(course);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
      ))}
    </div>
  );
};

export default CourseList;
