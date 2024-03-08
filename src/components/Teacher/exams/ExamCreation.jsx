import React from "react";
import AddQuestion from "./AddQuestion";
import { useState } from "react";

const ExamCreation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
  return (
    <main className="w-full bg-white rounded-xl p-4">
      <h2 className="font-poppins text-2xl font-medium">Exam Creation </h2>
      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Subject
          </label>
          <select
            name="subject"
            id="subject"
            className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
          >
            <option value="">English</option>
          </select>
        </form>
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Unit
          </label>
          <select
            name="subject"
            id="subject"
            className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
          >
            <option value="">English</option>
          </select>
        </form>
      </div>
      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Date
          </label>
          <div className="between gap-5">
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
            >
              <option value="">English</option>
            </select>
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
            >
              <option value="">English</option>
            </select>
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 text-sm p-2 w-1/3  rounded-lg outline-none"
            >
              <option value="">English</option>
            </select>
          </div>
        </form>
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Duration
          </label>
          <div className="between gap-5">
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 w-1/2 text-sm p-2  rounded-lg outline-none"
            >
              <option value="">English</option>
            </select>
            <select
              name="subject"
              id="subject"
              className="bg-gray-100 text-gray-500 w-1/2 text-sm p-2  rounded-lg outline-none"
            >
              <option value="">English</option>
            </select>
          </div>
        </form>
      </div>
      <div className="between flex flex-col md:flex-row py-4 md:gap-20 ">
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Class
          </label>
          <select
            name="subject"
            id="subject"
            className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
          >
            <option value="">English</option>
          </select>
        </form>
        <form className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="subject" className="text-active">
            Grade
          </label>
          <select
            name="subject"
            id="subject"
            className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
          >
            <option value="">English</option>
          </select>
        </form>
      </div>
      <h3 className="text-gray-700 text-xl py-4">Do you want to...</h3>
      <div className="center gap-7 py-4">
        <button className="bg-gray-200 border-2 border-active-br p-4 rounded-lg text-active">
          Choose From Question Bank ?
        </button>
        <span className="p-2 px-7 text-gray-600 text-lg">Or</span>
        <button className="bg-gray-200 border-2 border-active-br p-4 px-12  rounded-lg text-active"onClick={onOpen}>
          Add New Question ?
        </button>
      </div>
      <div className="center pt-8 pb-4">
        <button className="w-56 bg-active rounded-lg p-3  text-center text-white ">
          Done
        </button>
      </div>
      <AddQuestion isOpen={isOpen} onClose={onClose} />
    </main>
  );
};

export default ExamCreation;
