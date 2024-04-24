import React from "react";
import styled from "@emotion/styled";
import SearchBlueIcon from "../../../assets/icons/SearchBlueIcon";
import SmCircle from "../../../assets/icons/SmCircle";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const TeacherGradesContainer = styled("div")({
  height: "35.8rem",
  width: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const TeacherGrades = () => {
  return (
    <TeacherGradesContainer>
      <div className="bg-white w-full rounded-xl  ">
        <FixedTopContent className="bg-white p-3 w-full rounded-t-xl pb-0">
          <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed md:leading-none text-gray-700">
            Grades
          </h3>
          <div className="center w-full py-1">
            <div className=" border-2 border-gray-200/70 shadow-sm rounded-lg flex divide-x-2 py-3">
              <select
                name="examName"
                className="outline-none bg-transparent h-8 px-2 text-gray-400 cursor-pointer text-xs sm:text-sm "
              >
                <option value="">Enter Exam Name</option>
              </select>
              <select
                name="examName"
                className="outline-none bg-transparent h-8 px-4 text-gray-400 cursor-pointer text-xs sm:text-sm "
              >
                <option value="">Enter Exam Name</option>
              </select>
              <div className="center px-2  w-full ">
                <SearchBlueIcon />
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed md:leading-none text-gray-700">
              Grades Sheet
            </h3>
            <div className="center gap-2">
              <SmCircle color={"#00769E"} />{" "}
              <span className="font-poppins text-xs text-gray-500">
                90% Passed
              </span>
            </div>
            <div className="center gap-2">
              <SmCircle color={"#FE626B"} />{" "}
              <span className="font-poppins text-xs text-gray-500">
                10% Failed
              </span>
            </div>
          </div>
          <div className="between py-3 px-3 border-b-2 border-gray-200/70">
            <span className="text-active w-8/12 lg:w-10/12 sm:text-base md:text-sm lg:text-base text-sm">
              Name
            </span>
            
              <span className="text-active w-2/12 lg:w-1/12 sm:text-base md:text-sm lg:text-base text-xs px-2">
                {"Grade [50]"}
              </span>
              <span className="text-active w-2/12 lg:w-1/12 sm:text-base md:text-sm lg:text-base text-xs px-2">
                {"Percentage%"}
              </span>
          
          </div>
        </FixedTopContent>
        <div className="flex flex-col gap-3 p-3">
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
          <div className="between gap-1">
            <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
              Mahmoud Ahmed Abdelader
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              50
            </span>
            <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
              100%
            </span>
          </div>
        </div>
      </div>
    </TeacherGradesContainer>
  );
};

export default TeacherGrades;
