import React, { useEffect, useState } from "react";
import {
  getQuestionBankById,
  getQuestionBanks,
} from "../../../../services/questionBank.service";
import { CircularProgress, Skeleton } from "@mui/material";
import CheckedIcon from "../../../../assets/icons/CheckedIcon";

import { addMultiQuestionsToAssessment } from "../../../../services/assessment.service";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

const ListContainer = styled("div")({
  maxHeight: "40.5rem",
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

const SelectQuestions = () => {
  const { id } = useParams();
  const [questionBanks, setQuestionBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const navigate = useNavigate();

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const getBanks = async () => {
    try {
      const questionBankData = await getQuestionBanks();
      setQuestionBanks(questionBankData.questionBanks);
    } catch (error) {
      console.error("Error fetching question banks: ", error);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  const fetchQuestionBankById = async () => {
    setIsLoading(true);
    try {
      const questionBankData = await getQuestionBankById(selectedBank);
      const questionsData = questionBankData?.questionBank?.questions;

      if (Array.isArray(questionsData)) {
        const tempQuestions = questionsData.map((question) => ({
          id: question._id,
          head: question.head,
          text: question.text,
          options: question.options,
          paragraph: question.paragraph,
          checked: false,
          points: question.points,
        }));
        setQuestions(tempQuestions);
      } else {
        throw new Error("Questions data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching question bank: ", error);
      setError("Error fetching question bank");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBank) {
      fetchQuestionBankById();
    }
  }, [selectedBank]);

  const toggleCheck = (id) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, checked: !question.checked }
          : question
      )
    );
  };

  useEffect(() => {
    const updatedSelectedQuestions = questions
      .filter((q) => q.checked)
      .map((q) => q.id);
    setSelectedQuestions(
      updatedSelectedQuestions.map((questionId) => ({
        questionId,
        points: 1,
      }))
    );
  }, [questions]);

  const selectAll = () => {
    setQuestions(questions.map((question) => ({ ...question, checked: true })));
  };

  const deselectAll = () => {
    setQuestions(
      questions.map((question) => ({ ...question, checked: false }))
    );
  };

  const reset = () => {
    setSelectedBank("");
    setQuestions([]);
    setSelectedQuestions([]);
  };

  const isValidate = () => {
    if (selectedQuestions.length === 0 && !isLoading) {
      setError("Please select at least one question.");
      return false;
    }
    return true;
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    const requestBody = {
      questionBankId: selectedBank,
      questions: selectedQuestions,
    };
    console.log("requestBody", requestBody);
    try {
      await addMultiQuestionsToAssessment(id, requestBody);
      setIsSubmitting(false);
      reset();
      navigate("/exams");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsSubmitting(false);
    }
  };

  return (
    <ListContainer className=" bg-white px-5 w-full rounded-xl  overflow-hidden">
      <FixedTopContent className="py-5 bg-white">
        <h2 className="font-poppins text-2xl font-medium">
          Select Exam Questions
        </h2>
      </FixedTopContent>

      {error && (
        <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center mt-2">
          {error}
        </p>
      )}

      <div className=" pb-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 w-full md:w-1/2 ">
            <label htmlFor="subject" className="text-active">
              Question Bank
            </label>
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
              value={selectedBank}
              onChange={handleBankChange}
            >
              <option value="">Select Grade</option>
              {questionBanks?.map((bank, index) => (
                <option key={index} value={bank._id}>
                  {bank.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <h2 className="text-active">Questions</h2>
            {!isLoading ? (
              Array.isArray(questions) &&
              questions?.map((question, index) => (
                <div
                  key={question.id}
                  className="col-span-1 between py-3 border-2 border-gray-200/60 rounded-md px-6 hover:cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-5">
                    {index + 1}
                    <span className="text-gray-600 ">{question.text}</span>
                  </div>
                  <button onClick={() => toggleCheck(question.id)}>
                    {question.checked ? (
                      <CheckedIcon checked={true} />
                    ) : (
                      <CheckedIcon />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <>
                <Skeleton variant="rounded" height={50} />
                <Skeleton variant="rounded" height={50} />
                <Skeleton variant="rounded" height={50} />
                <Skeleton variant="rounded" height={50} />
              </>
            )}
          </div>
          {questions.length === 0 && !isLoading && (
            <p className="text-gray-400 text-center pt-3 pb-20">
              No Questions Available ! <br /> Select Question Bank
            </p>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white z-10 py-5 px-5">
        <div className="flex justify-between">
          <button
            className={`py-3  text-white rounded-lg w-36 ${
              isSubmitting ? "bg-gray-400" : "bg-active"
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Submit"
            )}
          </button>
          <div className="flex gap-8">
            <button
              className="py-3 bg-transparent text-green-600 border-2 border-green-600 rounded-lg w-36 hover:bg-green-600 hover:text-white"
              onClick={selectAll}
            >
              Select All
            </button>
            <button
              className="py-3 bg-transparent text-red-600 border-2 border-red-600 rounded-lg w-36 hover:bg-red-600 hover:text-white"
              onClick={deselectAll}
            >
              Deselect All
            </button>
          </div>
        </div>
      </div>
    </ListContainer>
  );
};

export default SelectQuestions;
