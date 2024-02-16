import React from "react";
import ActiveTimeTableIcon from "../../../../assets/icons/ActiveTimeTableIcon";
import DisabledTimeTableIcon from "../../../../assets/icons/DisabledTimeTableIcon";
import TableChild from "../../../../assets/tableChild (1).png";
import TableTeacher from "../../../../assets/tableTeacher.png";

const TableCard = ({ isActive }) => {
  return (
    <div className="flex items-center gap-x-1 w-full">
      {isActive ? <ActiveTimeTableIcon /> : <DisabledTimeTableIcon />}
      <div className="bg-gray-100 flex-1 rounded-md p-3 relative overflow-hidden flex items-center justify-between h-14">
        <div className="flex">
          <div className="flex items-center  w-12 h-7 me-6 mt-2">
            <img src={TableChild} alt="TableChild" className="mr-2 w-11" />
            <img
              src={TableTeacher}
              alt="TableTeacher"
              className="mr-2 relative right-6 top-3 w-6"
            />
          </div>
          <div className="flex flex-col items-center ">
            <h4 className="font-poppins font-semibold text-sm leading-6 text-gray-700">
              Arabic
            </h4>
            <p className="font-poppins font-normal text-[11px] leading-5 flex items-end text-gray-700">
              Guy Hukens
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-poppins font-normal text-sm leading-6 text-center text-green-600">
            8:30
          </p>
          <p className="font-poppins font-normal text-sm leading-5 flex items-end text-gray-700">
            lab 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
