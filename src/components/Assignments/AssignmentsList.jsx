import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssessmentByStatus } from "../../services/assessment.service";
import { setSelectedAssignment } from "../../store/slices/assignmentSlice";
import AddNewAssignment from "./AddNewAssignment";

const AssignmentsContainer = styled("div")({
  maxHeight: "75vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const AssignmentsList = () => {
  const [assignmentStatus, setAssignmentStatus] = useState("active");
  const dispatch = useDispatch();

  const selectedAssignment = useSelector(
    (state) => state.assignmentData.selectedAssignment
  );

  const [activeAssignments, setActiveAssignments] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);

  const [isAssignmentsLoading, setIsAssignmentsLoading] = useState(false);
  const [isAssignmentsError, setIsAssignmentsError] = useState(false);

  const fetchAssignments = async () => {
    setIsAssignmentsLoading(true);
    try {
      const data = await getAssessmentByStatus(null, null, "assignment");
      const assignmentsData = data?.assessments?.filter(
        (assignment) => assignment.type === "assignment"
      );
      const activeAssignments = assignmentsData.filter(
        (assignment) => assignment.status === "published"
      );
      const completedAssignments = assignmentsData.filter(
        (assignment) => assignment.status === "completed"
      );
      const upcomingAssignments = assignmentsData.filter(
        (assignment) => assignment.status === "pending"
      );

      setActiveAssignments(activeAssignments);
      setCompletedAssignments(completedAssignments);
      setUpcomingAssignments(upcomingAssignments);
    } catch (error) {
      setIsAssignmentsError(true);
      setTimeout(() => {
        setIsAssignmentsError(false);
      }, 3000);
    } finally {
      setIsAssignmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSelectAssignment = (assignment) => {
    if (
      localStorage.getItem("role") === "student" &&
      assignment.status === "pending"
    ) {
      return;
    }
    dispatch(setSelectedAssignment({ assignment }));
  };

  const renderLoading = () => {
    if (isAssignmentsLoading) {
      return (
        <>
          <Skeleton variant="rectangular" width="100%" height={80} />
          <Skeleton variant="rectangular" width="100%" height={80} />
          <Skeleton variant="rectangular" width="100%" height={80} />
          <Skeleton variant="rectangular" width="100%" height={80} />
        </>
      );
    }
  };

  const renderAssignments = () => {
    let assignmentsToRender = [];
    switch (assignmentStatus) {
      case "active":
        assignmentsToRender = activeAssignments;
        break;
      case "completed":
        assignmentsToRender = completedAssignments;
        break;
      case "upcoming":
        assignmentsToRender = upcomingAssignments;
        break;
      default:
        assignmentsToRender = activeAssignments;
    }

    if (assignmentsToRender.length === 0) {
      return <div className="text-gray-500 text-center w-full">No assignments available</div>;
    }

    return assignmentsToRender.map((assignment) => (
      <div
        key={assignment._id}
        className={`${
          selectedAssignment && selectedAssignment._id === assignment._id
            ? "bg-active-bg"
            : "bg-gray-100"
        } rounded-lg w-full p-2 cursor-pointer hover:bg-active-bg transition-colors duration-300 ease-in-out`}
        onClick={() => handleSelectAssignment(assignment)}
      >
        <div className="between">
          <p className="text-lg font-normal">{assignment.title} </p>
          <time className="text-xs ">
            {new Date(assignment.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
        <article className="text-gray-700">{assignment.description}</article>
      </div>
    ));
  };

  return (
    <AssignmentsContainer className="bg-white flex flex-col justify-center items-center p-3 pt-0 rounded-xl">
      <FixedTopContent className="bg-white py-3 w-full">
        <select
          value={assignmentStatus}
          onChange={(e) => setAssignmentStatus(e.target.value)}
          className="w-full outline-none border border-gray-200 rounded-lg h-12 text-xl p-2 ps-1 font-normal"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </FixedTopContent>

      <div className="flex flex-col py-2 gap-2 items-end w-full max-h-[40rem]">
        {isAssignmentsLoading
          ? renderLoading()
          : !isAssignmentsError && renderAssignments()}

        {localStorage.getItem("role") === "teacher" && (
          <AddNewAssignment fetchAssignments={fetchAssignments} />
        )}

        {isAssignmentsError && <div>Error loading assignments</div>}
      </div>
    </AssignmentsContainer>
  );
};

export default AssignmentsList;
