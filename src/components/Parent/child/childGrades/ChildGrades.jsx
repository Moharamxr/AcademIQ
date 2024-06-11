import React, { useEffect, useState } from "react";
import { getSubmissionsByStudent } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ChildGrades = () => {
  const { childID } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGrades = async () => {
    setLoading(true);
    try {
      const data = await getSubmissionsByStudent(childID);
        setGrades(data?.submissions); 
      
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGrades();
  }, [childID]);

  if (loading) {
    return (
      <>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-medium">
        Error: {error?.message || "Unknown error occurred"}
      </div>
    );
  }

  if (grades.length === 0) {
    return (
      <div className="text-center text-gray-400 pt-5">No grades found.</div>
    );
  }

  return (
    <div className="flex flex-col pb-2 w-full bg-white">
      {grades.map((submission) => (
        <div key={submission.assessment.id} className="bg-active-bg p-4 rounded-lg shadow-md my-4">
          <div className="flex flex-col">
            <p className="font-bold text-lg text-gray-800">{submission.assessment.title}</p>
            <div className="flex flex-row justify-between mt-2">
              <p className="text-sm text-gray-600">Type: {submission.assessment.type}</p>
              <p className="text-sm text-gray-600">Status: {submission.assessment.status}</p>
            </div>
            <div className="flex flex-row justify-between mt-1">
              <p className="text-sm text-gray-600">Start Date: {new Date(submission.assessment.startDate).toLocaleDateString()}</p>
              {submission.submissionData.submittedAt && (
                <p className="text-sm text-gray-600">Submitted At: {new Date(submission.submissionData.submittedAt).toLocaleString()}</p>
              )}
            </div>
            <div className="flex flex-row justify-between mt-1">
              <p className="text-sm text-gray-600">Score: {submission.submissionData.score}</p>
              {submission.submissionData.fullScore && (
                <p className="text-sm text-gray-600">Full Score: {submission.submissionData.fullScore}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildGrades;
