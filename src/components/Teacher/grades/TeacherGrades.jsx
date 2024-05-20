import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchBlueIcon from "../../../assets/icons/SearchBlueIcon";
import SmCircle from "../../../assets/icons/SmCircle";
import { BiLoader } from "react-icons/bi";
import {
  getAssessmentByStatus,
  getSubmissionByAssessment,
} from "../../../services/assessment.service";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const TeacherGradesContainer = styled("div")({
  height: "38.1rem",
  width: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [exams, setExams] = useState([]);
  const [isExamsLoading, setIsExamsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchExams = async () => {
    setIsExamsLoading(true);
    try {
      const response = await getAssessmentByStatus("completed");
      setExams(response?.assessments);
    } catch (error) {
      setError(error?.response?.data?.error || "An error occurred");
    }
    setIsExamsLoading(false);
  };
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchGrades = async () => {
    if (!selectedExam) return;
    setIsLoading(true);
    try {
      const response = await getSubmissionByAssessment(selectedExam);
      setGrades(response?.submissions?.studentsScores);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const calculateSuccessPercentage = () => {
    const passed = grades.filter((grade) => grade?.score >= 25);
    return (passed.length / grades?.length) * 100;
  };

  

  return (
    <TeacherGradesContainer className="bg-white w-full rounded-xl">
      <FixedTopContent className="bg-white p-3 w-full rounded-t-xl pb-0">
        <h3 className="font-poppins font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed md:leading-none text-gray-700">
          Grades
        </h3>
        <div className="center w-full  py-1">
          <div className="w-2/6 border-2 border-gray-200/70 shadow-sm rounded-lg flex divide-x-2 py-3">
            <select
              name="examName"
              className="outline-none bg-transparent w-5/6 h-8 px-2 text-gray-600 cursor-pointer text-xs sm:text-sm "
              onChange={handleExamChange}
              value={selectedExam}
            >
              <option value="">Select Exam</option>
              {!isExamsLoading &&
                exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.title}
                  </option>
                ))}
              {isExamsLoading && <option>Loading...</option>}
            </select>

            <div className="center px-2  w-1/6 " onClick={fetchGrades}>
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
             {calculateSuccessPercentage()||''}% Passed
            </span>
          </div>
          <div className="center gap-2">
            <SmCircle color={"#FE626B"} />{" "}
            <span className="font-poppins text-xs text-gray-500">
              {(100-calculateSuccessPercentage())||''}% Failed
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
        {!isLoading &&
          grades.map((grad) => (
            <div className="between gap-1" key={grad?.studentId}>
              <span className="p-2 px-3 w-8/12 lg:w-10/12 bg-gray-100 rounded-lg sm:text-base md:text-sm lg:text-base text-xs">
                {grad?.studentId}
              </span>
              <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
                {grad?.score}
              </span>
              <span className="p-2 w-2/12 lg:w-1/12 bg-gray-100 rounded-lg text-center sm:text-base md:text-sm lg:text-base text-sm">
                {(grad?.score / grad?.fullScore) * 100}%
              </span>
            </div>
          ))}
          {!isLoading&&grades?.length === 0 && <span className="center pt-8 text-gray-500">No grades yet!</span>}
        {isLoading && (
          <div className="center w-full py-10">
            <BiLoader />
          </div>
        )}
      </div>
    </TeacherGradesContainer>
  );
};

export default TeacherGrades;
