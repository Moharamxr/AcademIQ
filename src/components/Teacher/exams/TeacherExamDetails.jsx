import styled from "@emotion/styled";
import React from "react";
import ExamDetailCard from "./ExamDetailCard";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`;

const TeacherExamsContainer = styled.main`
  height: 35.8rem;
  width: 100%;
  background-color: white;
  border-radius: 0.75rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const TeacherExamDetails = () => {
  return (
    <TeacherExamsContainer>
      <FixedTopContent className="bg-white w-full rounded-xl p-5 pb-0">
        <h2 className="font-poppins text-2xl font-medium">Unit 1 Exam </h2>
        <div className="between w-5/6 py-4">
          <p className="text-active font-poppins">
            Subject <span className="text-gray-600">English</span>
          </p>
          <p className="text-active font-poppins">
            Class <span className="text-gray-600">4 </span>
          </p>
          <p className="text-active font-poppins">
            Unit <span className="text-gray-600">1 </span>
          </p>
        </div>
        <div className="between w-5/6 py-4">
          <p className="text-active font-poppins">
            Date <time className="text-gray-600">{"(1/1/2024)"} </time>
          </p>
          <p className="text-active font-poppins">
            Duration <span className="text-gray-600">2 hrs</span>
          </p>
          <p className="text-active font-poppins">
            Grade <span className="text-gray-600">85 </span>
          </p>
        </div>
        <h3>Answers :</h3>
      </FixedTopContent>
      <div className="flex flex-col gap-5 p-5">
        <h5 className="font-poppins">Mcq</h5>
        <ExamDetailCard />
      </div>
    </TeacherExamsContainer>
  );
};

export default TeacherExamDetails;
