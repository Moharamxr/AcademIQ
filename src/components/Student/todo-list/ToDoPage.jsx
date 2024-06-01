import React, { useEffect, useState } from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";
import { getStudentToDos } from "../../../services/todo.service";
import { useSelector } from "react-redux";

const ToDoPage = () => {
  const selectedDate = useSelector((state) => state.calenderData?.date);

  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [missingTodos, setMissingTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isValidDateFormat = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
  };
  const fetchTodos = async () => {
    if (!isValidDateFormat(selectedDate)) {
      return;
    }

    setIsLoading(true);
    const data = await getStudentToDos(selectedDate);
    const combinedTodos = [
      ...(data?.todos?.todo || []),
      ...(data?.todos?.assessmentTodos || []),
    ];

    const assigned = combinedTodos.filter(
      (todo) => !todo.completed && new Date(todo.schedule) >= new Date()
    );
    const done = combinedTodos.filter((todo) => todo.completed);
    const missing = combinedTodos.filter(
      (todo) => !todo.completed && new Date(todo.schedule) < new Date()
    );

    setTodos(assigned);
    setDoneTodos(done);
    setMissingTodos(missing);

    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTodos();
    }
  }, [selectedDate]);

  return (
    <>
      <div className="w-full lg:w-8/12 flex flex-col gap-3">
        <Calendar />
        <ToDoLists
          status="Assigned"
          todos={todos}
          isLoading={isLoading}
          fetchTodos={fetchTodos}
        />
      </div>
      <aside className="w-full lg:w-4/12 flex flex-col gap-4">
        <ToDoLists status="Done" todos={doneTodos} isLoading={isLoading} />
        <ToDoLists
          status="Missing"
          todos={missingTodos}
          isLoading={isLoading}
        />
      </aside>
    </>
  );
};

export default ToDoPage;
