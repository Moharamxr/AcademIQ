import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import {
  getClassTimetable,
  getTeacherTimetable,
} from "../../../../services/timetable.service";
import SkeletonTimeTableCard from "./SkeletonTimeTableCard";

const ParentTimeTable = () => {
  const userId = localStorage.getItem("userId");
  const [activeTimeTable, setActiveTimeTable] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");

  const fetchTimetable = async () => {
    setIsLoading(true);
    try {
      let data;
      if (role === "teacher") {
        data = await getTeacherTimetable(userId);
      } else if (role === "student") {
        const gradeClassId = localStorage.getItem("gradeClassId");
        data = await getClassTimetable(gradeClassId);
      } else {
        return;
      }
      console.log("data", data);
      const timeTableData = data?.timetable;
      console.log("timeTableData", timeTableData);
      if (timeTableData) {
        // Initialize activeTimeTable with break periods
        const activeTimeTables = Array(6).fill(null);
        const date = new Date();
        const dayOfWeek = date.getDay();
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        // const dayName = days[dayOfWeek];
        const dayName = "Sunday";

        const filteredTimeTable = timeTableData.filter(
          (item) => item.day === dayName
        );

        filteredTimeTable.sort((a, b) => a.period - b.period);
        console.log("sorted timeTableData", filteredTimeTable);

        filteredTimeTable.forEach((item) => {
          const index = item.period - 1; 
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
    fetchTimetable();
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
