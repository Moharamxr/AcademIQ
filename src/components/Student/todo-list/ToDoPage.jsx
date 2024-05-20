import React, { useEffect, useState } from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";
import { getStudentToDos } from "../../../services/todo.service";
import { useSelector } from "react-redux";

const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [missingTodos, setMissingTodos] = useState([]);

  const selectedDate = useSelector((state) => state.calenderData.date);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getStudentToDos(selectedDate);
      const assigned = data?.todos?.filter(
        (todo) =>
          todo.completed === false && new Date(todo.schedule) >= new Date()
      );
      const done = data?.todos?.filter((todo) => todo.completed === true);
      const missing = data?.todos?.filter(
        (todo) =>
          todo.completed === false && new Date(todo.schedule) < new Date()
      );
      console.log("data", data);
      console.log("assigned", assigned);
      console.log("done", done);
      console.log("missing", missing);
      setTodos(data?.todos);
      setDoneTodos(done);
      setMissingTodos(missing);
    } catch (error) {
      setError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedDate]);

  return (
    <>
      <div className="w-full lg:w-8/12  flex flex-col gap-3">
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
