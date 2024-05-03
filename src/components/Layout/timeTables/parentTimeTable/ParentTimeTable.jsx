import React from "react";
import TableCard from "./TableCard";

const ParentTimeTable = () => {
  return (
    <div className="bg-white p-3 rounded-2xl flex flex-col justify-center items-center w-full h-full">
      <h3 className="font-poppins font-medium text-xl text-center leading-10 text-gray-700 my-1">
        Today Timetable
      </h3>
      <div className="flex flex-col gap-y-4 p-1  w-full" >
        <TableCard isActive={true}/>
        <TableCard isActive={false}/>
        <TableCard isActive={false}/>
        <TableCard isActive={false}/>
        <TableCard isActive={false}/>
        <TableCard isActive={false}/>
        {/* <TableCard isActive={false}/> */}
      </div>
    </div>
  );
};

export default ParentTimeTable;
