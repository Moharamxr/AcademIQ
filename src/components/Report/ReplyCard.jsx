import React from "react";
import { useSelector } from "react-redux";

const ReplyCard = ({ report }) => {
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

  const { isSent } = useSelector((state) => state.reportsData);

  return report?.body ? (
    <div className={`flex flex-row-reverse gap-x-4 p-5   bg-white shadow-sm`}>
      <div className={`flex flex-col items-end w-full`}>
        <div className={`py-1 flex flex-col w-full`}>
          <div
            className={`font-poppins font-light leading-4 text-slate-800 text-sm bg-blue-100/55 rounded-lg p-4 px-0 break-inside-auto w-full`}
          >
            <div
              className={`flex flex-col justify-start border-b-2 border-gray-300  pb-5 px-4 `}
            >
              <p className="font-semibold text-xl pb-1">
                {!isSent
                  ? "You"
                  : report?.to?.name?.first + " " + report?.to?.name?.last}
              </p>
              <p className="text-gray-500 text-sm">
                to :{" "}
                {isSent
                  ? "You"
                  : report?.from?.name?.first + " " + report?.from?.name?.last}
              </p>
            </div>
            <div className={`flex justify-start py-3 px-4`}>
              <p className="mb-2 ">{report?.reply}</p>
            </div>
          </div>
          <time className={`font-poppins text-xs text-slate-500 mt-2 self-end`}>
            {createdAt}
          </time>
        </div>
      </div>
    </div>
  ) : null;
};

export default ReplyCard;
