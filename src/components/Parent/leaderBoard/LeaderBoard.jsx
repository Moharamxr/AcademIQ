import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LeaderCard from "./LeaderCard";
import { getGradeClassStudents } from "../../../services/gradClass.service";
import SkeletonLeaderBoard from "./SkeletonLeaderBoard";

const LeaderBoardContainer = styled("div")({
  height: "22rem",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const gradeClassId = localStorage.getItem("gradeClassId");

  const fetchLeaders = async () => {
    if (!gradeClassId || gradeClassId === "undefined") {
      return;
    }
    setIsLoading(true);
    try {
      const data = await getGradeClassStudents(gradeClassId, true);
      setLeaders(data.students);
    } catch (error) {
      console.error("Error fetching leaders: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, [gradeClassId]);
  return (
    <LeaderBoardContainer className="bg-white rounded-2xl p-4 overflow-hidden ">
      <h3 className="font-poppins font-medium text-2xl leading-10 pt-0 text-black bg-white">
        Leader board
      </h3>
      {!isLoading ? (
        leaders.map((stu, index) => (
          <LeaderCard key={index} student={stu} index={index} />
        ))
      ) : (
        <div className="flex flex-col gap-6 mt-5">
          <SkeletonLeaderBoard />
          <SkeletonLeaderBoard />
          <SkeletonLeaderBoard />
        </div>
      )}
      {leaders.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 mt-5">
          No students in this class
        </div>
      )}
    </LeaderBoardContainer>
  );
};

export default LeaderBoard;
