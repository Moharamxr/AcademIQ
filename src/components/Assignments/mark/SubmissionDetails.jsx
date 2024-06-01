import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSubmissionById } from "../../../services/assessment.service";

const SubmissionDetails = () => {
  const selectedSubmission = useSelector(
    (state) => state.assignmentData.selectedAssignmentSubmission
  );

  const [submission, setSubmission] = useState(selectedSubmission);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [fullScore, setFullScore] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      setLoading(true);
      try {
        const data = await getSubmissionById(selectedSubmission?._id);
        setSubmission(data?.submission || {});
        setNewScore(data?.submission?.score || "");
        setFullScore(data?.submission?.fullScore || "");
      } catch (error) {
        setError("Failed to fetch submission details");
        setTimeout(() => {
          setError(null);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [selectedSubmission?._id]);

  const handleScoreChange = (event) => {
    setNewScore(event.target.value);
  };

  const handleFullScoreChange = (event) => {
    setFullScore(event.target.value);
  };

  const handleSubmitScore = async () => {
    // Your logic for submitting the new score
    // For example, you can call an API to update the score
    console.log("New Score:", newScore);
  };

  if (!selectedSubmission?._id) {
    return (
      <div className="bg-white p-5 rounded-lg min-h-[30rem] center">
        <p className="text-gray-600">Select a submission to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Submission Details</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <p className="mb-2">
            <span className="font-semibold">Started At:</span>{" "}
            {new Date(submission.startedAt).toLocaleString()}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Submitted At:</span>{" "}
            {new Date(submission.submittedAt).toLocaleString()}
          </p>
          <div className="mb-2">
            <span className="font-semibold">Score:</span>{" "}
            {submission.score !== null ? (
              submission.score
            ) : (
              <input
                type="number"
                value={newScore}
                onChange={handleScoreChange}
                className="border rounded px-2 py-1"
              />
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Full Score:</span> {fullScore}
          </div>
          <div>
            <p className="font-semibold mb-2">Answers:</p>
            <div className="flex flex-wrap gap-5">
              {submission?.answers?.map((answer) =>
                answer.type.includes("image") ? (
                  <img
                    src={answer.url}
                    alt={answer.title}
                    className="mb-2 rounded-lg w-60 h-40 object-cover"
                    key={answer._id}
                  />
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg" key={answer._id}>
                    <p className="font-semibold">{answer.title}</p>
                    <p className="text-gray-500">Type: {answer.type}</p>
                    <p className="text-gray-500">
                      Upload Date:{" "}
                      {new Date(answer.uploadDate).toLocaleString()}
                    </p>
                    <a
                      href={answer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-active underline"
                    >
                      View Answer
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
          {submission.score === null && (
            <button
              onClick={handleSubmitScore}
              className="bg-active text-white px-4 py-2 rounded-lg mt-4"
            >
              Submit Score
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionDetails;
