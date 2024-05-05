import React, { useEffect, useState } from "react";
import ActiveTimeTableIcon from "../../../../assets/icons/ActiveTimeTableIcon";
import DisabledTimeTableIcon from "../../../../assets/icons/DisabledTimeTableIcon";
import TableChild from "../../../../assets/tableChild (1).png";
import TableTeacher from "../../../../assets/tableTeacher.png";
import ActiveLastTimeTableIcon from "../../../../assets/icons/ActiveLastTimeTableIcon";

const TableCard = ({ timeTable, isLast, index }) => {

  const isActive =
    timeTable?.startTime?.hour >= new Date().getHours() &&
    timeTable?.startTime?.minute >= new Date().getMinutes();
  const periods = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00"];
  const role = localStorage.getItem("role");
  const [initials, setInitials] = useState(timeTable?.course?.title?.split(" ").map((word) => word[0]).join("").toUpperCase()||"B");

  return (
    <div className="between xl:gap-2 gap-1  w-full  bg--200">
      <span className="  object-cover bg- h-12">
        {!isActive ? (
          isLast ? (
            <ActiveLastTimeTableIcon />
          ) : (
            <ActiveTimeTableIcon />
          )
        ) : (
          <DisabledTimeTableIcon />
        )}
      </span>
      <div className="w-full bg-gray-100 rounded-xl p-3 relative overflow-hidden between h-14 min-w-[85%]">
        {role !== "teacher" ? (
          <div className="flex items-center  w-12 h-7 me-6 mt-2 mb-2">
            <img src={TableChild} alt="TableChild" className="mr-2 w-11" />

            {role === "parent" && (
              <img
                src={TableTeacher}
                alt="TableTeacher"
                className="mr-2 relative right-6 top-3 w-6"
              />
            )}
          </div>
        ) : (
          <div className="min-w-10 min-h-10 text-white text-xl rounded-full center mr-2 bg-active">
            {initials}
          </div>
        )}

        <div className="flex flex-col items-center ">
          <h4 className="font-poppins font-semibold  xl:text-sm text-xs  leading-6 text-gray-700">
            {timeTable?.course ? timeTable?.course?.title : "Break"}
          </h4>
          <p className="font-poppins font-normal  hidden xl:block  text-xs leading-5  text-gray-700">
            {timeTable?.teacher
              ? timeTable?.teacher?.name?.first.slice(0,8) +" "+ timeTable?.teacher?.name?.last.slice(0,8)
              : ""}
          </p>
        </div>

        <div className="flex flex-col items-center ps-3">
          <p className="font-poppins font-normal xl:text-sm text-xs leading-6 text-center text-green-600">
            {timeTable?.startTime
              ? timeTable?.startTime?.hour +
                ":" +
                (timeTable?.startTime?.minute === 0
                  ? "00"
                  : timeTable?.startTime?.minute)
              : index === 0
              ? periods[index]
              : periods[index]}
          </p>
          {/* <p className="font-poppins font-normal xl:text-sm text-xs leading-5 flex items-end text-gray-700">
            lab 2
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
