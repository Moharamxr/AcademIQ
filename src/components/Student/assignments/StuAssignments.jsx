import React from "react";
import AssignmentsDetails from "./AssignmentsDetails";
import AssignmentsList from "./AssignmentsList";

const StuAssignments = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 lg:ps-4  pb-4 flex flex-col gap-3">
        <AssignmentsDetails />
      </div>
      <div className="w-full lg:w-4/12  hidden md:block">
        <AssignmentsList />
      </div>
    </>
  );
};

export default StuAssignments;
