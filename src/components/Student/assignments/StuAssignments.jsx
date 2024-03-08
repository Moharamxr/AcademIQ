import React from "react";
import AssignmentsDetails from "./AssignmentsDetails";
import AssignmentsList from "./AssignmentsList";

const StuAssignments = () => {
  return (
    <>
      <main className="w-full lg:w-8/12 flex flex-col gap-3">
        <AssignmentsDetails />
      </main>
      <aside className="w-full lg:w-4/12  hidden md:block">
        <AssignmentsList />
      </aside>
    </>
  );
};

export default StuAssignments;
