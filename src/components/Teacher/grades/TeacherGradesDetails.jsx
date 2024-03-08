import styled from "@emotion/styled";
import React from "react";
import "./style.css";
import GradesQuestionCard from "./GradesQuestionCard";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`;

const TeacherGradesContainer = styled.main`
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

const TeacherGradesDetails = () =>{

  return (
    <TeacherGradesContainer>
      <FixedTopContent className="bg-white w-full rounded-xl p-5 pb-0">
        <h2 className="font-poppins text-2xl font-medium">
          Mahmoud Ahmed Abdelader
        </h2>
        <div className="between w-4/6 py-4">
          <p className="text-active font-poppins">
            Exam <span className="text-gray-600">unit 1 </span>
          </p>
          <p className="text-active font-poppins">
            Grade <span className="text-gray-600">45/50 </span>
          </p>
          <p className="text-active font-poppins">
            Percentage <span className="text-gray-600">85% </span>
          </p>
        </div>
        <h3>Answers :</h3>
      </FixedTopContent>
      <div className="flex flex-col gap-5 p-5">
        <h5 className="font-poppins">Mcq</h5>
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
        <GradesQuestionCard IsCorrect={false} />
        <GradesQuestionCard IsCorrect={true} />
      </div>
    </TeacherGradesContainer>
  );
};

export default TeacherGradesDetails;
