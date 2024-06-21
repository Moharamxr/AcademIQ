import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { getClassTimetable, getTeacherTimetable } from "../../../services/timetable.service";
import SkeletonTimeTableCard from "./SkeletonTimeTableCard";
import { useDispatch } from "react-redux";
import { setCurrentTimePeriod } from "../../../store/slices/timetableSlice";

const TimeTable = () => {
  const userId = localStorage.getItem("userId");
  const [activeTimeTable, setActiveTimeTable] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  const isClassHappeningNow = (timetable) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (let period of timetable) {
      if (period.day === currentDay) {
        const { startTime, endTime } = period;

        const startHour = startTime.hour;
        const startMinute = startTime.minute;
        const endHour = endTime.hour;
        const endMinute = endTime.minute;

        if (
          (currentHour > startHour ||
            (currentHour === startHour && currentMinute >= startMinute)) &&
          (currentHour < endHour ||
            (currentHour === endHour && currentMinute < endMinute))
        ) {
          return true;
        }
      }
    }

    return false;
  };
  const gradeClassId = localStorage.getItem("gradeClassId");

  const fetchTimetable = async () => {
    setIsLoading(true);
    try {
      let data;
      if (role === "teacher") {
        data = await getTeacherTimetable(userId);
      } else {
        if (!gradeClassId || gradeClassId === "undefined" || gradeClassId === "null") {
          setIsLoading(false);
          return;
        }
        data = await getClassTimetable(gradeClassId);
      }
      const timeTableData = data?.timetable;
      if (timeTableData) {
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
        const dayName = days[dayOfWeek];
        
        const filteredTimeTable = timeTableData.filter(item => item.day === dayName);

        filteredTimeTable.sort((a, b) => a.period - b.period);

        filteredTimeTable.forEach(item => {
          const index = item.period - 1;
          activeTimeTables[index] = item;
        });

        setActiveTimeTable(activeTimeTables);
        dispatch(setCurrentTimePeriod({ period: isClassHappeningNow(filteredTimeTable) }));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [gradeClassId]);

  // const currentTimePeriod = useSelector(state => state.timetableData.currentTimePeriod);
  // console.log("currentTimePeriod", currentTimePeriod)

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

export default TimeTable;
