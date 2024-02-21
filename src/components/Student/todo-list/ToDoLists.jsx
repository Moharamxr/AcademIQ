import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import styled from "@emotion/styled";
import DoneIcon from "../../../assets/icons/DoneIcon";
import { LinearProgress } from "@mui/material";
import MissingIcon from "../../../assets/icons/MissingIcon";
import AddTodo from "./AddTodo";

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
  backgroundColor: "rgba(0, 0, 0, 0.12)", // Example static color
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#029e2e", // Example static color
  },
});

const ToDoLists = ({ status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openAddTodo = () => {
    setIsOpen(true);
  };
  const closeAddTodo = () => {
    setIsOpen(false);
  };
  return (
    <TodoListContainer
      className={`flex flex-col w-full p-4 pt-0 bg-white rounded-xl ${
        status === "Assigned" ? "lg:max-h-[30rem]" : "lg:max-h-[18.4rem]"
      }`}
    >
      <FixedTopContent className=" bg-white py-4">
        <div className="between">
          <h3 className="font-poppins font-normal text-2xl leading-10 text-gray-700">
            {status}
          </h3>
          {status === "Assigned" && (
            <button className="bg-active text-white center gap-1 rounded-md p-1 px-2 text-sm" onClick={openAddTodo}>
              <PlusIcon /> Add
            </button>
          )}
        </div>

        {status === "Assigned" && (
          <div className="w-full flex flex-col">
            <p>Your Progress !</p>
            <div className="between gap-x-1">
              <BorderLinearProgress variant="determinate" value={50} />
              <p>50%</p>
            </div>
          </div>
        )}
      </FixedTopContent>

      <div className="flex flex-col py-1 gap-y-2">
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <div className="flex gap-x-3 items-center">
            {status !== "Missing" ? (
              <DoneIcon color={status === "Done"} />
            ) : (
              <MissingIcon />
            )}
            <div className="flex flex-col">
              <p className="font-inter font-normal text-lg leading-7 text-gray-700">
                Arabic
              </p>
              <p className="font-poppins font-normal text-xs leading-6 text-gray-500 flex items-end">
                Assignment no 2 tutorial no 11
              </p>
            </div>
          </div>
        </div>
      </div>
      {status==='Assigned'&&<AddTodo onClose={closeAddTodo} isOpen={isOpen} />}
    </TodoListContainer>
  );
};

export default ToDoLists;
