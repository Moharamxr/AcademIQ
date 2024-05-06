import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssessmentById } from "../../../../services/assessment.service";
import QuestionCard from "./QuestionCard";
import { Skeleton } from "@mui/material";
import AddQuestion from "../examCreation/AddQuestion";

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`;
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: white;
`;

const TeacherExamsContainer = styled("div")({
  maxHeight: "52rem",
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

  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddClose = () => setIsAddOpen(false);
  const onAddOpen = () => setIsAddOpen(true);

  const navigate = useNavigate();

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchExam = async () => {
    setLoading(true);
    try {
      const examData = await getAssessmentById(id);
      setExam(examData?.assessment);
      setQuestions(examData?.assessment?.questions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exam: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);
  const handleGoToSelectQuestions = () => {
    navigate(`/exams/create/${id}/select-questions`);
  };

  return (
    <TeacherExamsContainer>
      <FixedTopContent className="bg-white w-full rounded-xl p-5 pb-0 border-b-2 rounded-b-none px-6">
        <h2 className="font-poppins text-2xl font-medium">
          {exam?.title ? exam?.title : "Exam Title"}{" "}
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
      </FixedTopContent>

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
        {questions?.length > 0 ? (
          <>
            <h5 className="font-poppins text-lg font-medium">Mcq</h5>

            {!loading &&
              questions?.map((question,index) => (
                <QuestionCard question={question} key={question._id}index={index} />
              ))}
          </>
        ) : (
          !loading && (
            <div className="center w-full h-full">
              <h3 className="text-gray-500">No questions available</h3>
            </div>
          )
        )}
      </div>
      <FixedBottomContent className="bg-white w-full rounded-xl p-5 px-6">
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
      </FixedBottomContent>
    </TeacherExamsContainer>
  );
};
export default ExamDetails;