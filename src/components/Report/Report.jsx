import React, { useState } from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";
import ParentTimeTable from "../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Report = () => {
  return (
    <>
      <main className="w-full lg:w-8/12 ">
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <ReportList />
          <ReportMessages />
          {/* <ReportNewMessage/> */}
        </div>
      </main>
      <aside className="w-full lg:w-4/12 hidden md:block">
        <ParentTimeTable />
      </aside>
    </>
  );
};

export default Report;
