import React, { useEffect, useState } from "react";
import AddPostIcon from "../../../assets/icons/AddPostIcon";
import AssignmentsCard from "./AssignmentsCard";
import { getAssessmentByCourse } from "../../../services/assessment.service";
import { useParams } from "react-router-dom";
import SkeletonPostCard from "../Posts/SkeletonPostCard";
import AddNewAssignment from "../../Assignments/AddNewAssignment";

const CourseAssignments = () => {
  const role = localStorage.getItem("role");
  const { id } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const data = await getAssessmentByCourse(id, "assignment");
      setAssignments(data?.assessments);
    } catch (error) {
      // console.error("Error fetching assignments: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="center flex-col  gap-5 w-full pb-5 px-6">
      {role === "teacher" && (
        <div className="border-2 border-gray-200/70 rounded-xl  flex gap-4 w-full ">
          <AddNewAssignment fetchAssignments={fetchAssignments} />

          <p className="font-medium text-gray-700 pt-4 text-lg leading-7">
            Add new assignment
          </p>
        </div>
      )}
      {isLoading && <SkeletonPostCard />}
      {assignments.length > 0
        ? !isLoading &&
          assignments.map((assignment) => (
            <AssignmentsCard
              key={assignment?._id}
              assignment={assignment}
              fetchAssignments={fetchAssignments}
            />
          ))
        : !isLoading && (
            <p className="text-center text-lg font-poppins text-gray-400">
              No Assignments
            </p>
          )}
    </div>
  );
};

export default CourseAssignments;
