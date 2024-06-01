import React from "react";
import {
  setIsSent,
  setSelectedReport,
  setToggleNewMessage,
} from "../../store/slices/reportsSlice";
import { useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";

const ReportListCard = ({ active, report, sent }) => {
  const dispatch = useDispatch();

  const handleSelectedReport = (report) => {
    dispatch(setSelectedReport({ report }));
    dispatch(setToggleNewMessage({ toggleNewMessage: false }));
    dispatch(setIsSent({ isSent: sent }));
  };

  const contact = sent ? report?.to : report?.from;
  function formatISODateToTime(isoDate) {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const createdAt = report?.createdAt
    ? formatISODateToTime(report.createdAt)
    : "No date available";
  return (
    <div
      className={`w-full cursor-pointer flex ${
        active
          ? "bg-blue-100/55 rounded-2xl"
          : "bg-white border-b-slate-400 border-opacity-20 border-b-2"
      } p-2 py-1 gap-2`}
      onClick={() => handleSelectedReport(report)}
    >
      <div className="w-full flex flex-col gap-1 p-3 overflow-hidden">
        <div className="between">
          <p className="font-poppins font-normal text">
            {contact?.name?.first} {contact?.name?.last}
            {contact?.role && (
              <span className="text-xs text-gray-400">
                {"  (" + contact?.role + ")"}
              </span>
            )}
          </p>
          <Badge
            color={`${report?.priority === "high" ? "error" : "primary"}`}
            style={{ zIndex: 0, marginTop: "0.5rem" }}
            variant="dot"
          >
            <time className="font-poppins text-[9.5px] pe-3 text-slate-500">
              {createdAt}
            </time>
          </Badge>
        </div>

        <p className="font-poppins font-medium text-sm text-slate-500 max-w-full  overflow-hidden">
          {report?.subject}
        </p>
        <p className="font-poppins font-normal text-xs text-slate-400 max-w-full max-h-4 overflow-hidden">
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
          {report?.body}
        </p>
      </div>
    </div>
  );
};

export default ReportListCard;
