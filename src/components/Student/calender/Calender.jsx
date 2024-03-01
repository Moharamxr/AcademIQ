import React, { useEffect, useRef, useState } from "react";
import "./style.css"; // Import custom CSS file for scrollbar styling

function Calendar() {
  const listRef = useRef(null);
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
  });

  // Generate calendar data with day of the week
  const days = Array.from({ length: 365 }, (_, i) => {
    const currentDate = new Date(new Date().getFullYear(), 0, i + 1);
    return {
      dayOfWeek: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
      dayOfMonth: currentDate.toLocaleDateString("en-US", { day: "2-digit" }),
    };
  });

  const [activeIndex, setActiveIndex] = useState(
    days.findIndex((day) => day.dayOfMonth === currentDate)
  );

  const activateItem = (index) => {
    setActiveIndex(index);
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
          scrollPosition = activeElementOffsetLeft - (listWidth - activeElementWidth) / 2 - 285;
        } else {
          scrollPosition = activeElementOffsetLeft - (screenWidth - activeElementWidth) / 2;
        }

        listRef.current.scrollTo({ left: scrollPosition});
      }
    }
  }, [activeIndex]); // Add activeIndex as a dependency to useEffect

  return (
    <div className="scroll-container bg-white rounded-lg p-2" ref={listRef}>
      <div className="inline-flex justify-center gap-2">
        {days.map(({ dayOfWeek, dayOfMonth }, index) => (
          <div
            key={index}
            onClick={() => activateItem(index)}
            className={`center text-active border-2 cursor-pointer border-active min-w-[60px] rounded-lg w-10 h-20 ${
              activeIndex === index ? " bg-active text-white w-16 h-24 " : "mt-2 bg-white"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-lg">{dayOfWeek}</p>
              <p className="text-center">{dayOfMonth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
