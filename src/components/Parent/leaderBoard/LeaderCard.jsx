import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import LeaderStudent1 from "../../../assets/leader (1).png";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: "100%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(0, 118, 158, 1)" : "#308fe8",
  },
}));

const LeaderCard = ({ student, index }) => {
  return (
    <div className="between">
      <div className="flex items-center">
        <div className="bg-red-600 text-white rounded-full h-7 w-7  text-center m-1">
          {index + 1}
        </div>
        <div className="flex w-96">
          {student?.profilePicture?.url ? (
            <img
              className="w-12 m-3"
              src={student?.profilePicture?.url}
              alt="LeaderStudent1"
            />
          ) : (
            <div
              className={`w-14 m-3 p-3  rounded-full text-white text-2xl center`}
              style={{ backgroundColor: student?.profilePicture?.color }}
            >
              {student?.name?.first[0].toUpperCase()}
              {student?.name?.last[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col w-full">
            <p className="font-poppins font-medium text-base leading-6 py-2">
              {student?.name?.first} {student?.name?.last}
            </p>
            <div className="flex-grow md:w-full w-48">
              <BorderLinearProgress
                variant="determinate"
                value={(student?.points / 1000) * 100}
              />
            </div>
            {/* <div className="flex gap-x-3">
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              37 lessons
            </p>
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              2 quizzes
            </p>
            <p className="font-poppins font-light text-xs leading-6 text-gray-600">
              4 assignments
            </p>
          </div> */}
          </div>
        </div>
      </div>
      <p className="font-poppins font-medium text-xs leading-6 text-black pb-10">
        ({student?.points} points)
      </p>
    </div>
  );
};

export default LeaderCard;
