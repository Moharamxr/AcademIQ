import React from "react";
import ReportList from "./ReportList";
import ReportMessages from "./ReportMessages";
import ReportNewMessage from "./ReportNewMessage";
import { useSelector } from "react-redux";

const Report = () => {
  const toggleNewMessage = useSelector((state) => state.reportsData.toggleNewMessage);
  console.log(toggleNewMessage);

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <ReportList />
      {toggleNewMessage ? (
        <ReportNewMessage />
      ) : (
        <ReportMessages />
      )}
    </div>
  );
};

export default Report;
