import React from "react";
import Exams from "./Exams";
import { useState } from "react";
import styled from "@emotion/styled";
import {  useNavigate } from "react-router-dom";
import { createAssessment } from "../../../services/assessment.service";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;
const TeacherExamsContainer = styled("div")({
  height: "32rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const TeacherExams = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Last Exams", content: <Exams /> },
    { label: "Pending Exams", content: <Exams /> },
    { label: "Upcoming Exams", content: <Exams /> },
  ];
  const navigate = useNavigate();

  const handleCreateExam = async() => {
    const requestBody = {
      type: "exam",
    };
    try {
      const data = await createAssessment(requestBody);
      const assessmentData=data?.assessment;
      navigate(`/exams/create/${assessmentData._id}`);
    } catch (error) {
      console.error("Error creating exam: ", error);
    }
  }
  return (
    <div className="w-full bg-white rounded-xl">
      <TeacherExamsContainer className=" bg-white rounded-xl ">
        <FixedTopContent>
          <div className="between p-5 pb-0">
            <h3 className="font-poppins text-2xl font-medium">Exams</h3>
            <select
              name=""
              id=""
              className="p-3 bg-gray-100 rounded-xl outline-none w-36"
            >
              <option value="">Class 1</option>
            </select>
          </div>
          <div className="center gap-14 w-full border-gray-300 border-b-[1px] pt-7 pb-0">
            {tabs.map((tab, index) => (
              <h4
                key={index}
                className={`${
                  activeTab === index
                    ? "border-b-2 border-active  text-active"
                    : "text-gray-400"
                } px-3 font-poppins font-normal text-base leading-7 pb-2  cursor-pointer`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </h4>
            ))}
          </div>
        </FixedTopContent>

        <div className="py-8 center flex-col gap-5 ">
          {tabs[activeTab].content}
        </div>
        <div className=" flex flex-row-reverse pt-12 pe-5">
          <button className=" float-right bg-active text-white p-2 rounded-md px-4 font-poppins " onClick={handleCreateExam}>
            Create Exam
          </button>
        </div>
      </TeacherExamsContainer>
    </div>
  );
};

export default TeacherExams;
