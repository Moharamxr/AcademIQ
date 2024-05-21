import React from "react";
import { setIsSent, setSelectedReport, setToggleNewMessage } from "../../store/slices/reportsSlice";
import { useDispatch } from "react-redux";

const ReportListCard = ({ active, report ,sent }) => {

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

  const createdAt = report?.createdAt ? formatISODateToTime(report.createdAt) : "No date available";
  return (
    <div
      className={`w-full cursor-pointer flex ${
        active
          ? "bg-blue-100/55 rounded-2xl"
          : "bg-white border-b-slate-400 border-opacity-20 border-b-2"
      } p-2 py-1 gap-2 `}
      onClick={() => handleSelectedReport(report)}
    >
      <div className="w-full flex flex-col gap-1 p-3 overflow-hidden">
        <div className="between">
          <p className="font-poppins font-normal text-sm">
            {contact?.name?.first} {contact?.name?.last} 
            
            {/* {report?.role && (
              <span className="text-xs text-gray-400">
                {"(" + report?.role + ")"}
              </span>
            )} */}
          </p>

          <time className="font-poppins text-[9.5px] text-slate-500">
            {createdAt}
          </time>
        </div>

        <p className="font-poppins font-normal text-xs text-slate-400 max-w-full max-h-4 overflow-hidden">
          {report?.subject}
        </p>
      </div>
    </div>
  );
};

export default ReportListCard;
