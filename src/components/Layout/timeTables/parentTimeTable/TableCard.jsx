import React from "react";
import ActiveTimeTableIcon from "../../../../assets/icons/ActiveTimeTableIcon";
import DisabledTimeTableIcon from "../../../../assets/icons/DisabledTimeTableIcon";
import TableChild from "../../../../assets/tableChild (1).png";
import TableTeacher from "../../../../assets/tableTeacher.png";

const TableCard = ({ isActive }) => {
  return (
    <div className="between  w-full pe-6">
      {isActive ? <ActiveTimeTableIcon /> : <DisabledTimeTableIcon />}
      <div className="bg-gray-100 rounded-xl p-3 relative overflow-hidden between h-14 min-w-[85%]">
        
          <div className="flex items-center  w-12 h-7 me-6 mt-2 mb-2">
            <img src={TableChild} alt="TableChild" className="mr-2 w-11" />
            <img
              src={TableTeacher}
              alt="TableTeacher"
              className="mr-2 relative right-6 top-3 w-6"
            />
          </div>
          <div className="flex flex-col items-center ">
            <h4 className="font-poppins font-semibold text-base leading-6 text-gray-700">
              Arabic
            </h4>
            <p className="font-poppins font-normal text-xs leading-5 flex items-end text-gray-700">
              Guy Hukens
            </p>
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
