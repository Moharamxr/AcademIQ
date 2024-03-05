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
//   return (
//     <div className="w-full">
//       <div className="between">
//         <p className="font-poppins font-normal text-base text-gray-800 leading-6">
//           Which of the following aspects of our product/service did you find
//           most impressive?
//         </p>
//         <span className="font-poppins text-gray-500 text-sm">(5 points)</span>
//       </div>
//       <form>
//         <input
//           type="radio"
//           name="option1"
//           id="option1"
//           className="appearance-none"
//         />
//         <label htmlFor="option1"></label>
//       </form>
//       <form className="flex flex-col gap-4 py-7 px-2">
//         <div className="flex gap-2">
//           <div
//             className={` border-[2px] h-[19px] mt-1 ${
//               IsCorrect ? "border-green-600" : "border-red-600"
//             } rounded-full p-[1.8px] center`}
//           >
//             <span
//               className={`border-[7px] ${
//                 IsCorrect ? "border-green-600" : "border-red-600"
//               } rounded-full `}
//             ></span>
//           </div>
//           <p className="text-gray-600 font-poppins pt-1">
//             Speed and Efficiency
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
//             <span className="border-[7px] border-white rounded-full "></span>
//           </div>
//           <p className="text-gray-600 font-poppins pt-1">
//             User-Friendly Interface
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
//             <span className="border-[7px] border-white rounded-full "></span>
//           </div>
//           <p className="text-gray-600 font-poppins pt-1">
//             Quality and Reliability
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
//             <span className="border-[7px] border-white rounded-full "></span>
//           </div>
//           <p className="text-gray-600 font-poppins pt-1">
//             Pricing and Value for Money.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
//             <span className="border-[7px] border-white rounded-full "></span>
//           </div>
//           <p className="text-gray-600 font-poppins pt-1">Customer Support</p>
//         </div>
//       </form>
//     </div>
//   );
// };
