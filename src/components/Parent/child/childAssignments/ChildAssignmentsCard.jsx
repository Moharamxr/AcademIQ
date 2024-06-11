import React from "react";
import DoneIcon from "../../../../assets/icons/DoneIcon";

const ChildAssignmentsCard = ({ assignment }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="bg-active-bg rounded-lg shadow-md p-4 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {assignment.status === "published" && (
            <span className="text-green-500">
              <DoneIcon color={true} />
            </span>
          )}
          <div>
            <span className="block text-xl font-bold">{assignment.title}</span>
            <span className="block text-sm text-gray-500">
              {assignment.description}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span
            className={`text-sm font-medium ${
              assignment.status === "published"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {assignment.status}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Start Date:</span>
          <span className="font-medium">
            {formatDate(assignment.startDate)}
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">End Date:</span>
          <span className="font-medium">{formatDate(assignment.endDate)}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Duration:</span>
          <span className="font-medium">{assignment.duration} mins</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Score:</span>
          <span className="font-medium">{assignment.score}</span>
        </div>
      </div>
    </div>
  );
};

export default ChildAssignmentsCard;
