import React from "react";
import Announcements from "../announcements/Announcements";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import ParentTimeTable from "../../Layout/timeTables/parentTimeTable/ParentTimeTable";

const StudentParentHome = () => {
  return (
    <>
      <div className="w-full  ">
        <Announcements />
        <LeaderBoard />
      </div>
      {/* <aside className="w-full lg:w-4/12 ">
        <ParentTimeTable />
      </aside> */}
    </>
  );
};

export default StudentParentHome;
