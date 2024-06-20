import { CircularProgress, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGradeCourses } from "../../../services/courses.service";
import {
  assignCourseToGradClass,
  removeCourseFromGradClass,
} from "../../../services/gradClass.service";

const AssignNewCourse = ({ isOpen, onClose, getData, currentCourses }) => {
  console.log("currentCourses", currentCourses);
  const { id } = useParams();
  const gradeClassId = id;
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState("");
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const data = await getGradeCourses();


      const coursesToAdd = data?.courses?.filter((course) => {
        return (
          !course.gradeClass?.gradeClassId
        );
      });

      setCourses(coursesToAdd || []);
    } catch (error) {
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentCourses]);

  const isValidate = () => {
    if (!selectedCourse) {
      setError("Please select a course");
      setTimeout(() => setError(null), 3000);
      return false;
    }
    return true;
  };

  const assignCourse = async () => {
    if (!isValidate()) return;

    setIsLoading(true);
    setError(null);
    try {
      await assignCourseToGradClass(gradeClassId, selectedCourse);
      setSelectedCourse("");
      getData();
    } catch (error) {
      setError("Failed to assign course");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCourse = async (courseId) => {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteCourse(courseId);
    try {
      await removeCourseFromGradClass(gradeClassId, courseId);
      getData();
    } catch (error) {
      setError("Failed to remove course");
      console.error("Failed to remove course:", error);
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsDeleting(false);
      setDeleteCourse("");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white rounded-xl p-5 w-2/3 max-h-[95vh] overflow-auto">
          <div className="center flex-col py-10 gap-2">
            <p className="font-poppins font-light text-xl text-active leading-8">
              Assign course
            </p>
            {error && (
              <p className="text-red-500 text-sm font-poppins">{error}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
            <div className="flex flex-col gap-5 py-2 px-1">
              <div className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Current courses:
                <div className="flex flex-wrap gap-2">
                  {currentCourses.map((course) => (
                    <span
                      key={course._id}
                      value={course._id}
                      className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={() => removeCourse(course._id)}
                    >
                      {isDeleting && deleteCourse === course._id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        course.title
                      )}
                    </span>
                  ))}
                  {currentCourses.length === 0 && (
                    <span className="text-gray-600 text-base font-medium px-4 bg-active-bg rounded-lg p-3">
                      No courses
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 pt-3">
                Select course:
              </p>
              {loadingCourses ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  className="rounded-lg"
                />
              ) : (
                <select
                  className="text-gray-600 text-base font-medium px-4 bg-gray-100 rounded-lg p-3"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="between gap-5 py-2 px-1">
              <button
                className="bg-active text-white rounded-lg py-2 px-4 flex items-center justify-center min-w-20"
                onClick={assignCourse}
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

export default AssignNewCourse;
