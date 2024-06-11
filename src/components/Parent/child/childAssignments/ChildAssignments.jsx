import React, { useEffect, useState } from "react";
import ChildAssignmentsCard from "./ChildAssignmentsCard";
import { getAssessmentByStatus } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ChildAssignments = () => {
  const { childID } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAssignments = async () => {
    setLoading(true);
    try {
      const data = await getAssessmentByStatus(false, childID, "assignment");
      setAssignments(data?.assessments);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssignments();
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
      {assignments?.length > 0 ? (
        assignments.map((assignment) => (
          <ChildAssignmentsCard key={assignment?._id} assignment={assignment} />
        ))
      ) : (
        <p className="text-gray-400 text-center pt-3">No Assignments yet!</p>
      )}
    </div>
  );
};

export default ChildAssignments;
