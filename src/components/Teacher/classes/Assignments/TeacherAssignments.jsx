import React from "react";
import AddPostIcon from "../../../../assets/icons/AddPostIcon";
import AssignmentsCard from "./AssignmentsCard";

const TeacherAssignments = () => {
  return (
    <div className="center flex-col  gap-5 w-full pb-5 px-6">
      <div className="border-2 border-gray-200/70 rounded-xl p-4 flex gap-4 w-full ">
        <AddPostIcon />
        <p className="font-poppins  text-gray-700 pt-1 text-lg leading-7">
          Add new assignment{" "}
        </p>
      </div>

      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
    </div>
  );
};

export default TeacherAssignments;
