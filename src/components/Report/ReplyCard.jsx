import React from "react";

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
  return (
     
      <div className="flex flex-row-reverse gap-x-4 px-5 py-2">
        <div className="flex flex-col items-end">
          <div className="py-1 flex flex-row-reverse">
            <div
              className="font-poppins font-extralight leading-4 text-slate-800 text-sm bg-blue-100/55 rounded-2xl flex flex-col gap-3 rounded-bl-none
              w-full max-w-[0%] min-w-fit py-3 px-4 break-inside-auto"
            >
              <p className="custom-paragraph">{report?.reply}</p>
            </div>
          </div>
          <time className="font-poppins text-[9.5px] text-end text-slate-500 ps-1">
            {createdAt}
          </time>
        </div>
      </div>
    
  );
};

export default ReplyCard;
