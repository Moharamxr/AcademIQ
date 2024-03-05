import React from "react";

const AddQuestion = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8 lg:w-2/6 w-11/12 sm:w-3/6 ">
          <select name="MCQ" id="MCQ" className="bg-white py-3 px-6  outline-none shadow-md rounded-lg w-full lg:w-3/6">
            <option value="" className="text-black">MCQ</option>
            <option value="" className="text-black">Written</option>
          </select>
          <input type="text" name="title" id="title" placeholder="Title" className="outline-none rounded-lg border-2 border-gray-200/70 p-3" />
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter question"
            className="outline-none rounded-lg border-2 border-gray-200/70 p-3" 
          />
          <div className="center">
            <button className="bg-active text-white py-2 px-6 rounded-lg" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddQuestion;
