import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import styled from "@emotion/styled";
import DoneIcon from "../../../assets/icons/DoneIcon";
import { LinearProgress, Skeleton } from "@mui/material";
import MissingIcon from "../../../assets/icons/MissingIcon";
import AddTodo from "./AddTodo";
import ViewTodoItem from "./ViewTodoItem";

const TodoListContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});
const FixedTopContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const BorderLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.12)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#029e2e",
  },
});

const ToDoLists = ({ status, todos, isLoading, fetchTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openAddTodo = () => {
    setIsOpen(true);
  };
  const closeAddTodo = () => {
    setIsOpen(false);
    fetchTodos();
  };
  const calculateProgress = () => {
    if (todos?.length === 0) return 0;
    const total = todos?.length;
    const done = todos?.filter((todo) => todo?.completed).length;
    const progress = (done / total) * 100;
    return parseInt(progress);
  };
  const [isView, setIsView] = useState(false);
  const [viewTodo, setViewTodo] = useState({});
  const openView = (todo) => {
    if (status === "Done" || status === "Missing") return;
    setViewTodo(todo);
    setIsView(true);
  };
  const closeView = () => {
    setIsView(false);
    fetchTodos();
  };

  return (
    <TodoListContainer
      className={`flex flex-col w-full p-4 pt-0 bg-white rounded-xl ${
        status === "Assigned" ? "lg:max-h-[30rem]" : "lg:h-[19rem]"
      }`}
    >
      <FixedTopContent className=" bg-white py-4">
        <div className="between">
          <h3 className="font-poppins font-normal text-2xl leading-10 text-gray-700">
            {status}
          </h3>
          {status === "Assigned" && (
            <button
              className="bg-active text-white center gap-1 rounded-md p-1 px-2 text-sm"
              onClick={openAddTodo}
            >
              <PlusIcon /> Add
            </button>
          )}
        </div>

        {status === "Assigned" && (
          <div className="w-full flex flex-col">
            <p>Your Progress !</p>
            <div className="between gap-x-1">
              <BorderLinearProgress
                variant="determinate"
                value={calculateProgress()}
              />
              <p>{calculateProgress()}%</p>
            </div>
          </div>
        )}
      </FixedTopContent>

      <div className="flex flex-col py-1 gap-y-2">
        {isLoading && <Skeleton variant="rounded" height={70} />}
        {todos?.length > 0
          ? !isLoading &&
            todos?.map((todo, i) => (
              <div
                className="bg-gray-100 rounded-2xl p-3 cursor-pointer hover:bg-gray-200"
                key={i}
                onClick={() => openView(todo)}
              >
                <div className="flex gap-x-3 items-center">
                  {status !== "Missing" ? (
                    <DoneIcon color={status === "Done"} />
                  ) : (
                    <MissingIcon />
                  )}
                  <div className="flex flex-col">
                    <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                      {todo?.title}
                    </p>
                    <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                      {todo?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : !isLoading && (
              <p className="text-center text-gray-500">No todos available</p>
            )}
      </div>
      {status === "Assigned" && (
        <AddTodo onClose={closeAddTodo} isOpen={isOpen} />
      )}
      <ViewTodoItem isOpen={isView} onClose={closeView} todoItem={viewTodo} />
    </TodoListContainer>
  );
};

export default ToDoLists;
