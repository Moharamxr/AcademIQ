import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentSubmissionByAssessment } from "../../../../services/assessment.service";
import { CircularProgress, Skeleton } from "@mui/material";
import RadioBtn from "../../../../assets/icons/RadioBtn";

const TeacherExamsContainer = styled("div")({
  height: "100vh",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "0.75rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const StudentSubmissionPage = () => {
  const { id } = useParams();

  const [examData, setExamData] = useState({});
  const [submissionData, setSubmissionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudentSubmission = async () => {
    setLoading(true);
    try {
      const submissionResponse = await getStudentSubmissionByAssessment(
        id,
        localStorage.getItem("userId")
      );
      setExamData(submissionResponse?.submission?.assessment);
      setSubmissionData(submissionResponse?.submission?.submissionData);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to fetch submission data"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentSubmission();
  }, []);

  return (
    <TeacherExamsContainer className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <div className="bg-white w-full rounded-xl p-5 pb-0 border-b-2 rounded-b-none px-6">
            <h2 className="font-poppins text-2xl font-medium">
              {examData?.title || "Exam Title"}
            </h2>
            <div className="grid grid-cols-3 py-4">
              <div className="col-span-1 flex gap-2">
                <span className="text-active font-poppins ">Start Time :</span>
                <time className="text-gray-600 ">
                  {"(" + examData?.startDate?.slice(0, 10) + ")"}{" "}
                  {`${
                    parseInt(examData?.startDate?.slice(11, 13)) > 12
                      ? parseInt(examData?.startDate?.slice(11, 13)) - 12
                      : parseInt(examData?.startDate?.slice(11, 13)) === 0
                      ? "12"
                      : parseInt(examData?.startDate?.slice(11, 13))
                  }:${examData?.startDate?.slice(14, 16)} ${
                    parseInt(examData?.startDate?.slice(11, 13)) >= 12
                      ? "PM"
                      : "AM"
                  }`}
                </time>
              </div>
              <div className="col-span-1 flex gap-2">
                <span className="text-active font-poppins ">End Time :</span>
                <time className="text-gray-600 ">
                  {"(" + examData?.endDate?.slice(0, 10) + ")"}{" "}
                  {`${
                    parseInt(examData?.endDate?.slice(11, 13)) > 12
                      ? parseInt(examData?.endDate?.slice(11, 13)) - 12
                      : parseInt(examData?.endDate?.slice(11, 13)) === 0
                      ? "12"
                      : parseInt(examData?.endDate?.slice(11, 13))
                  }:${examData?.endDate?.slice(14, 16)} ${
                    parseInt(examData?.endDate?.slice(11, 13)) >= 12
                      ? "PM"
                      : "AM"
                  }`}
                </time>
              </div>
            </div>
            <div className="grid grid-cols-3 py-4">
              <div className="col-span-1 flex gap-2">
                <span className="text-active font-poppins ">Duration :</span>
                <span className="text-gray-600">{examData?.duration}</span>
              </div>
              <div className="col-span-1 flex gap-2">
                <span className="text-active font-poppins ">Points :</span>
                <span className="text-gray-600">{examData?.score}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 px-10">
            {submissionData?.answeredQuestions?.length > 0 ? (
              submissionData?.answeredQuestions.map(
                (answeredQuestion, index) => (
                  <div
                    className="w-full border-b-2 pb-5"
                    key={answeredQuestion._id}
                  >
                    <div className="between">
                      <div className="flex gap-1">
                        <span className="font-medium text-lg">
                          {index + 1}){" "}
                          {
                            answeredQuestion?.answeredQuestionData?.question
                              ?.text
                          }
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({answeredQuestion?.answeredQuestionData?.points}{" "}
                        points)
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 pt-4 ps-4">
                      {answeredQuestion?.answeredQuestionData?.question?.options?.map(
                        (option) => (
                          <div className="flex gap-3" key={option._id}>
                            {option.isCorrect ? (
                              <RadioBtn color={"rgb(34 197 94)"} />
                            ) : option._id ===
                              answeredQuestion?.answer?.selectedOption ? (
                              answeredQuestion?.answer?.status === "correct" ? (
                                <RadioBtn color={"rgb(34 197 94)"} />
                              ) : (
                                <RadioBtn color={"rgb(220 38 38)"} />
                              )
                            ) : (
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="10"
                                  cy="10.5"
                                  r="9"
                                  stroke="#00769E"
                                  strokeWidth="2"
                                />
                              </svg>
                            )}
                            <span>{option?.text}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="center w-full h-full">
                <h3 className="text-gray-500">
                  No answered questions available
                </h3>
              </div>
            )}
          </div>
        </>
      )}
    </TeacherExamsContainer>
  );
};

export default StudentSubmissionPage;
