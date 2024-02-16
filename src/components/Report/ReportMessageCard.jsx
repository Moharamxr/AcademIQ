import React from "react";
import Teacher1 from "../../assets/connect-teatcher (1).png";
import Parent from "../../assets/leader (2).png";

const ReportMessageCard = ({ forward }) => {
  return (
    <div className={`flex ${!forward && "flex-row-reverse"} gap-x-4 px-5 py-2`}>
      <img
        src={forward ? Teacher1 : Parent}
        alt="Th"
        className="w-1/12 h-1/6 pt-1"
      />
      <div className="flex flex-col">
        <div
          className={`container py-1 flex ${!forward && "flex-row-reverse"}`}
        >
          <p
            className={`font-poppins font-extralight leading-4 text-slate-800 text-sm  bg-blue-100/55 rounded-2xl ${
              forward ? "rounded-bl-none" : "rounded-br-none"
            } max-w-[fit-content] py-3 px-4`}
          >
            {forward ? "forward statement item" : "backward statement item"}
          </p>
        </div>
        <p className="font-poppins text-[9.5px] text-slate-500 ps-1">01:00 AM</p>{" "}
      </div>
    </div>
  );
};

export default ReportMessageCard;
