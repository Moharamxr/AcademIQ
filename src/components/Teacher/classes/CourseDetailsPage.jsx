import React from "react";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
import CoursePosts from "./Posts/CoursePosts";
import CourseFiles from "./Files/CourseFiles";
import CourseStudents from "./Students/CourseStudents";
import CourseAssignments from "./Assignments/CourseAssignments";
import { useState } from "react";
import styled from "@emotion/styled";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const TeacherClassesContainer = styled("div")({
  height: "35.8rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const CourseDetailsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Posts", content: <CoursePosts /> },
    { label: "Files", content: <CourseFiles /> },
    { label: "Students", content: <CourseStudents /> },
    { label: "Assignment", content: <CourseAssignments /> },
  ];
  
  return (
    <>
      <div className="w-full lg:w-8/12 ">
        <TeacherClassesContainer className="bg-white w-full rounded-xl  ">
          <FixedTopContent className="bg-white">
            <h2 className="font-poppins font-medium text-2xl leading-10 p-3 text-gray-800">
              Class Details
            </h2>
            <div className="center gap-14 w-full border-gray-300 border-b-[1px] pt-7 pb-0">
              {tabs.map((tab, index) => (
                <h4
                  key={index}
                  className={`${
                    activeTab === index
                      ? "border-b-2 border-active text-active"
                      : "text-gray-400"
                  } font-poppins font-normal text-base leading-7 pb-2  cursor-pointer`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </h4>
              ))}
            </div>
          </FixedTopContent>
          <div className="pt-7 ">{tabs[activeTab].content}</div>
        </TeacherClassesContainer>
      </div>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default CourseDetailsPage;
