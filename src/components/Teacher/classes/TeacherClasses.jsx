import React from "react";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
import TeachersPosts from "./TeachersPosts";
import TeacherFiles from "./TeacherFiles";
import TeacherStudents from "./TeacherStudents";
import TeacherAssignments from "./TeacherAssignments";
import { useState } from "react";
import styled from "@emotion/styled";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const TeacherClasses = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Posts", content: <TeachersPosts /> },
    { label: "Files", content: <TeacherFiles /> },
    { label: "Students", content: <TeacherStudents /> },
    { label: "Assignment", content: <TeacherAssignments /> },
  ];
  return (
    <>
      <div className="w-full lg:w-8/12 lg:ps-4 pb-4">
        <div className="bg-white w-full rounded-xl  ">
          <FixedTopContent className="">
            <h3 className="font-poppins font-normal text-lg leading-10 p-3 text-gray-800">
              Class Details
            </h3>
            <div className="center w-full border-gray-300 border-b-[1px] pt-7 pb-5">

            </div>
          </FixedTopContent>
        </div>
      </div>
      <div className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </div>
    </>
  );
};

export default TeacherClasses;
