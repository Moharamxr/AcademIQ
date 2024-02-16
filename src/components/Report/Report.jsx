import React from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";

const Report = () => {
  return (
    <div className="container flex gap-x-4">
      <ReportList/>
      <ReportMessages/>
    </div>
  );
};

export default Report;
