import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateQuestion } from "../../../services/questionBank.service";
import { CircularProgress } from "@mui/material";

const ListContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const OptionInput = ({ index, option, onChange, onRemove, onSelect }) => (
  <div className="center gap-3 pt-3">
    <span className="text-sm font-medium">{index + 1}.</span>
    <label className="center">
      <input
        type="radio"
        name="options"
        checked={option.isCorrect}
        onChange={() => onSelect(index)}
      />
    </label>
    <input
      className="block w-full border border-gray-300 rounded-md px-2 py-1"
      type="text"
      name="text"
      value={option.text || ""}
      onChange={(e) => onChange(index, e)}
      placeholder={`Option ${index + 1}`}
    />
    {onRemove && (
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    )}
  </div>
);

OptionInput.propTypes = {
  index: PropTypes.number.isRequired,
  option: PropTypes.shape({
    text: PropTypes.string,
    reason: PropTypes.string,
    isCorrect: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
};

const UpdateBankQuestion = ({ isOpen, onClose, id, question }) => {
  const initialState = {
    head: question?.head || "",
    text: question?.text || "",
    paragraph: question?.paragraph || "",
    type: "Multiple-Choice",
    answer: question?.answer || "",
    options: question?.options || [{ text: "", reason: "", isCorrect: false }],
    tags: [],
    difficulty: "hard",
  };

  const [questionData, setQuestionData] = useState(initialState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuestionData(initialState);
  }, [question]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => {
      const newOptions = [...prev.options];
      newOptions[index][name] = value;
      return { ...prev, options: newOptions };
    });
  };

  const handleAddOption = () => {
    setQuestionData((prev) => ({
      ...prev,
      options: [...prev.options, { text: "", reason: "", isCorrect: false }],
    }));
  };

  const handleRemoveOption = (index) => {
    setQuestionData((prev) => {
      const newOptions = [...prev.options];
      newOptions.splice(index, 1);
      return { ...prev, options: newOptions };
    });
  };

  const handleOptionSelection = (index) => {
    setQuestionData((prev) => {
      const newOptions = prev.options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }));
      return {
        ...prev,
        options: newOptions,
        answer: newOptions[index].text,
      };
    });
  };

  const validate = () => {
    if (!questionData.head) {
      setError("Title must be filled");
    } else if (!questionData.text) {
      setError("Question must be filled");
    } else if (!questionData.paragraph) {
      setError("Description must be filled");
    } else if (questionData.options.length < 2) {
      setError("Minimum of two options required");
    } else if (!questionData.answer) {
      setError("Select the correct answer");
    } else {
      return true;
    }
    setTimeout(() => setError(""), 3000);
    return false;
  };

  const reset = () => {
    setQuestionData(initialState);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await updateQuestion(id, question?._id, questionData);
      reset();
      onClose();
    } catch (error) {
      setError(error?.response?.data?.error || error.message || "An error occurred while adding question");
      setTimeout(() => setError(""), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <ListContainer className="bg-white rounded-xl p-5 w-1/2 overflow-y-auto max-h-[95vh]">
          <div className="flex flex-col gap-3 p-2">
            <span className="text-xl font-medium pb-4">Edit Multiple Choice Question</span>
            {error && (
              <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
                {error}
              </p>
            )}
            <input
              className="block w-full border border-gray-300 rounded-md px-2 py-1"
              type="text"
              name="head"
              value={questionData.head || ""}
              onChange={(e) => setQuestionData({ ...questionData, head: e.target.value })}
              placeholder="Title"
            />
            <input
              className="block w-full border border-gray-300 rounded-md px-2 py-1"
              type="text"
              name="text"
              value={questionData.text || ""}
              onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })}
              placeholder="Enter question"
            />
            <textarea
              className="block w-full border border-gray-300 rounded-md px-2 py-2 outline-none overflow-hidden"
              name="paragraph"
              value={questionData.paragraph || ""}
              onChange={(e) => setQuestionData({ ...questionData, paragraph: e.target.value })}
              placeholder="Description"
            />
            {questionData.options.map((option, index) => (
              <OptionInput
                key={index}
                index={index}
                option={option}
                onChange={handleInputChange}
                onRemove={questionData.options.length > 1 ? handleRemoveOption : null}
                onSelect={handleOptionSelection}
              />
            ))}
            <span onClick={handleAddOption} className="text-active font-semibold rounded-md cursor-pointer">
              Add Option
            </span>
            <div className="between">
              <button
                onClick={handleSubmit}
                className={`bg-active text-white rounded-md px-10 py-2 mt-3 ${isLoading ? 'px-14' : ''}`}
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
          </div>
        </ListContainer>
      </div>
    )
  );
};

UpdateBankQuestion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  question: PropTypes.shape({
    _id: PropTypes.string,
    head: PropTypes.string,
    text: PropTypes.string,
    paragraph: PropTypes.string,
    answer: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        reason: PropTypes.string,
        isCorrect: PropTypes.bool,
      })
    ),
  }),
};

export default UpdateBankQuestion;
