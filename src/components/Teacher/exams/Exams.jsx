import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Exams = ({ exams, isLoading }) => {
  const navigate = useNavigate();
  const handleGoto = (id,status) => {
    if(status === "draft"){
      navigate(`/exams/create/${id}`);
    } else {
      navigate(`/exams/details/${id}`);
    }
  }
    
    return (
    <div className="flex flex-col px-5 w-full  gap-4 h-full">
      {isLoading && <Skeleton variant="rounded" height={50} />}
      {!isLoading && exams?.length > 0 ? (
        exams.map((exam, index) => (
          <div
            key={exam._id}
            className=" between border-gray-300 border-[1px] rounded-lg p-3 cursor-pointer hover:bg-gray-100/70"
            onClick={() => handleGoto(exam._id, exam.status)}
          >
            <p>
              {exam?.title} {exam?.status === "draft" && (index+1)+" "+'(Draft)'}
              {exam?.status !== "draft" &&<time className="text-sm text-gray-500 ps-2">
                {`(${exam?.startDate?.slice(0, 10)})` +
                  " to " +
                  `(${exam?.endDate?.slice(0, 10)})`}
              </time>}
            </p>
            <span className="text-sm text-gray-500">
              {exam?.questions?.length} questions
            </span>
          </div>
        ))
      ) : (
        <div className="center w-full h-full">
          {!isLoading&&<h3 className="text-gray-500">No exams created yet</h3>}
        </div>
      )}
    </div>
  );
};

export default Exams;
