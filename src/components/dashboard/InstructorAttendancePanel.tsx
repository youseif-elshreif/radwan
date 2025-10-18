import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { LectureAttendance, Lecture } from "@/types";
import { FiCheck, FiX, FiStar, FiSave } from "react-icons/fi";

interface InstructorAttendancePanelProps {
  selectedLecture?: Lecture;
  attendances: LectureAttendance[];
  onClose: () => void;
}

interface AttendanceEntry {
  studentId?: string;
  childId?: string;
  studentName: string;
  present: boolean;
  rating: number;
  notes: string;
}

const InstructorAttendancePanel: React.FC<InstructorAttendancePanelProps> = ({
  selectedLecture,
  attendances,
  onClose,
}) => {
  // Mock student data - in real app this would come from enrollments
  const [attendanceEntries, setAttendanceEntries] = useState<AttendanceEntry[]>(
    [
      {
        studentId: "s1",
        studentName: "أحمد محمد",
        present: true,
        rating: 9.0,
        notes: "",
      },
      {
        childId: "c1",
        studentName: "عمر أحمد",
        present: true,
        rating: 8.5,
        notes: "",
      },
      {
        childId: "c2",
        studentName: "ليلى أحمد",
        present: false,
        rating: 0,
        notes: "غياب بعذر",
      },
    ]
  );

  const [saving, setSaving] = useState(false);

  const updateAttendance = (
    index: number,
    field: keyof AttendanceEntry,
    value: any
  ) => {
    setAttendanceEntries((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock save - in real app this would call the API
      console.log("Saving attendance:", {
        lectureId: selectedLecture?.id,
        attendances: attendanceEntries,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error("Failed to save attendance:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!selectedLecture) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-500">اختر محاضرة لتسجيل الحضور</p>
      </Card>
    );
  }

  const presentCount = attendanceEntries.filter(
    (entry) => entry.present
  ).length;
  const absentCount = attendanceEntries.length - presentCount;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">تسجيل الحضور</h3>
          <p className="text-gray-600">
            {selectedLecture.course?.name} - محاضرة رقم{" "}
            {selectedLecture.lecture_number}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(selectedLecture.scheduled_at).toLocaleDateString(
              "ar-SA",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-sm text-gray-600">حاضر</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-sm text-gray-600">غائب</p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الطالب</TableHead>
              <TableHead>الحضور</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>ملاحظات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {entry.studentName}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => updateAttendance(index, "present", true)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        entry.present
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500"
                      }`}
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateAttendance(index, "present", false)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        !entry.present
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      }`}
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FiStar className="w-4 h-4 text-yellow-500" />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={entry.rating}
                      onChange={(e) =>
                        updateAttendance(
                          index,
                          "rating",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      disabled={!entry.present}
                    />
                    <span className="text-sm text-gray-500">/ 10</span>
                  </div>
                </TableCell>

                <TableCell>
                  <input
                    type="text"
                    value={entry.notes}
                    onChange={(e) =>
                      updateAttendance(index, "notes", e.target.value)
                    }
                    placeholder="ملاحظات اختيارية"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button variant="primary" onClick={handleSave} loading={saving}>
            <FiSave className="w-4 h-4 ml-1" />
            حفظ الحضور
          </Button>

          <Button variant="outline" onClick={onClose} disabled={saving}>
            إلغاء
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          آخر حفظ: {new Date().toLocaleTimeString("ar-SA")}
        </div>
      </div>
    </Card>
  );
};

export default InstructorAttendancePanel;
