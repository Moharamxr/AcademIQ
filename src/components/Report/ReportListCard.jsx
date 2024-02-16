import React from "react";

const ReportListCard = ({ img, active }) => {
  return (
    <div
      className={`container flex ${
        active
          ? "bg-blue-100/55 rounded-2xl"
          : "bg-white border-b-slate-400 border-opacity-20 border-b-2"
      } p-2 py-1 gap-2 `}
    >
      <div className="container flex flex-col gap-1 p-1 overflow-hidden">
        <div className="between">
          <p className="font-poppins font-normal text-sm">Guy Hawkins</p>
          <p className="font-poppins text-[9.5px] text-slate-500">
            01:00 AM
          </p>
        </div>

        <p className="font-poppins font-normal text-xs text-slate-400 max-w-full max-h-4 overflow-hidden">
          first statement item forward statement
        </p>
      </div>
    </div>
  );
};

export default ReportListCard;
