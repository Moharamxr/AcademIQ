import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { getGradeCourses } from "../../../services/courses.service";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreeDots from "../../../assets/icons/ThreeDots";
const ListContainer = styled("div")({
  height: "38rem",
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

const UserCourses = () => {
  const navigate = useNavigate();
  const [gradeCourses, setGradeCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGradeCourses();
        setGradeCourses(data.courses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade courses: ", error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  const navigateToCourseDetails = (id) => {
    navigate(`details/${id}`);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };
  return (
    <ListContainer className="w-full flex flex-col px-5 gap-3 bg-white rounded-xl ">
      <FixedTopContent className="between bg-white  py-5">
        <h2 className="text-2xl ">Courses</h2>
        
      </FixedTopContent>
      {!isLoading ? (
        Array.isArray(gradeCourses) &&
        gradeCourses.map((courseData, index) => (
          <div
            key={courseData._id}
            className="between py-3 border-2 border-gray-200/60 rounded-md px-6 hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => navigateToCourseDetails(courseData._id)}
          >
            <div className="flex items-center gap-5">
              <span className="text-lg font-medium">
                {index + 1} {courseData.title}
              </span>
            </div>
            <span className="cursor-pointer">
              <ThreeDots />
            </span>
          </div>
        ))
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

      
    </ListContainer>
  );
};

export default UserCourses;
