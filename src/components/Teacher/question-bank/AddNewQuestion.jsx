import styled from "@emotion/styled";
import React, { useState } from "react";
import { addQuestion } from "../../../services/questionBank.service";
import { CircularProgress } from "@mui/material";

const ListContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const AddNewQuestion = ({ isOpen, onClose, id }) => {
  const [questionData, setQuestionData] = useState({
    head: "",
    text: "",
    paragraph: "",
    type: "Multiple-Choice",
    answer: "",
    options: [{ text: "", reason: "", isCorrect: false }],
    tags: [],
    difficulty: "hard",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newOptions = [...questionData.options];
    newOptions[index][name] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleAddOption = () => {
    setQuestionData({
      ...questionData,
      options: [
        ...questionData.options,
        { text: "", reason: "", isCorrect: false },
      ],
    });
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...questionData.options];
    newOptions.splice(index, 1);
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleOptionSelection = (index) => {
    const newOptions = questionData.options.map((option, i) => ({
      ...option,
      isCorrect: i === index ? true : false,
    }));
    setQuestionData({
      ...questionData,
      options: newOptions,
      answer: questionData.options[index].text,
    });
  };

  const isValidate = () => {
    if (questionData.head === "") {
      setError("Title must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (questionData.text === "") {
      setError("Question must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (questionData.paragraph === "") {
      setError("Description must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (questionData.options.length < 2) {
      setError("Minimum of two options required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (questionData.answer === "") {
      setError("Select the correct answer");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const reset = () => {
    setQuestionData({
      head: "",
      text: "",
      paragraph: "",
      type: "Multiple-Choice",
      answer: "",
      options: [{ text: "", reason: "", isCorrect: true }],
      tags: [],
      difficulty: "hard",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    try {
      await addQuestion(id, questionData);
      setIsLoading(false);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      setError( error?.response?.data?.error || error.message || "An error occurred while adding question");
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <ListContainer className="bg-white rounded-xl p-5 w-1/2 overflow-y-auto max-h-[95vh]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-2">
            <span className="text-xl font-medium pb-4">
              Add Multiple Choice Question
            </span>
            {error && (
              <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
                {error}
              </p>
            )}
            <input
              className="block w-full border border-gray-300 rounded-md px-2 py-1"
              type="text"
              name="head"
              value={questionData.head}
              onChange={(e) =>
                setQuestionData({ ...questionData, head: e.target.value })
              }
              placeholder="Title"
            />
            <input
              className="block w-full border border-gray-300 rounded-md px-2 py-1"
              type="text"
              name="text"
              value={questionData.text}
              onChange={(e) =>
                setQuestionData({ ...questionData, text: e.target.value })
              }
              placeholder="Enter question"
            />
            <textarea
              className="block w-full border border-gray-300 rounded-md px-2 py-2 outline-none overflow-hidden"
              type="text"
              name="paragraph"
              value={questionData.paragraph}
              onChange={(e) =>
                setQuestionData({ ...questionData, paragraph: e.target.value })
              }
              placeholder="Description"
            />
            {/* Input fields for options */}
            {questionData.options.map((option, index) => (
              <div key={index} className="center gap-3 pt-3 ">
                <span className="text-sm font-medium">{index + 1}.</span>
                <label className="center ">
                  <input
                    type="radio"
                    name="options"
                    value={option.text}
                    checked={option.isCorrect}
                    onChange={() => handleOptionSelection(index)}
                  />
                </label>
                <input
                  className="block w-full border border-gray-300 rounded-md px-2 py-1"
                  type="text"
                  name="text"
                  value={option.text}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder={`Option ${index + 1}`}
                />
                {questionData.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <span
              onClick={handleAddOption}
              className=" text-active font-semibold rounded-md cursor-pointer"
            >
              Add Option
            </span>
            <div className="between">
              <button
                type="submit"
                className={`bg-active text-white rounded-md px-10 py-2 mt-3 ${isLoading?'px-14':''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="submit"
                className="bg-white text-active border-2 border-active-br rounded-md px-8 py-2 mt-3"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </ListContainer>
      </div>
    )
  );
};

export default AddNewQuestion;
