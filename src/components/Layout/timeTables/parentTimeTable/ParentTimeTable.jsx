import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { getTeacherTimetable } from "../../../../services/timetable.service";
import SkeletonTimeTableCard from "./SkeletonTimeTableCard";

const ParentTimeTable = () => {
  const userId = localStorage.getItem("userId");
  const [activeTimeTable, setActiveTimeTable] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);

  const getTimeTableData = async () => {
    setIsLoading(true);
    try {
      const data = await getTeacherTimetable(userId);
      console.log("data", data);
      const timeTableData = data?.timetable;
      console.log("timeTableData", timeTableData);
      if (timeTableData) {
        // Initialize activeTimeTable with break periods
        const activeTimeTables = Array(6).fill(null);

        // Sort the timetable by the period
        timeTableData.sort((a, b) => a.period - b.period);
        console.log("sorted timeTableData", timeTableData);

        // Populate activeTimeTable with timetable data
        timeTableData.forEach((item) => {
          const index = item.period - 1; // Adjust for zero-based index
          activeTimeTables[index] = item;
        });

        setActiveTimeTable(activeTimeTables);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("ERR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTimeTableData();
  }, []);

  return (
    <div className="bg-white pb-5 px-4 rounded-2xl flex flex-col justify-center items-center w-full max-h-min">
      <h3 className="font-poppins font-medium text-xl text-center leading-10 text-gray-700 py-5 ">
        Today Timetable
      </h3>
      <div className="flex flex-col gap-y-5 w-full">
        {!isLoading &&
          activeTimeTable.map((time, index) => (
            <TableCard
              key={index}
              timeTable={time}
              isLast={index === activeTimeTable.length - 1}
              index={index}
            />
          ))}
        {isLoading && (
          <>
            <SkeletonTimeTableCard />
            <SkeletonTimeTableCard />
            <SkeletonTimeTableCard />
            <SkeletonTimeTableCard />
            <SkeletonTimeTableCard />
            <SkeletonTimeTableCard />
          </>
        )}
      </div>
    </div>
  );
};

export default ParentTimeTable;
