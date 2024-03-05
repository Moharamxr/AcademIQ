import React from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";

const ToDoPage = () => {
  return (
    <>
      <div className="w-full lg:w-8/12  flex flex-col gap-3">
        <Calendar />
        <ToDoLists status='Assigned' />
      </div>
      <div className="w-full lg:w-4/12 ">
        <div className="flex flex-col gap-4">
          <div ><ToDoLists status='Done' /></div>
          <div ><ToDoLists status='Missing' /></div>
        

        </div>
      </div>
    </>
  );
};

export default ToDoPage;
