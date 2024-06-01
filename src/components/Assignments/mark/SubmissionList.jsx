import React, { useState, useEffect } from "react";
import { getSubmissionByAssessment } from "../../../services/assessment.service";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAssignmentSubmission } from "../../../store/slices/assignmentSlice";
import { useParams } from "react-router-dom";

const SubmissionList = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const selectedSubmission = useSelector(
    (state) => state.assignmentData.selectedAssignmentSubmission
  );

  const handleSelectSubmission = (submission) => {
    dispatch(setSelectedAssignmentSubmission({ submission }));
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const data = await getSubmissionByAssessment(id);
        setSubmissions(data?.submissions?.studentsScores || []);
        if (data?.submissions?.studentsScores?.length > 0) {
          dispatch(
            setSelectedAssignmentSubmission({
              submission: data?.submissions?.studentsScores[0]?.submission,
            })
          );
        }
      } catch (error) {
        setError("Failed to fetch submissions");
        setTimeout(() => {
          setError(null);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [id]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {submissions.map((submission) => (
            <div
              key={submission.student._id}
              className={
                "p-2  rounded-lg cursor-pointer hover:bg-active-bg  transition" +
                (selectedSubmission?._id === submission?.submission?._id
                  ? " bg-active-bg"
                  : "")
              }
              onClick={() =>
                handleSelectSubmission(submission?.submission)
              }
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
                  <span className="text-red-400 bg-red-50 rounded p-1">Not graded</span>
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
