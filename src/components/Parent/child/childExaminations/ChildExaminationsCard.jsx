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
      month: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="bg-gray-100 rounded-lg px-2 between py-2 gap-x-10">
      <div className="flex items-center gap-x-5 w-full px-1">
        <span>
          <DoneIcon color={"true"} />
        </span>
        <div className="flex flex-col w-full gap-y-1">
          <span className="font-poppins text-base">Examinations</span>
          <span className="font-poppins text-gray-400">
            {assessment?.title}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 text-end w-20">
        <time className="font-poppins">{formatDate(assessment?.date)}</time>
        <time className="text-green-400 font-poppins">15/12</time>
      </div>
    </div>
  );
};

export default ChildExaminationsCard;
