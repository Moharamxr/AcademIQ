import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { createTodoItem } from "../../../services/todo.service";
import { DateTimePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
const FixedBottomContent = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const AddTodo = ({ onClose, isOpen }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    schedule: dayjs(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };
  const handleDescriptionChange = (e) => {
    setTodo({ ...todo, description: e.target.value });
  };
  const handleScheduleChange = (e) => {
    setTodo({ ...todo, schedule: e });
  };

  const isValidate = () => {
    if (todo.title === "") {
      setError("Title is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else if (todo.description === "") {
      setError("Description is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else if (todo.schedule === "") {
      setError("Schedule is required");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    } else if (todo.schedule < dayjs()) {
      setError("Schedule date cannot be in the past");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return false;
    }
    return true;
  };

  const reset = () => {
    setTodo({
      title: "",
      description: "",
      schedule: dayjs(),
    });
    setError(null);
  };
  const closeModal = () => {
    reset();
    onClose();
  };

  const handleAddTodo = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    try {
      const newData = {
        title: todo?.title,
        description: todo?.description,
        schedule: todo?.schedule?.toISOString(),
      };
      await createTodoItem(newData);
      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.error("Error occurred:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="bg-white z-50 w-[90%] md:w-[50%] xl:w-[35%]  h-[80%] rounded-xl px-6 py-4">
              <h3 className="font-inter font-normal text-lg leading-7 text-active text-center py-3">
                Add to todo list
              </h3>
              {error && (
                <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-y-5 pt-3">
                <div className="flex flex-col p-0">
                  <label
                    htmlFor="addDescTodo"
                    className="font-poppins font-normal text-sm leading-6 text-gray-900"
                  >
                    Pick a Date
                  </label>
                  <div className="w-full  p-0 overflow-hidden">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        sx={{ width: "100%" }}
                        value={todo.schedule}
                        onChange={handleScheduleChange}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="addTitleTodo"
                    className="font-poppins font-normal text-sm leading-6 text-gray-900"
                  >
                    Add Title
                  </label>
                  <input
                    type="text"
                    id="addTitleTodo"
                    className="outline-none border border-active rounded-md h-11 text-start px-2"
                    value={todo.title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="addDescTodo"
                    className="font-poppins font-normal text-sm leading-6 text-gray-900"
                  >
                    Add Description
                  </label>
                  <textarea
                    type="text"
                    id="addDescTodo"
                    className="outline-none border border-active rounded-md h-32 text-start px-2 resize-none"
                    value={todo.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
              <FixedBottomContent className=" between px-4 bg-white pt-5 object-cover">
                <button
                  className="h-12 bg-active text-white rounded-md font-medium py-0 sm:px-24 md:px-10 lg:px-16 px-11"
                  onClick={handleAddTodo}
                  disabled={isLoading}
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="h-12 text-active border border-active font-medium rounded-md py-0 sm:px-24 md:px-10 lg:px-16 px-10"
                >
                  Cancel
                </button>
              </FixedBottomContent>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddTodo;
