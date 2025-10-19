import React, { useState } from "react";
import Image from "next/image";
import { Child, Enrollment } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  FiUser,
  FiCalendar,
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { utilsApi } from "@/api/utils";

interface ParentChildrenListProps {
  childrenList: Child[];
  enrollments: Enrollment[];
}

const ParentChildrenList: React.FC<ParentChildrenListProps> = ({
  childrenList,
  enrollments,
}) => {
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

  const getChildEnrollments = (childId: string) => {
    return enrollments.filter((enrollment) => enrollment.child_id === childId);
  };

  const toggleChildExpansion = (childId: string) => {
    setExpandedChild(expandedChild === childId ? null : childId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">نشط</Badge>;
      case "inactive":
        return <Badge variant="default">غير نشط</Badge>;
      case "graduated":
        return <Badge variant="primary">خريج</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">أطفالي</h2>
        <Button variant="primary" size="sm">
          <FiUser className="w-4 h-4 ml-1" />
          إضافة طفل جديد
        </Button>
      </div>

      <div className="space-y-4">
        {childrenList.map((child: Child) => {
          const childEnrollments = getChildEnrollments(child.id);
          const isExpanded = expandedChild === child.id;
          const age = utilsApi.calculateAge(child.dob);

          return (
            <Card key={child.id} className="overflow-hidden">
              {/* Child Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleChildExpansion(child.id)}
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Child Avatar */}
                  <div className="flex-shrink-0">
                    {child.photo_url ? (
                      <Image
                        src={child.photo_url}
                        alt={`${child.first_name} ${child.last_name}`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">
                          {child.first_name[0]}
                          {child.last_name[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Child Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {child.first_name} {child.last_name}
                    </h3>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 ml-1" />
                        <span>{age} سنة</span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 ml-1" />
                        <span>رقم الطالب: {child.unique_code}</span>
                      </div>
                      <div className="flex items-center">
                        <FiBookOpen className="w-4 h-4 ml-1" />
                        <span>{childEnrollments.length} دورة</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  {getStatusBadge(child.status || "active")}

                  {isExpanded ? (
                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Child Enrollments - Expanded */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    الدورات المسجل بها
                  </h4>

                  {childEnrollments.length > 0 ? (
                    <div className="space-y-3">
                      {childEnrollments.map((enrollment) => (
                        <div
                          key={enrollment.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Image
                              src={
                                enrollment.course?.thumbnail ||
                                "/default-course.jpg"
                              }
                              alt={enrollment.course?.name || "Course"}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h5 className="font-medium text-gray-900">
                                {enrollment.course?.name}
                              </h5>
                              <p className="text-sm text-gray-600">
                                المدرس:{" "}
                                {
                                  enrollment.course?.instructor?.user
                                    ?.first_name
                                }
                              </p>
                              <p className="text-xs text-gray-500">
                                تاريخ التسجيل:{" "}
                                {new Date(
                                  enrollment.enrolled_at
                                ).toLocaleDateString("ar-SA")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge
                              variant={
                                enrollment.active ? "success" : "default"
                              }
                            >
                              {enrollment.status === "active"
                                ? "نشط"
                                : enrollment.status === "completed"
                                ? "مكتمل"
                                : enrollment.status === "dropped"
                                ? "منسحب"
                                : "معلق"}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">
                              {enrollment.course?.price} ج.م
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiBookOpen className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">
                        {child.first_name} غير مسجل في أي دورة حالياً
                      </p>
                      <Button variant="primary" size="sm">
                        تسجيل في دورة جديدة
                      </Button>
                    </div>
                  )}

                  {/* Child Actions */}
                  <div className="flex items-center space-x-3 space-x-reverse mt-4 pt-4 border-t border-gray-200">
                    <Button variant="primary" size="sm">
                      <FiBookOpen className="w-4 h-4 ml-1" />
                      تسجيل دورة جديدة
                    </Button>
                    <Button variant="outline" size="sm">
                      <FiCalendar className="w-4 h-4 ml-1" />
                      عرض الجدول
                    </Button>
                    <Button variant="outline" size="sm">
                      <FiUser className="w-4 h-4 ml-1" />
                      تعديل البيانات
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {childrenList.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد بيانات أطفال
            </h3>
            <p className="text-gray-500 mb-4">
              ابدأ بإضافة بيانات أطفالك لتتمكن من تسجيلهم في الدورات
            </p>
            <Button variant="primary">
              <FiUser className="w-4 h-4 ml-1" />
              إضافة طفل جديد
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ParentChildrenList;
