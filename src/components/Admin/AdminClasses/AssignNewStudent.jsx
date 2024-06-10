import { CircularProgress, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  assignStudentToGradClass,
  removeStudentFromGradClass,
} from "../../../services/gradClass.service";
import { getUsers } from "../../../services/user.service";
import { useParams } from "react-router-dom";

const AssignNewStudent = ({ isOpen, onClose, getData, currentStudents }) => {
  const { id } = useParams();
  const gradeClassId = id;
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState("");
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await getUsers("student");
      setStudents(data?.users.filter((s) => !s.gradeClassId));
    } catch (error) {
      setError("Failed to fetch students");
    }
    setLoadingStudents(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [currentStudents]);

  const isValidate = () => {
    if (!selectedStudent) {
      setError("Please select a student");
      setTimeout(() => {
        setError(null);
      }, 3000);

      return false;


    }   return true;
    };


  const assignStudent = async () => {
    const isValid = isValidate();
    if (!isValid) return;

    setIsLoading(true);
    setError(null);
    try {
      await assignStudentToGradClass(gradeClassId, selectedStudent);
      getData();
    } catch (error) {
      console.error("Failed to assign student:", error);
      setError("Failed to assign student");
    } finally {
      setIsLoading(false);
    }
  };

  const removeStudent = async (studentId) => {
    if (isDeleting) return;
    setIsDeleting(true);
    setDeleteStudent(studentId);
    try {
      await removeStudentFromGradClass(gradeClassId, studentId);
      getData();
      setDeleteStudent("");
    } catch (error) {
      setError("Failed to remove student");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white rounded-xl p-5 w-2/3 max-h-[95vh] overflow-auto">
          <div className="center flex-col py-10 gap-2">
            <p className="font-poppins font-light text-xl text-active leading-8">
              Assign Student
            </p>
            {error && (
              <p className="text-red-500 text-sm font-poppins">{error}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
            <div className="flex flex-col gap-5 py-2 px-1">
              <div className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Current Students:
                <div className="flex flex-wrap gap-2">
                  {currentStudents.map((student) => (
                    <span
                      key={student._id}
                      value={student._id}
                      className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={() => removeStudent(student._id)}
                    >
                      {isDeleting && deleteStudent === student._id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        student.email
                      )}
                    </span>
                  ))}
                  {currentStudents.length === 0 && (
                    <span className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3">
                      No Students
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Select Student:
              </p>
              {loadingStudents ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  className="rounded-lg"
                />
              ) : (
                <select
                  className="text-gray-600 text-base font-medium px-4 bg-gray-100 rounded-lg p-3"
                  value={selectedStudent?._id}
                  onChange={(e) =>
                    setSelectedStudent(
                      students.find((s) => s._id === e.target.value)?._id
                    )
                  }
                >
                  <option value="" >
                    Select Student
                  </option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.email}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="between gap-5 py-2 px-1">
              <button
                className="bg-active text-white rounded-lg py-2 px-4 flex items-center justify-center"
                onClick={assignStudent}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress
                    size={16}
                    color="inherit"
                    className="mr-2"
                  />
                ) : (
                  "Assign"
                )}
              </button>
              <button
                className="bg-white border-2 border-active-br text-active py-2 px-4 rounded-lg"
                onClick={onClose}
                disabled={isLoading || isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AssignNewStudent;
