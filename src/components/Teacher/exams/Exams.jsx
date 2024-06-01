import { LinearProgress, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSubmission,
  getStartedSubmission,
} from "../../../services/assessment.service";

const Exams = ({ exams, isLoading }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [submitting, setSubmitting] = useState(false);
  const [loadingExam, setLoadingExam] = useState("");

  const handleGoto = async (id, status) => {
    if (
      role === "student" &&
      status !== "published" 
    ) {
      console.log("Student can't access this exam");
      return;
    }
    if (status === "draft") {
      navigate(`/exams/create/${id}`);
    } else {
      if (role === "student" && status === "published") {
        try {
          setSubmitting(true);
          setLoadingExam(id);
          await getStartedSubmission(id);
        } catch (error) {
          if (error.response.status !== 404) return;
          setSubmitting(true);
          await createSubmission(id);
          console.log("Submission created");
          localStorage.setItem("examStartDate", new Date());
        }
      }
      setSubmitting(false);

      navigate(`/exams/details/${id}`);
    }
  };

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
            {!submitting && loadingExam !== exam._id ? (
              <>
                <p>
                  {exam?.title}{" "}
                  {exam?.status === "draft" && index + 1 + " " + "(Draft)"}
                  {exam?.status !== "draft" && (
                    <time className="text-sm text-gray-500 ps-2">
                      {`(${exam?.startDate?.slice(0, 10)})` +
                        " to " +
                        `(${exam?.endDate?.slice(0, 10)})`}
                    </time>
                  )}
                </p>
                {exam?.questions && (
                  <span className="text-sm text-gray-500">
                    {exam?.questions?.length + " questions"}
                  </span>
                )}
              </>
            ) : (
              <LinearProgress
                variant="buffer"
                value={0}
                valueBuffer={0}
                className="w-full py-2"
              />
            )}
          </div>
        ))
      ) : (
        <div className="center w-full h-full">
          {!isLoading && (
            <h3 className="text-gray-500">No exams created yet</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Exams;
