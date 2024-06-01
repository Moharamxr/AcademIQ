import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createSubmission,
  getAssessmentById,
  submitExamAnswers,
} from "../../services/assessment.service";
import { CircularProgress, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const selectedAssignment = useSelector(
    (state) => state.assignmentData.selectedAssignment
  );

  const [assignment, setAssignment] = useState(selectedAssignment);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentById = async (id) => {
      setLoading(true);
      try {
        const data = await getAssessmentById(id);
        setAssignment(data?.assessment);
      } catch (error) {
        setError("Failed to fetch assignment details");
        setTimeout(() => {
          setError(null);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    if (selectedAssignment?._id) {
      fetchAssignmentById(selectedAssignment._id);
    }
  }, [selectedAssignment]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const isValid = () => {
    if (files.length === 0) {
      setError("Please select a file");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("answers", file));

    try {
      await createSubmission(assignment._id);
      await submitExamAnswers(assignment._id, formData);
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGotoMark = () => {
    navigate(`/assignments/mark/${selectedAssignment._id}`);
  };

  if (!selectedAssignment?._id && !loading) {
    return (
      <div className="bg-white p-5 rounded-xl min-h-[38rem] center">
        <p className="text-gray-600">Select an assignment to view details</p>
      </div>
    );
  }

  const renderSkeletons = () => (
    <>
      <Skeleton variant="text" height={30} width="60%" />
      <Skeleton variant="text" height={20} width="40%" />
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="rectangular" height={100} />
    </>
  );

  const renderAssignmentDetails = () => (
    <div className="p-3 flex flex-col">
      <div className="between">
        <h5 className="font-poppins font-medium text-lg leading-10 text-active">
          {assignment?.title}
        </h5>
        {error && (
          <div className="font-semibold bg-red-50 p-1 text-red-500 text-center rounded-lg my-2">
            {error}
          </div>
        )}
        <p className="font-poppins font-light text-sm leading-10 text-green-400">
          {assignment?.score} Points
        </p>
      </div>
      <div className="py-2">
        <p>Description</p>
        <p className="font-poppins font-light text-sm leading-10 text-gray-400">
          {assignment?.description}
        </p>
      </div>
      <hr />
      <div className="py-2">
        <p>Deadline</p>
        <time className="font-poppins font-light text-sm leading-10 text-gray-400">
          {assignment?.endDate?.slice(0, 10) +
            " (" +
            new Date(assignment.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            ")"}
        </time>
      </div>
      <hr />
      <div className="py-2">
        <p>Materials</p>
        <div className="py-2 flex flex-wrap gap-3">
          {assignment?.materials?.length > 0 ? (
            assignment.materials.map((material) => (
              <img
                src={material.url}
                alt="Material"
                className=" h-32 rounded"
                key={material._id}
              />
            ))
          ) : (
            <p className="font-poppins font-light text-sm leading-10 text-gray-400">
              No materials available
            </p>
          )}
        </div>
      </div>
      {assignment?.status === "published" &&
        localStorage.getItem("role") === "student" && (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="assignmentAns">Attachment*</label>
              <input
                type="file"
                name="assignmentAns"
                id="assignmentAns"
                className="w-full h-14 py-3 px-2 cursor-pointer outline-none bg-gray-100 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
                multiple
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="assignmentComment">Add Comment (Optional)</label>
              <textarea
                type="text"
                name="assignmentComment"
                id="assignmentComment"
                value={comment}
                onChange={handleCommentChange}
                className="w-full h-20 outline-none bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-active text-white rounded-lg text-center text-lg w-full py-2 my-4"
            >
              {isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      {localStorage.getItem("role") === "teacher" &&
        assignment.status === "completed" && (
          <div className="center justify-end ">
            <button
              className="w-1/3 bg-active rounded-lg text-white py-3"
              onClick={handleGotoMark}
            >
              Mark Assignment
            </button>
          </div>
        )}
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl">
      <h3 className="font-poppins font-normal text-2xl leading-10 text-gray-700">
        Assignment Details
      </h3>
      {loading ? renderSkeletons() : renderAssignmentDetails()}
    </div>
  );
};

export default AssignmentDetails;
