import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RadioBtn from "../../../assets/icons/RadioBtn";
import { getQuestionById } from "../../../services/questionBank.service";
import { Skeleton } from "@mui/material";
const ViewQuestion = ({ isOpen, onClose, selectedQuestion, bankId }) => {
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getQuestion = async () => {
    if (selectedQuestion === "") return;
    setIsLoading(true);
    try {
      const data = await getQuestionById(bankId, selectedQuestion);
      setQuestion(data.question);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching question: ", error);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }

  };
  useEffect(() => {
    if (isOpen) {
      getQuestion();
    }
  }, [isOpen]);
  return (
    isOpen && (
      <div className="fixed  inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white rounded-xl p-5 lg:w-1/2 w-3/4 overflow-y-auto max-h-[95vh]">
          <div className="between">
            <span>Mcq</span>
            <span className="cursor-pointer" onClick={onClose}>
              <CloseIcon />
            </span>
          </div>
          {!isLoading ? (
            <>
              <p className="py-5">{question.text}</p>
              <div className="flex flex-col gap-3">
                {question?.options?.map((op, index) => (
                  <div className="flex gap-3" key={index}>
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
            </>
          ) : (
            <>
              <Skeleton variant="text" height={30} width={500}  />
              <Skeleton variant="text" height={20} width={200} />
              <Skeleton variant="text" height={20} width={200}  />
              <Skeleton variant="text" height={20} width={200}  />
              <Skeleton variant="text" height={20} width={200}  />
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ViewQuestion;
