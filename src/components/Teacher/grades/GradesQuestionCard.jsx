import React from "react";

const GradesQuestionCard = ({IsCorrect}) => {
  return (
    <div className="w-full">
      <div className="between">
        <p className="font-poppins font-normal text-base text-gray-800 leading-6">
          Which of the following aspects of our product/service did you find
          most impressive?
        </p>
        <span className="font-poppins text-gray-500 text-sm">(5 points)</span>
      </div>
      <div className="flex flex-col gap-4 py-7 px-2">
        <div className="flex gap-2">
          <div className={` border-[2px] h-[19px] mt-1 ${IsCorrect?'border-green-600':'border-red-600'} rounded-full p-[1.8px] center`}>
            <span className={`border-[7px] ${IsCorrect?'border-green-600':'border-red-600'} rounded-full `}></span>
          </div>
          <p className="text-gray-600 font-poppins pt-1">
            Speed and Efficiency
          </p>
        </div>
        <div className="flex gap-2">
          <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
            <span className="border-[7px] border-white rounded-full "></span>
          </div>
          <p className="text-gray-600 font-poppins pt-1">
            User-Friendly Interface
          </p>
        </div>
        <div className="flex gap-2">
          <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
            <span className="border-[7px] border-white rounded-full "></span>
          </div>
          <p className="text-gray-600 font-poppins pt-1">
            Quality and Reliability
          </p>
        </div>
        <div className="flex gap-2">
          <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
            <span className="border-[7px] border-white rounded-full "></span>
          </div>
          <p className="text-gray-600 font-poppins pt-1">
            Pricing and Value for Money.
          </p>
        </div>
        <div className="flex gap-2">
          <div className=" border-[2px] h-[19px] mt-1 border-active-br rounded-full p-[1.8px] center">
            <span className="border-[7px] border-white rounded-full "></span>
          </div>
          <p className="text-gray-600 font-poppins pt-1">Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default GradesQuestionCard;
