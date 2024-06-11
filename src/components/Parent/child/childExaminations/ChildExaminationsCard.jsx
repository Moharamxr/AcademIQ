import React from "react";
import DoneIcon from "../../../../assets/icons/DoneIcon";

const ChildExaminationsCard = ({ assessment }) => {
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
          {assessment.status === "published" && (
            <span className="text-green-500">
              <DoneIcon color={true} />
            </span>
          )}
          <div>
            <span className="block text-xl font-bold">{assessment.title}</span>
            <span className="block text-sm text-gray-500">{assessment.description}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span className={`text-sm font-medium ${assessment.status === "published" ? "text-green-600" : "text-gray-600"}`}>
            {assessment.status}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Start Date:</span>
          <span className="font-medium">{formatDate(assessment.startDate)}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">End Date:</span>
          <span className="font-medium">{formatDate(assessment.endDate)}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Duration:</span>
          <span className="font-medium">{assessment.duration} mins</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-500">Score:</span>
          <span className="font-medium">{assessment.score}</span>
        </div>
      </div>
    </div>
  );
};

export default ChildExaminationsCard;
