import React from "react";

const ReportListCard = ({ active ,contact }) => {
  return (
    <div
      className={`w-full cursor-pointer flex ${
        active
          ? "bg-blue-100/55 rounded-2xl"
          : "bg-white border-b-slate-400 border-opacity-20 border-b-2"
      } p-2 py-1 gap-2 `}
    >
      <div className="w-full flex flex-col gap-1 p-3 overflow-hidden">
        <div className="between">
          <p className="font-poppins font-normal text-sm">{contact?.name?.first || contact?.from} {contact?.name?.last}  {contact?.role&&<span className="text-xs text-gray-400">{'('+contact?.role+')'}</span>}</p>
          
          <span className="font-poppins text-[9.5px] text-slate-500">
            01:00 AM
          </span>
        </div>

        <p className="font-poppins font-normal text-xs text-slate-400 max-w-full max-h-4 overflow-hidden">
          {contact?.email}
        </p>
      </div>
    </div>
  );
};

export default ReportListCard;
