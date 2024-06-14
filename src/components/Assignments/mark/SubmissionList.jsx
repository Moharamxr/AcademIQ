import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSubmissionsByAssessment, setSelectedAssignmentSubmission } from "../../../store/slices/assignmentSlice";
import Skeleton from "@mui/material/Skeleton";

const SubmissionList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)

  const { submissions, loading, error, selectedAssignmentSubmission } = useSelector(
    (state) => state.assignmentData
  );

  useEffect(() => {
    dispatch(fetchSubmissionsByAssessment({ id }));
  }, [id, dispatch]);

  const handleSelectSubmission = (submission) => {
    dispatch(setSelectedAssignmentSubmission({ submission }));
  };

  return (
    <div className="bg-white p-5 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from(new Array(5)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={40} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {submissions.map((submission) => (
            <div
              key={submission.student._id}
              className={
                "p-2 rounded-lg cursor-pointer hover:bg-active-bg transition" +
                (selectedAssignmentSubmission?._id === submission?.submission?._id
                  ? " bg-active-bg"
                  : "")
              }
              onClick={() => handleSelectSubmission(submission?.submission)}
            >
              <p>
                {submission.student.name.first} {submission.student.name.last}{" "}
                <span className="text-gray-400 text-xs">
                  {"(" + submission.student.userId + ")"}
                </span>
              </p>
              <p className="text-sm text-green-500 flex justify-between pt-2">
                {submission?.submission?.score !== null &&
                submission?.submission?.score !== undefined ? (
                  "Score: " + submission?.submission?.score
                ) : (
                  <span className="text-red-400 bg-red-50 rounded p-1">
                    Not graded
                  </span>
                )}
                <time className="text-xs text-gray-400 pt-2">
                  {new Date(submission.submission.startedAt).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </time>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionList;
