import React from "react";
import SubmissionList from "./SubmissionList";
import SubmissionDetails from "./SubmissionDetails";
import { useSelector } from "react-redux";

const MarkAssignments = () => {
  const selectedSubmission = useSelector(
    (state) => state.assignmentData.selectedAssignmentSubmission
  );
  return (
    <>
      <div className="w-full lg:w-8/12 flex flex-col gap-3">
        <SubmissionDetails />
      </div>
      <aside className="w-full lg:w-4/12  hidden md:block">
        <SubmissionList />
      </aside>
    </>
  );
};

export default MarkAssignments;
