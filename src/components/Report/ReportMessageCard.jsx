import React from "react";

const ReportMessageCard = ({ forward, report }) => {
  return report?.body ? (
    <div
      className={`flex ${!forward ? "flex-row-reverse" : ""} gap-x-4 px-5 py-2`}
    >
      <div
        className={`flex flex-col ${!forward ? "items-end" : "items-start"}`}
      >
        <div className={`py-1 flex ${!forward ? "flex-row-reverse" : ""}`}>
          <div
            className={`font-poppins font-extralight leading-4 text-slate-800 text-sm bg-blue-100/55 rounded-2xl flex flex-col gap-3 ${
              forward ? "rounded-bl-none" : "rounded-br-none"
            } w-full max-w-[0%] min-w-fit py-3 px-4 break-inside-auto`}
          >
            <p className="custom-paragraph ">
              Subject : {report?.subject}       
            </p>
            <p className="custom-paragraph ">
              priority : {report?.priority}              
            </p>
            <p className="custom-paragraph ">
              Body : {report?.body}              
            </p>
          </div>
        </div>
        <p
          className={`font-poppins text-[9.5px] text-end text-slate-500 ${
            forward ? "ps-1" : "pe-1"
          }`}
        >
          01:00 AM
        </p>
      </div>
    </div>
  ) : (
    <span className="center pt-8 text-gray-500">No reports yet!</span>
  );
};

export default ReportMessageCard;
