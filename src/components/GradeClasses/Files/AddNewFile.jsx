import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { uploadCourseMaterial } from "../../../services/courses.service";
import { useParams } from "react-router-dom";

const AddNewFile = ({ isOpen, onClose, getCourseData }) => {
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {id } = useParams();
  const courseId = id;

  const closeModal = () => {
    reset();
    onClose();
    getCourseData();
  };

  const handleAttachmentsChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setAttachments(filesArray);
  };

  const reset = () => {
    setAttachments([]);
    setError("");
  };

  const handleAddFiles = async () => {
    const formData = new FormData();
    attachments.forEach((file) => {
      formData.append("materials", file);
    });
    setIsLoading(true);
    try {
      await uploadCourseMaterial(courseId, formData);
      setIsLoading(false);
      closeModal();
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <section className="bg-white rounded-xl p-5 w-1/2">
          <h2 className="font-poppins text-2xl font-medium">Add New Files</h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center">
              {error}
            </p>
          )}
          <div className="between flex flex-col lg:flex-row py-4 md:gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="Attachments" className="text-active">
                Attachments
              </label>
              <input
                type="file"
                name="Attachments"
                id="Attachments"
                className="bg-gray-100 text-gray-700 text-sm p-2 h-11 border-2 rounded-lg outline-none"
                onChange={handleAttachmentsChange}
                multiple
              />
            </div>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3 text-center text-white"
              onClick={handleAddFiles}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Done"
              )}
            </button>
            <button
              className="w-64 bg-white border-active-br border-2 text-active rounded-lg p-3 text-center"
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

export default AddNewFile;
