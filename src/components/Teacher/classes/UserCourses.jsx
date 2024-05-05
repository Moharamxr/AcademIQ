import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../services/user.service";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
import { getCourseByGradeClass } from "../../../services/courses.service";
const ListContainer = styled("div")({
  height: "34.5rem",
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
  const id = localStorage.getItem("userId");
  const gradeClassId = localStorage.getItem("gradeClassId");
  const role = localStorage.getItem("role");
  const getData = async () => {
    try {
      setIsLoading(true);
      if (role === "student") {
        const data = await getCourseByGradeClass(gradeClassId);
        setGradeCourses(data?.courses);
      } else {
        const data = await getUserById(id);
        setGradeCourses(data?.user?.courses);
      }
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

  return (
    <>
      <ListContainer className="w-full lg:w-8/12 flex flex-col px-5 gap-3 bg-white rounded-xl ">
        <FixedTopContent className="between bg-white  py-5">
          <h2 className="text-2xl ">Courses</h2>
        </FixedTopContent>
        {!isLoading ? (
          Array.isArray(gradeCourses) &&
          gradeCourses.map((courseData, index) => (
            <div
              key={index}
              className="between py-3 border-2 border-gray-200/60 rounded-md px-6 hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => navigateToCourseDetails(courseData._id)}
            >
              <div className="flex items-center gap-5">
                {index + 1}.<span className="">{courseData.title}</span>
              </div>
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
      <aside className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default UserCourses;
