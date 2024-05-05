import React from "react";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";
import Laptop from "../../../assets/laptop white screen.png";
import Cap from "../../../assets/black graduation cap.png";
import Book from "../../../assets/red opened book.png";

const Teacher = () => {
  const fullName = localStorage.getItem("fullName");
  return (
    <>
      <div className="w-full lg:w-8/12  ">
        <div className="flex flex-col gap-4 pt-1 w-full">
          <div className="bg-white rounded-xl p-4 ">
            <h2 className="font-poppins font-bold text-2xl leading-10 text-gray-800">
              Hello, {fullName}
            </h2>
            <p className="font-poppins font-normal text-base leading-tight text-gray-400">
              Welcome to our school, <br />
              Start creating highly engaging <br /> courses now!
            </p>
          </div>
          <div className="bg-white rounded-xl between gap-2 p-2 w-full">
            <div className="border-active-br border-[1px] rounded-lg center flex-col text-center p-3 md:py-4 py-5 w-1/3 min-h-full">
              <img src={Laptop} alt="Laptop " />
              <div className="font-poppins py-2">
                <p className="text-active text-2xl">10</p>
                Total Courses
              </div>
            </div>
            <div className="border-active-br border-[1px] rounded-lg center flex-col text-center p-3 py-6 w-1/3 min-h-full">
              <img src={Cap} alt="Cap  " />
              <div className="font-poppins py-2">
                <p className="text-active text-2xl">120</p>
                Total Students
              </div>
            </div>
            <div className="border-active-br border-[1px] rounded-lg center flex-col text-center p-3 lg:py-1 xl:py-3 py-1 w-1/3 min-h-full">
              <img src={Book} alt="Book " />
              <div className="font-poppins py-2">
                <p className="text-active text-2xl">8</p>
                Active Quiz
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default Teacher;
