import React, { useEffect, useState } from "react";
import ChildExaminationsCard from "./ChildExaminationsCard";
import { BiLoader } from "react-icons/bi";
import { getAssessmentByStatus } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ChildExaminations = () => {
  const { childID } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAssessments = async () => {
    setLoading(true);
    try {
      const data = await getAssessmentByStatus(null, childID, 'exam');
      setAssessments(data?.assessments);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssessments();
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
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-2 gap-y-3 w-full">
      {assessments?.length > 0 ? (
        assessments.map((ass) => (
          <ChildExaminationsCard key={ass?._id} assessment={ass} />
        ))
      ) : (
        <p className="text-gray-400 text-center pt-3">No Exams yet!</p>
      )}
    </div>
  );
};

export default ChildExaminations;
