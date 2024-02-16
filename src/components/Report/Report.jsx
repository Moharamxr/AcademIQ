import React from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";

const Report = () => {
  return (
    <div className="container flex gap-x-4">
      <ReportList/>
      <ReportNewMessage/>
    </div>
  );
};

export default Report;
