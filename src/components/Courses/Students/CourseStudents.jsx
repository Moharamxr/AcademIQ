import React, { useEffect, useState } from "react";
import { getGradeClassStudents } from "../../../services/gradClass.service";
import { Skeleton } from "@mui/material";
const CourseStudents = ({ gradeClassId }) => {
  const [courseStudents, setCourseStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCourseData = async () => {
    if (gradeClassId === "") return;
    try {
      setIsLoading(true);
      const data = await getGradeClassStudents(gradeClassId, false);
      setCourseStudents(data?.students);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching course data: ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <div className="flex flex-col px-5 gap-3">
      {!isLoading &&
        courseStudents.map((student, index) => (
          <div className="flex items-center gap-5" key={index}>
            <span className="text-lg font-medium">{index + 1}</span>
            {student?.profilePicture?.url ? (
              <img
                src={student?.profilePicture?.url}
                className="w-14 h-14 rounded-full cursor-pointer"
              />
            ) : (
              <div
                className="w-14 h-14 bg-active text-white text-2xl rounded-full center select-none cursor-pointer"
                style={{ backgroundColor: student?.profilePicture?.color }}
              >
                {student?.name?.first.charAt(0).toUpperCase() +
                  student?.name?.last.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="font-poppins font-medium">{student?.email}</p>
          </div>
        ))}

      {isLoading && (
        <div className="flex items-center gap-5">
          <span className="text-lg font-medium text-transparent">{1}</span>

          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="text" width={300} height={30} />
        </div>
      )}
    </div>
  );
};

export default CourseStudents;
