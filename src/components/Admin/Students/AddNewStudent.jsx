import React from "react";

const AddNewStudent = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">Add New Student </h2>

          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
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
          <div className="center pt-8 pb-4">
            <button className="w-64 bg-active rounded-lg p-3  text-center text-white " onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddNewStudent;
