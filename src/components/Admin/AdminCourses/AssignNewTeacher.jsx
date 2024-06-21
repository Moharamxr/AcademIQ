import { CircularProgress, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../services/user.service";
import { useParams } from "react-router-dom";
import {
  assignTeacherToCourse,
  removeTeacherFromCourse,
} from "../../../services/courses.service";

const AssignNewTeacher = ({
  isOpen,
  onClose,
  getData,
  currentTeachers,
  department,
}) => {
  const { id } = useParams();
  const gradeClassId = id;

  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoadingTeachers(true);
      try {
        const data = await getUsers("teacher");
        
        const teachersToAdd = data?.users.filter((teacher) => {
          return (
            teacher.department === department &&
            !currentTeachers.find((t) => t._id === teacher._id)
          );
        });

        setTeachers(teachersToAdd || []);
        
      } catch (error) {
        setError("Failed to fetch teachers");
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, [department]); 

  const validateSelection = () => {
    if (!selectedTeacher) {
      setError("Please select a teacher");
      setTimeout(() => setError(null), 3000);
      return false;
    }
    return true;
  };

  const handleAssignTeacher = async () => {
    if (!validateSelection()) return;

    setIsLoading(true);
    setError(null);
    try {
      await assignTeacherToCourse(gradeClassId, selectedTeacher);
      setSelectedTeacher(""); 
      getData(); 
      onClose();
    } catch (error) {
      setError("Failed to assign teacher");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteTeacher(teacherId);
    try {
      await removeTeacherFromCourse(gradeClassId, teacherId);
      getData(); 
      setDeleteTeacher("");
    } catch (error) {
      setError("Failed to remove teacher");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-xl p-5 w-2/3 max-h-[95vh] overflow-auto">
        <div className="flex flex-col items-center py-10 gap-2">
          <p className="font-poppins font-light text-xl text-active leading-8">
            Assign Teacher
          </p>
          {error && (
            <p className="text-red-500 text-sm font-poppins">{error}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
          <div className="py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Current Course Teachers:
            </p>
            <div className="flex flex-wrap gap-2">
              {currentTeachers.map((teacher) => (
                <span
                  key={teacher._id}
                  className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={() => handleRemoveTeacher(teacher._id)}
                >
                  {isDeleting && deleteTeacher === teacher._id ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    teacher.email
                  )}
                </span>
              ))}
              {currentTeachers.length === 0 && (
                <span className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3">
                  No Teachers
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Select Teacher:
            </p>
            {loadingTeachers ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                className="rounded-lg"
              />
            ) : (
              <select
                className="text-gray-600 text-base font-medium px-4 bg-gray-100 rounded-lg p-3"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.email}
                  </option>
                ))}
                {teachers.length === 0 && (
                  <option value="" className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3">
                    No Teachers
                  </option>
                )}
              </select>
            )}
          </div>
          <div className="flex justify-between gap-5 py-2 px-1">
            <button
              className="bg-active text-white rounded-lg py-2 px-4 flex items-center justify-center"
              onClick={handleAssignTeacher}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" className="mr-2" />
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
  );
};

export default AssignNewTeacher;
