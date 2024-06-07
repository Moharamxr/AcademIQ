import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssessmentById,
  getStartedSubmission,
  submitExamAnswers,
} from "../../../../services/assessment.service";
import QuestionCard from "./QuestionCard";
import { CircularProgress, Skeleton, duration } from "@mui/material";
import AddQuestion from "../examCreation/AddQuestion";
import StudentQuestionCard from "./StudentQuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../../store/slices/examSlice";

const TeacherExamsContainer = styled("div")({
  height: "100hv",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "0.75rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const ExamDetails = () => {
  const { id } = useParams();

  const role = localStorage.getItem("role");

  const examStartDate = new Date (localStorage.getItem("examStartDate"));

  const answers = useSelector((state) => state.examData.examSubmission.answers);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddClose = () => setIsAddOpen(false);
  const onAddOpen = () => setIsAddOpen(true);

  const navigate = useNavigate();

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchExam = async () => {
    setLoading(true);
    try {
      const examData = await getAssessmentById(id);
      setExam(examData?.assessment);
      
      setQuestions(examData?.assessment?.questions);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);
  const handleGoToSelectQuestions = () => {
    navigate(`/exams/create/${id}/select-questions`);
  };

  const dispatch = useDispatch();

  const submitAnswers = async () => {
    console.log("submitting answers", answers);
    const requestedBody = {
      answers: answers,
    };
    setSubmitting(true);
    try {
      // const submissionData = await getStartedSubmission(id);
      // setSubmissionId(submissionData?.submission?._id);
      await submitExamAnswers(id, requestedBody);
      setSubmitting(false);
      dispatch(resetState());
      navigate("/exams");
    } catch (error) {
      setError(error.response?.data?.error);
      setTimeout(() => {
        setError("");
      } , 5000)
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   console.log(examStartDate);
  // }, [examStartDate]);

  
  // useEffect(() => {
  //   setTimeout(() => {
  //     submitAnswers();
  //   }, exam?.duration * 60 * 1000);

  //   if (exam?.endDate && new Date(exam?.endDate) < new Date()) {
  //     submitAnswers();
  //   }
  // }, []);
  

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     console.log("Navigating back or forward...");
  //     submitAnswers();
  //   };

  //   window.addEventListener("popstate", handlePopstate);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, [dispatch]);

  return (
    <TeacherExamsContainer className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen">
      <div className="bg-white w-full rounded-xl p-5 pb-0 border-b-2 rounded-b-none px-6">
        <h2 className="font-poppins text-2xl font-medium">
          {exam?.title ? exam?.title : "Exam Title"}
        </h2>
        <div className="grid grid-cols-3  py-4">
          <div className="col-span-1 flex gap-2">
            <span className="text-active font-poppins ">Course :</span>
            {loading ? (
              <Skeleton variant="text" height={30} width={100} />
            ) : (
              <span className="text-gray-600">{exam?.course?.title}</span>
            )}
          </div>

          <div className="col-span-1 flex gap-2">
            <span className="text-active font-poppins ">Start Time :</span>
            {loading ? (
              <Skeleton variant="text" height={30} width={100} />
            ) : (
              <time className="text-gray-600 ">
                {"(" + exam?.startDate?.slice(0, 10) + ")"}{" "}
                {`${
                  parseInt(exam?.startDate?.slice(11, 13)) > 12
                    ? parseInt(exam?.startDate?.slice(11, 13)) - 12
                    : parseInt(exam?.startDate?.slice(11, 13)) === 0
                    ? "12"
                    : parseInt(exam?.startDate?.slice(11, 13))
                }:${exam?.startDate?.slice(14, 16)} ${
                  parseInt(exam?.startDate?.slice(11, 13)) >= 12 ? "PM" : "AM"
                }`}
              </time>
            )}
          </div>
          <div className="col-span-1 flex gap-2">
            <span className="text-active font-poppins ">End Time :</span>
            {loading ? (
              <Skeleton variant="text" height={30} width={100} />
            ) : (
              <time className="text-gray-600 ">
                {"(" + exam?.endDate?.slice(0, 10) + ")"}{" "}
                {`${
                  parseInt(exam?.endDate?.slice(11, 13)) > 12
                    ? parseInt(exam?.endDate?.slice(11, 13)) - 12
                    : parseInt(exam?.endDate?.slice(11, 13)) === 0
                    ? "12"
                    : parseInt(exam?.endDate?.slice(11, 13))
                }:${exam?.endDate?.slice(14, 16)} ${
                  parseInt(exam?.endDate?.slice(11, 13)) >= 12 ? "PM" : "AM"
                }`}
              </time>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 py-4">
          {/* <p className="text-active font-poppins">
            Date :
            <time className="text-gray-600  ">
              {exam?.startDate?.slice(0, 10)}{" "}
            </time>
          </p> */}
          <div className="col-span-1 flex gap-2">
            <span className="text-active font-poppins ">Duration :</span>
            {loading ? (
              <Skeleton variant="text" height={30} width={100} />
            ) : (
              <span className="text-gray-600">{exam?.duration}</span>
            )}
          </div>
          <div className="col-span-1 flex gap-2">
            <span className="text-active font-poppins ">Points :</span>
            {loading ? (
              <Skeleton variant="text" height={30} width={100} />
            ) : (
              <span className="text-gray-600">{exam?.score}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {loading && (
          <>
            <Skeleton variant="text" height={30} width={500} />
            <Skeleton variant="text" height={20} width={200} />
            <Skeleton variant="text" height={20} width={200} />
            <Skeleton variant="text" height={20} width={200} />
            <Skeleton variant="text" height={20} width={200} />
          </>
        )}
        {questions?.length > 0
          ? !loading &&
            questions?.map((question, index) =>
              role === "teacher" ? (
                <QuestionCard
                  key={question._id ? question._id : question.id}
                  question={question}
                  index={index}
                  fetchExam={fetchExam}
                  status ={exam?.status}
                />
              ) : (
                <StudentQuestionCard
                  key={question._id ? question._id : question.id}
                  question={question}
                  index={index}
                  examId={id}
                />
              )
            )
          : !loading && (
              <div className="center w-full h-full">
                <h3 className="text-gray-500">No questions available</h3>
              </div>
            )}
      </div>
      {!loading && (
        <div className="bg-white w-full rounded-xl p-5 px-6">
          {role === "teacher" ? (
            <>
              <h3 className="text-gray-700 text-xl py-4">Do you want to...</h3>
              <div className="center gap-7 py-4">
                <button
                  className="bg-active border-2 border-active-br p-4 rounded-lg text-white"
                  onClick={handleGoToSelectQuestions}
                >
                  Choose From Question Bank ?
                </button>
                <span className="p-2 px-7 text-gray-600 text-lg">Or</span>
                <button
                  className="bg-active-bg  border-2 border-active-br p-4 2  rounded-lg text-active"
                  onClick={onAddOpen}
                >
                  Add New Question ?
                </button>
              </div>
              <AddQuestion isOpen={isAddOpen} onClose={onAddClose} id={id} />
            </>
          ) : (
            <div className="center flex-col pb-4 gap-3 ">
              {error && (
                <span className="text-red-700 p-1 bg-red-200 rounded-md px-2">
                  {error}
                </span>
              )}
              <button
                className="bg-active border-2 border-active-br p-4 px-8 rounded-lg text-white"
                onClick={submitAnswers}
                disabled={submitting}
              >
                {submitting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Submit Exam"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </TeacherExamsContainer>
  );
};
export default ExamDetails;
