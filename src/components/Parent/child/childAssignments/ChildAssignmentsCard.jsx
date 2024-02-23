import React from "react";
import DoneIcon from "../../../../assets/icons/DoneIcon";
import styled from "@emotion/styled";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  width : '100%',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'lightgray',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:"rgba(38, 200, 120, 1)",
  },
}));
const ChildAssignmentsCard = () => {
  return (
    <div className="bg-gray-100 rounded-lg px-2 between py-2 gap-x-10">
      <div className="flex items-center gap-x-5 w-full px-1">
        <span >
          <DoneIcon color={'true'}/>
        </span>
        <div className="flex flex-col w-full gap-y-">
          <span className="font-poppins text-base">Arabic</span>
          <span className="font-poppins text-xs">progress !</span>
          <span className="between gap-x-7"><BorderLinearProgress variant="determinate" value={50} /> <span>50%</span></span>
          
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <time className="font-poppins">12-5-2020</time>
        <select  className="bg-transparent outline-none"><option value="see more">see more</option></select>
      </div>
    </div>
  );
};

export default ChildAssignmentsCard;
