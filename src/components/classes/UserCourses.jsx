import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TimeTable from "../Layout/timeTables/TimeTable";
import { getCourseByGradeClass } from "../../services/courses.service";
import { getUserById } from "../../services/user.service";
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
        if (!gradeClassId) return;
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
        <div className="grid sm:grid-cols-3 grid-cols-2  gap-5 ">
          {!isLoading ? (
            Array.isArray(gradeCourses) &&
            gradeCourses.map((courseData, index) => (
              <div
                key={index}
                className="col-span-1 bg-active-bg p-5  py-10 center border-2 border-active-br rounded-lg  hover:bg-active  cursor-pointer text-center text-active hover:text-white"
                onClick={() => navigateToCourseDetails(courseData._id)}
              >
                <span className="font-poppins font-semibold ">
                  {courseData.title}
                </span>
              </div>
            ))
          ) : (
            <>
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
              <Skeleton variant="rounded" height={120} />
            </>
          )}
        </div>
      </ListContainer>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <TimeTable />
      </aside>
    </>
  );
};

export default UserCourses;
