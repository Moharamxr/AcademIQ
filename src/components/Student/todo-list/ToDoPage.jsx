import React, { useEffect, useState } from "react";
import Calendar from "../calender/Calender";
import ToDoLists from "./ToDoLists";
import { getStudentToDos } from "../../../services/todo.service";

const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [missingTodos, setMissingTodos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getStudentToDos();
      const assigned = data?.todos?.filter(
        (todo) => todo.completed === false && new Date (todo.schedule) >= new Date()
      );
      const done = data?.todos?.filter((todo) => todo.completed === true);
      const missing = data?.todos?.filter(
        (todo) => todo.completed === false && new Date (todo.schedule) < new Date()
      );
      console.log('data', data)
      console.log('assigned', assigned);
      console.log('done', done);
      console.log('missing', missing);
      setTodos(assigned);
      setDoneTodos(done);
      setMissingTodos(missing);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="w-full lg:w-8/12  flex flex-col gap-3">
        <Calendar />
        <ToDoLists status="Assigned" todos={todos} isLoading={isLoading} fetchTodos={fetchTodos} />
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