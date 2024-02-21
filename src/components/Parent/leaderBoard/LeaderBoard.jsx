import React from "react";
import { styled } from "@mui/material/styles";
import LeaderCard from "./LeaderCard";

const LeaderBoardContainer = styled('div')({
  height: '23rem', // Adjust the height as needed
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0',
    background: 'transparent',
  },
});

const LeaderBoard = () => {
  return (
    <LeaderBoardContainer className="bg-white rounded-2xl p-4 overflow-hidden ">
      <h3 className="font-poppins font-medium text-2xl leading-10 pt-0 text-black bg-white">
        Six grade Leaderboard
      </h3>
      <LeaderCard />
      <LeaderCard />
     
      
      <LeaderCard />
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
 