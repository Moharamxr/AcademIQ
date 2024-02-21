import React, { useState } from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";
import ParentTimeTable from "../Layout/timeTables/parentTimeTable/ParentTimeTable";

const Report = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 lg:ps-4 me-2 pb-4">
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <ReportList />
          <ReportMessages />
          {/* <ReportNewMessage/> */}
        </div>
      </div>
      <div className="w-full lg:w-4/12 ms-2 hidden md:block">
        <ParentTimeTable />
      </div>
    </>
  );
};

export default Report;
