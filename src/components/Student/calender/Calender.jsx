import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { setDate } from "../../../store/slices/calenderSlice";

function Calendar() {
  const dispatch = useDispatch();

  const listRef = useRef(null);
  const currentDate = new Date().toISOString().slice(0, 10);

  const days = Array.from({ length: 365 }, (_, i) => {
    const currentDate = new Date(new Date().getFullYear(), 0, i);
    const currentWeekDay = new Date(new Date().getFullYear(), 0, i );
    const currentMonth = currentDate.getMonth() + 1;
    const isoDate = currentDate.toISOString().slice(0, 10);
    return {
      dayOfWeek: currentWeekDay.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      dayOfMonth:
        currentDate.toLocaleDateString("en-US", { day: "2-digit" }) ,
      month: currentMonth,
      isoDate,
    };
  });

  const [activeIndex, setActiveIndex] = useState(
    days.findIndex((day) => day.isoDate === currentDate)
  );

  const activateItem = (index) => {
    setActiveIndex(index);
    dispatch(setDate({ date: days[index].isoDate }));
  };

  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(".bg-active");
      if (activeElement) {
        const listWidth = listRef.current.offsetWidth;
        const activeElementWidth = activeElement.offsetWidth;
        const activeElementOffsetLeft = activeElement.offsetLeft;
        const screenWidth = window.innerWidth;

        let scrollPosition;

        if (screenWidth >= 722) {
          scrollPosition =
            activeElementOffsetLeft -
            (listWidth - activeElementWidth) / 2 -
            285;
        } else {
          scrollPosition =
            activeElementOffsetLeft - (screenWidth - activeElementWidth) / 2;
        }

        listRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeIndex]); // Add activeIndex as a dependency to useEffect

  return (
    <div
      className="scroll-container bg-white rounded-lg p-2 overflow-x-auto"
      ref={listRef}
    >
      <div className="inline-flex justify-center gap-2">
        {days.map(({ dayOfWeek, dayOfMonth, month }, index) => (
          <div
            key={index}
            onClick={() => activateItem(index)}
            className={`center text-active border-2 cursor-pointer border-active min-w-[60px] rounded-lg w-10 h-24 ${
              activeIndex === index
                ? " bg-active text-white  w-16 h-28"
                : "mt-2 bg-white"
            }`}
          >
            <div className="center flex-col">
              <p className="text-lg select-none">{dayOfWeek}</p>
              <p className="text-center select-none">
                {dayOfMonth} / {month}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
