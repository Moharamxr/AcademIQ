import React, { useState } from "react";
import RadioBtn from "../../../../assets/icons/RadioBtn";
import { useDispatch } from "react-redux";
import { setStudentAnswers } from "../../../../store/slices/examSlice";

const StudentQuestionCard = ({ question, index, examId }) => {
  const dispatch = useDispatch();

  const studentId = localStorage.getItem("userId");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
    dispatch(
      setStudentAnswers({
        questionId: question.question.id,
        optionId,
        examId,
        studentId,
      })
    );
  };

  return (
    <div className="w-full border-b-2 pb-5">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <span className="font-medium text-lg">
            {index + 1}) {question?.question.text}
          </span>
        </div>
        <span className="text-gray-500 text-sm">({question?.points} points)</span>
      </div>
      <div className="flex flex-col gap-3 pt-4 ps-4">
        {question?.question.options.map((op) => (
          <div
            className="flex items-center gap-3 cursor-pointer"
            key={op.id}
            onClick={() => handleOptionClick(op.id)}
          >
            {selectedOption === op.id ? (
              <RadioBtn />
            ) : (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10.5" r="9" stroke="#00769E" strokeWidth="2" />
              </svg>
            )}
            <span>{op.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentQuestionCard;
