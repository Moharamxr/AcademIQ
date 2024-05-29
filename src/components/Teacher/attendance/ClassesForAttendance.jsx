import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreeDots from "../../../assets/icons/ThreeDots";
import { getUserById } from "../../../services/user.service";
import { getGradeClasses } from "../../../services/gradClass.service";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
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

const ClassesForAttendance = () => {
  const navigate = useNavigate();
  const [gradeClasses, setGradeClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = localStorage.getItem("userId");
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGradeClasses();
      setGradeClasses(data?.gradeClasses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade classes: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateAttendance = (id) => {
    navigate(`/attendance/${id}`);
  };

  return (
    <>
      <ListContainer className="w-full xl:w-8/12 flex flex-col px-5 gap-3 bg-white rounded-xl ">
        <FixedTopContent className="between bg-white  py-5">
          <h2 className="text-2xl font-poppins">Classes</h2>
        </FixedTopContent>
        <div className="grid sm:grid-cols-3 grid-cols-2  gap-5 ">

        {!isLoading ? (
          Array.isArray(gradeClasses) &&
          gradeClasses.map((classData, index) => (
            <div
              key={index}
              className="col-span-1 bg-green-100 p-5  py-10 center border-2 border-green-600 rounded-lg  hover:bg-green-200  cursor-pointer text-center text-green-700 "
              onClick={() => navigateAttendance(classData._id)}
            >
           
                <span className="font-poppins font-medium">
                  Class {classData.letter} {classData.level}
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
        </div>
      </ListContainer>
      <aside className="w-full xl:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default ClassesForAttendance;
