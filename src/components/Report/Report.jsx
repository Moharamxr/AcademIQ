import React, { useState } from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";

const Report = () => {
  
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <ReportList/>
      <ReportMessages/>
      {/* <ReportNewMessage/> */}
    </div>
  );
};

export default Report;
