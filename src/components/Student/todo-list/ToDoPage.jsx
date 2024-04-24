import React from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";

const ToDoPage = () => {
  return (
    <>
      <div className="w-full lg:w-8/12  flex flex-col gap-3">
        <Calendar />
        <ToDoLists status="Assigned" />
      </div>
      <aside className="w-full lg:w-4/12 flex flex-col gap-4">
        <ToDoLists status="Done" />
        <ToDoLists status="Missing" />
      </aside>
    </>
  );
};

export default ToDoPage;
