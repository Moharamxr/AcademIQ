import React, { useState } from "react";
import AddPostIcon from "../../../../assets/icons/AddPostIcon";
import AssignmentsCard from "./AssignmentsCard";
import SkeletonPostCard from "../Posts/SkeletonPostCard";

const CourseAssignments = ({ assignments, getCourseData, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    getCourseData();
  };
  const onOpen = () => setIsOpen(true);
  const role = localStorage.getItem("role");
  return (
    <div className="center flex-col  gap-5 w-full pb-5 px-6">
      {role === "teacher" && (
        <div className="border-2 border-gray-200/70 rounded-xl p-4 flex gap-4 w-full ">
          <AddPostIcon />
          <p className="font-poppins  text-gray-700 pt-1 text-lg leading-7">
            Add new assignment
          </p>
        </div>
      )}
      {isLoading && <SkeletonPostCard />}
      {assignments.length > 0 ? (
        !isLoading &&
        assignments.map((assignment, index) => (
          <AssignmentsCard
            key={index}
            assignment={assignment}
            getCourseData={getCourseData}
          />
        ))
      ) : (
        <p className="text-center text-lg font-poppins text-gray-400">
          No Assignments
        </p>
      )}

      {/* <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard />
      <AssignmentsCard /> */}
    </div>
  );
};

export default CourseAssignments;
