import React from "react";
import DoneIcon from "../../../../assets/icons/DoneIcon";
import styled from "@emotion/styled";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  width: '100%',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'lightgray',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "rgba(38, 200, 120, 1)",
  },
}));

const ChildAssignmentsCard = ({ assignment }) => {
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
          <span className="font-poppins text-base">{assignment?.subject}</span>
          <span className="font-poppins text-xs">{assignment?.title}</span>
          <span className="between gap-x-7">
            <BorderLinearProgress variant="determinate" value={assignment?.progress || 0} />
            <span>{assignment?.progress}%</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <time className="font-poppins">{formatDate(assignment?.dueDate)}</time>
        <select className="bg-transparent outline-none">
          <option value="see more">See more</option>
        </select>
      </div>
    </div>
  );
};

export default ChildAssignmentsCard;
