import React from "react";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate = useNavigate ();
  return (
    <>
      <div className="flex md:flex-row flex-col w-10/12 gap-4 h-full">
        <div className=" between border-gray-300 border-[1px] rounded-lg p-3 w-1/2" onClick={navigate('/exams/details')}>
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
        <div className="between border-gray-300 border-[1px] rounded-lg p-3 w-1/2">
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-10/12 gap-4 h-full">
        <div className=" between border-gray-300 border-[1px] rounded-lg p-3 w-1/2">
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
        <div className="between border-gray-300 border-[1px] rounded-lg p-3 w-1/2">
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-10/12 gap-4 h-full">
        <div className=" between border-gray-300 border-[1px] rounded-lg p-3 w-1/2">
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
        <div className="between border-gray-300 border-[1px] rounded-lg p-3 w-1/2">
          <p>
            Unit 1{" "}
            <time className="text-sm text-gray-500">{"(1 / 1 / 2024 )"}</time>
          </p>
          <span className="text-sm text-gray-500">20 questions</span>
        </div>
      </div>
    </>
  );
};

export default Exams;
