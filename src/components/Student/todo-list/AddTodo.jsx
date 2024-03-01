import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const AddTodo = ({ onClose, isOpen }) => {
  const [todoDate, setTodoDate] = useState(dayjs("2022-04-17"));

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="bg-white z-50 w-[90%] md:w-[50%] xl:w-[35%]  h-[90%] rounded-xl px-6 py-4">
              <h3 className="font-inter font-normal text-lg leading-7 text-active text-center">
                Add to todo list
              </h3>
              <form className="flex flex-col gap-y-2">
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
                    className="outline-none border border-active rounded-md h-9 text-start px-2"
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
                    className="outline-none border border-active rounded-md h-14 text-start px-2 resize-none"
                  />
                </div>
                <div className="flex flex-col p-0">
                  <label
                    htmlFor="addDescTodo"
                    className="font-poppins font-normal text-sm leading-6 text-gray-900"
                  >
                    Pick a Date
                  </label>
                  <div className="w-full max-h-72 p-0 overflow-hidden">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={todoDate}
                        onChange={(newValue) => setTodoDate(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="between px-4">
                  <button onClick={onClose} className="h-12 text-active border border-active font-medium rounded-md py-0 sm:px-24 md:px-10 lg:px-16 px-10">Cancel</button>
                  <button className="h-12 bg-active text-white rounded-md font-medium py-0 sm:px-24 md:px-10 lg:px-16 px-11">Save</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddTodo;
