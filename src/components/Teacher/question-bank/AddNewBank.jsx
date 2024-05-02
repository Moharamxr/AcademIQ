import React, { useState } from "react";
import { createQuestionBank } from "../../../services/questionBank.service";

const AddNewBank = ({ isOpen, onClose, gradeCourses }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const closeModal = () => {
    reset();
    onClose();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  const isValidate = () => {
    if (title === "") {
      setError("Title must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (description === "") {
      setError("description must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    } else if (courseId === "") {
      setError("Grade Class ID must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    return true;
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setError("");
  };

  const handleCreateCourse = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const newData = {
      title,
      description,
      courseId,
    };

    console.log(newData);
    setIsLoading(true);
    try {
      await createQuestionBank(newData);
      setIsLoading(false);
      setError(null);
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">
            Add Question Bank{" "}
          </h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
              {error}
            </p>
          )}
          <div className=" flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Title" className="text-active">
                Title
              </label>
              <input
                type="text"
                name="Title"
                id="Title"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="description" className="text-active">
                description
              </label>
              <input
                name="description"
                id="description"
                type="text"
                className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label htmlFor="course" className="text-active">
              Course
            </label>
            <select
              name="course"
              id="course"
              className="bg-gray-100 text-gray-500 text-sm p-2  rounded-lg outline-none"
              onChange={handleCourseChange}
              value={courseId}
            >
              <option value="">Select Course</option>
              {gradeCourses?.map((courseData, index) => (
                <option key={index} value={courseData._id}>
                  {courseData.title}
                </option>
              ))}
            </select>
          </div>

          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleCreateCourse}
              disabled={isLoading}
            >
              Done
            </button>
            <button
              className="w-64 bg-white border-active-br border-2 text-active rounded-lg p-3  text-center"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default AddNewBank;
