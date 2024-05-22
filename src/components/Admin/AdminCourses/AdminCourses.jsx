import React from "react";
import ThreeDots from "../../../assets/icons/ThreeDots";
import styled from "@emotion/styled";
import { useState } from "react";
import AddNewCourse from "./AddNewCourse";
import { useEffect } from "react";
import { getGradeCourses } from "../../../services/courses.service";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ListContainer = styled("div")({
  maxHeight: "38rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const AdminCourses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getData();
  };
  const onOpen = () => setIsOpen(true);
  const [selectedGrade, setSelectedGrade] = useState(0);

  const navigate = useNavigate();
  const [gradeCourses, setGradeCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGradeCourses();
      if (parseInt(selectedGrade) === 0) {
        setGradeCourses(data.courses);
      } else {
        setGradeCourses(
          data.courses.filter(
            (course) =>
              parseInt(course?.gradeClass?.gradeLevel) ===
              parseInt(selectedGrade)
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade courses: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedGrade]);

  const navigateToCourseDetails = (id) => {
    navigate(`/admin/courses/${id}`);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Courses</h2>
        <select
          name="grades"
          id="grades"
          className="bg-gray-100 rounded-lg p-3 outline-none"
          onChange={handleGradeChange}
          value={selectedGrade}
        >
          <option value={0}>All Grades</option>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <option key={index} value={index + 1}>
                Grade {index + 1}
              </option>
            ))}
        </select>
      </FixedTopContent>
      {!isLoading ? (
        Array.isArray(gradeCourses) && gradeCourses.length > 0 ? (
          gradeCourses.map((courseData, index) => (
            <div
              key={courseData._id}
              className="between py-3 border-2 border-gray-200/60 rounded-md px-6 hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => navigateToCourseDetails(courseData._id)}
            >
              <div className="flex items-center gap-5">
                {index + 1}
                <span className="text-lg font-medium">{courseData.title}</span>
              </div>
              <span className="cursor-pointer">
                <ThreeDots />
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-400">
            No courses available for this grade
          </div>
        )
      ) : (
        <>
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
          <Skeleton variant="rounded" height={50} />
        </>
      )}

      <FixedBottomContent className="bg-white py-5 flex flex-row-reverse">
        <button
          className="bg-active text-white rounded-lg py-3 px-6"
          onClick={onOpen}
        >
          Add Course
        </button>
      </FixedBottomContent>
      <AddNewCourse isOpen={isOpen} onClose={onClose} />
    </ListContainer>
  );
};

export default AdminCourses;
