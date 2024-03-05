import React from "react";
import Announcements from "../announcements/Announcements";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Parent = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 ">
        <Announcements />
        <LeaderBoard />
      </div>
      <div className="w-full lg:w-4/12 ">
        <ParentTimeTable />
      </div>
    </>
  );
};

export default Parent;
