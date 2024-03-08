import React, { useState } from "react";

const ExamDetailCard = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const questions = [
    {
      question:
        "Which of the following aspects of our product/service did you find most impressive?",
      options: [
        { id: 1, option: "Speed and Efficiency" },
        { id: 2, option: "User-Friendly Interface" },
        { id: 3, option: "Quality and Reliability" },
        { id: 4, option: "Pricing and Value for Money" },
        { id: 5, option: "Customer Support" },
      ],
    },
    {
      question:
        "Which of the following aspects of our product/service did you find most impressive?",
      options: [
        { id: 1, option: "Speed and Efficiency" },
        { id: 2, option: "User-Friendly Interface" },
        { id: 3, option: "Quality and Reliability" },
        { id: 4, option: "Pricing and Value for Money" },
        { id: 5, option: "Customer Support" },
      ],
    },
    {
      question:
        "Which of the following aspects of our product/service did you find most impressive?",
      options: [
        { id: 1, option: "Speed and Efficiency" },
        { id: 2, option: "User-Friendly Interface" },
        { id: 3, option: "Quality and Reliability" },
        { id: 4, option: "Pricing and Value for Money" },
        { id: 5, option: "Customer Support" },
      ],
    },
    {
      question:
        "Which of the following aspects of our product/service did you find most impressive?",
      options: [
        { id: 1, option: "Speed and Efficiency" },
        { id: 2, option: "User-Friendly Interface" },
        { id: 3, option: "Quality and Reliability" },
        { id: 4, option: "Pricing and Value for Money" },
        { id: 5, option: "Customer Support" },
      ],
    },
    {
      question:
        "Which of the following aspects of our product/service did you find most impressive?",
      options: [
        { id: 1, option: "Speed and Efficiency" },
        { id: 2, option: "User-Friendly Interface" },
        { id: 3, option: "Quality and Reliability" },
        { id: 4, option: "Pricing and Value for Money" },
        { id: 5, option: "Customer Support" },
      ],
    },
  ];

  const handleOptionChange = (questionIndex, optionId) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionIndex]: optionId
    }));
  };

  return (
    <div className="w-full">
      <form>
        {questions.map((q, index) => (
          <div key={index}>
            <div className="between">
              <p className="font-poppins font-normal text-base text-gray-800 leading-6">
                {q.question}
              </p>
              <span className="font-poppins text-gray-500 text-sm">(5 points)</span>
            </div>
            {q.options.map((option) => (
              <div key={option.id} className="flex gap-2" >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.id}
                  checked={selectedOptions[index] === option.id}
                  onChange={() => handleOptionChange(index, option.id)}
                />
                <p className="text-gray-600 font-poppins pt-1">
                  {option.option}
                </p>
              </div>
            ))}
          </div>
        ))}
      </form>
      <button className="bg-active float-end text-white py-2 px-5 text-center rounded-lg">Submit</button>
    </div>
  );
};

export default ExamDetailCard;