import React, { useEffect } from "react";
import Exams from "./Exams";
import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  createAssessment,
  getAssessmentByCourse,
  getAssessmentByStatus,
} from "../../../services/assessment.service";
import { CircularProgress, Skeleton } from "@mui/material";
import { getGradeCourses } from "../../../services/courses.service";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 10;
`;

const TeacherExamsContainer = styled("div")({
  maxHeight: "38rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const TeacherExamsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?._id || "");

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const data = await getGradeCourses();
      setCourses(data.courses);
      setLoadingCourses(false);
    } catch (error) {
      console.error("Error fetching courses: ", error);
      setLoadingCourses(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const [lastExams, setLastExams] = useState([]);
  const [pendingExams, setPendingExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(false);

  const fetchDrafts = async () => {
    setLoadingExams(true);
    try {
      const data = await getAssessmentByStatus("draft");
      setPendingExams(data?.assessments);
      setLoadingExams(false);
    } catch (error) {
      console.error("Error fetching drafts: ", error);
      setLoadingExams(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchExams = async () => {
    if (!selectedCourse) return;
    setLoadingExams(true);
    try {
      const data = await getAssessmentByCourse(selectedCourse);
      const examsData = data?.assessments;
      const lastExamsData = examsData.filter(
        (exam) => exam.status === "completed"
      );
      const upcomingExamsData = examsData.filter(
        (exam) => exam.status === "pending"
      );
      setLastExams(lastExamsData);
      setUpcomingExams(upcomingExamsData);
      setLoadingExams(false);
    } catch (error) {
      console.error("Error fetching exams: ", error);
      setLoadingExams(false);
    }
  };
  useEffect(() => {
    fetchExams();
  }, [selectedCourse]);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Last Exams",
      content: <Exams exams={lastExams} isLoading={loadingExams} />,
    },
    {
      label: "Pending Exams",
      content: <Exams exams={pendingExams} isLoading={loadingExams} />,
    },
    {
      label: "Upcoming Exams",
      content: <Exams exams={upcomingExams} isLoading={loadingExams} />,
    },
  ];
  const navigate = useNavigate();
  const [isCreatingExam, setIsCreatingExam] = useState(false);

  const handleCreateExam = async () => {
    const requestBody = {
      type: "exam",
    };
    setIsCreatingExam(true);
    try {
      const data = await createAssessment(requestBody);
      setIsCreatingExam(false);
      const assessmentData = data?.assessment;
      navigate(`/exams/create/${assessmentData._id}`);
    } catch (error) {
      console.error("Error creating exam: ", error);
      setIsCreatingExam(false);
    }
  };
  return (
    <div className="w-full bg-white rounded-xl">
      <TeacherExamsContainer className=" bg-white rounded-xl ">
        <FixedTopContent>
          <div className="between p-5 pb-0">
            <h3 className="font-poppins text-2xl font-medium">Exams</h3>
            <select
              name="courses"
              id="courses"
              className="p-3 bg-gray-100 rounded-xl outline-none "
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {loadingCourses ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="center gap-14 w-full border-gray-300 border-b-[1px] pt-7 pb-0">
            {tabs.map((tab, index) => (
              <h4
                key={index}
                className={`${
                  activeTab === index
                    ? "border-b-2 border-active  text-active"
                    : "text-gray-400"
                } px-3 font-poppins font-normal text-base leading-7 pb-2  cursor-pointer`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </h4>
            ))}
          </div>
        </FixedTopContent>

        <div className="py-7 center flex-col gap-5 ">
          {tabs[activeTab].content}
        </div>

        <FixedBottomContent className=" flex flex-row-reverse pt-12 pe-5 pb-5">
          <button
            className={`float-right bg-active text-white p-2 rounded-md  font-poppins ${
              isCreatingExam ? "px-12" : "px-4"
            }`}
            onClick={handleCreateExam}
          >
            {isCreatingExam ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Create Exam"
            )}
          </button>
        </FixedBottomContent>
      </TeacherExamsContainer>
    </div>
  );
};

export default TeacherExamsPage;
