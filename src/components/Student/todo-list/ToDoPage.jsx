import React from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";

const ToDoPage = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 lg:ps-4 me-2 pb-4 flex flex-col gap-y-3">
        <Calendar />
        <ToDoLists status='Assigned' height='32rem'/>
      </div>
      <div className="w-full lg:w-4/12 ms-2 hidden md:block">
        <div className="flex flex-col gap-y-4">
          <div className="w-"><ToDoLists status='Done' height='20rem'/></div>
          <div className="w-"><ToDoLists status='Missing' height='20rem'/></div>
        

        </div>
      </div>
    </>
  );
};

export default ToDoPage;
