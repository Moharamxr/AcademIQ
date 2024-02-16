import React from 'react'
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import LeaderStudent1 from "../../../assets/leader (1).png";
import LeaderStudent2 from "../../../assets/leader (2).png";
import LeaderStudent3 from "../../../assets/leader (3).png";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
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

const LeaderCard = () => {
  return (
    <div className="between">
    <div className="flex items-center">
      <div className="bg-red-600 text-white rounded-full h-7 w-7  text-center m-1">
        1
      </div>
      <div className="flex w-96">
        <img
          className="w-12 m-3"
          src={LeaderStudent1}
          alt="LeaderStudent1"
        />
        <div className="flex flex-col w-full">
          <p className="font-poppins font-medium text-base leading-6 py-2">
            Ahmed Khaled
          </p>
          <div className="flex-grow">
            <BorderLinearProgress variant="determinate" value={50} />
          </div>
          <div className="flex gap-x-3">
            <p class="font-poppins font-light text-xs leading-6 text-gray-600">
              37 lessons
            </p>
            <p class="font-poppins font-light text-xs leading-6 text-gray-600">
              2 quizzes
            </p>
            <p class="font-poppins font-light text-xs leading-6 text-gray-600">
              4 assignments
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="font-poppins font-medium text-xs leading-6 text-black pb-10">
      (405 points)
    </p>
  </div>
  )
}

export default LeaderCard