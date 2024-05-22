import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Exams from "./Exams";
import {
  createAssessment,
  getAssessmentByCourse,
  getAssessmentByStatus,
} from "../../../services/assessment.service";
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

const TeacherExamsContainer = styled.div`
  max-height: 38rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ExamsPage = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState({
    lastExams: [],
    activeExams: [],
    upcomingExams: [],
    teacherActiveExams: [],
  });
  const [loading, setLoading] = useState({
    courses: false,
    exams: false,
    creatingExam: false,
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading((prev) => ({ ...prev, courses: true }));
      try {
        const data = await getGradeCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, courses: false }));
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchExamsByStatus = async () => {
      setLoading((prev) => ({ ...prev, exams: true }));
      try {
        const data = await getAssessmentByStatus();
        const examsData = data?.assessments || [];
        const activeExamsData = examsData.filter(
          (exam) => exam.status === "published"
        );
        const upcomingExamsData = examsData.filter(
          (exam) => exam.status === "pending"
        );
        setExams((prev) => ({
          ...prev,
          activeExams: activeExamsData,
          upcomingExams: upcomingExamsData,
        }));
        if (role === "teacher") {
          const pendingExamsData = examsData.filter(
            (exam) => exam.status === "draft"
          );
          setExams((prev) => ({
            ...prev,
            teacherActiveExams: activeExamsData,
            pendingExams: pendingExamsData,
          }));
        }
      } catch (error) {
        // console.error("Error fetching exams: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, exams: false }));
      }
    };

    fetchExamsByStatus();
  }, [role]);

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchExamsByCourse = async () => {
      setLoading((prev) => ({ ...prev, exams: true }));
      try {
        const data = await getAssessmentByCourse(selectedCourse);
        const examsData = data?.assessments || [];
        const lastExamsData = examsData.filter(
          (exam) => exam.status === "completed"
        );
        const upcomingExamsData = examsData.filter(
          (exam) => exam.status === "pending"
        );
        setExams((prev) => ({
          ...prev,
          lastExams: lastExamsData,
          upcomingExams: upcomingExamsData,
        }));
      } catch (error) {
        console.error("Error fetching exams by course: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, exams: false }));
      }
    };

    fetchExamsByCourse();
  }, [selectedCourse]);

  const handleCreateExam = async () => {
    setLoading((prev) => ({ ...prev, creatingExam: true }));
    try {
      const data = await createAssessment({ type: "exam" });
      const assessmentData = data?.assessment;
      navigate(`/exams/create/${assessmentData._id}`);
    } catch (error) {
      console.error("Error creating exam: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, creatingExam: false }));
    }
  };

  const tabs = [
    {
      label: "Last Exams",
      content: <Exams exams={exams.lastExams} isLoading={loading.exams} />,
    },
    {
      label: "Active Exams",
      content: (
        <Exams
          exams={
            role === "student" ? exams.activeExams : exams.teacherActiveExams
          }
          isLoading={loading.exams}
        />
      ),
    },
    {
      label: "Upcoming Exams",
      content: <Exams exams={exams.upcomingExams} isLoading={loading.exams} />,
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl">
      <TeacherExamsContainer className="bg-white rounded-xl">
        <FixedTopContent>
          <div className="between p-5 pb-0">
            <h3 className="font-poppins text-2xl font-medium">Exams</h3>
            <select
              name="courses"
              id="courses"
              className="p-3 bg-gray-100 rounded-xl outline-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="" disabled>
                Select Course
              </option>
              {loading.courses ? (
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
                    ? "border-b-2 border-active text-active"
                    : "text-gray-400"
                } px-3 font-poppins font-normal text-base leading-7 pb-2 cursor-pointer`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </h4>
            ))}
          </div>
        </FixedTopContent>

        <div className="py-7 center flex-col gap-5">
          {tabs[activeTab].content}
        </div>

        {role === "teacher" && (
          <FixedBottomContent className="flex flex-row-reverse pt-12 pe-5 pb-5">
            <button
              className={`float-right bg-active text-white p-2 rounded-md font-poppins ${
                loading.creatingExam ? "px-12" : "px-4"
              }`}
              onClick={handleCreateExam}
            >
              {loading.creatingExam ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Create Exam"
              )}
            </button>
          </FixedBottomContent>
        )}
      </TeacherExamsContainer>
    </div>
  );
};

export default ExamsPage;
