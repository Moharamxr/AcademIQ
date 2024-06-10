import React from "react";
import Announcements from "../../Layout/announcements/Announcements";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import TimeTable from "../../Layout/timeTables/TimeTable";

const StudentParentHome = () => {
  const role = localStorage.getItem("role");

  return (
    <>
      <div
        className={`w-full ${role !== "parent" ? "lg:w-8/12" : ""}`}
      >
        <Announcements />
        <LeaderBoard />
      </div>
      {role === "student" && (
        <aside className="w-full lg:w-4/12">
          <TimeTable />
        </aside>
      )}
    </>
  );
};

export default StudentParentHome;
