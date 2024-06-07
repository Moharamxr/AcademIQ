import React, { useState } from "react";
import RadioBtn from "../../../../assets/icons/RadioBtn";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAssessmentQuestion } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const QuestionCard = ({ question, index, fetchExam ,status }) => {
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedQuestion, setDeletedQuestion] = useState(null);
  const handleDelete = async () => {
    setIsDeleting(true);
    setDeletedQuestion(question?._id);
    await deleteAssessmentQuestion(id, question?._id);
    fetchExam();
    setDeletedQuestion(null);

    setIsDeleting(false);
  };
  const role =localStorage.getItem("role");
  return (
    <div className="w-full border-b-2 pb-5">
      <div className="between">
        <div className="flex gap-1">
          <span className="font-medium text-lg">
            {index + 1}
            {") "}
            {question?.text}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          ({question?.points} points)
          {role==='teacher'&&status==='pending'&& <span onClick={handleDelete} className="ms-2 ">
            {isDeleting && question?._id === deletedQuestion ? (
              <CircularProgress size={15} color="inherit" />
            ) : (
              <DeleteIcon className="hover:text-red-500 " />
            )}
          </span>}
        </span>
      </div>
      <div className="flex flex-col gap-3 pt-4 ps-4">
        {question?.options?.map((op) => (
          <div className="flex gap-3" key={op.id ? op.id : op._id}>
            {op?.isCorrect ? (
              <RadioBtn />
            ) : (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10.5"
                  r="9"
                  stroke="#00769E"
                  strokeWidth="2"
                />
              </svg>
            )}
            <span>{op?.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
