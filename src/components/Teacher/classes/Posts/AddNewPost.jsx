import React, { useState } from "react";
import { createPost } from "../../../../services/discussion.service";
import { CircularProgress } from "@mui/material";

const AddNewPost = ({ isOpen, onClose, courseId ,getPostsData }) => {
  const [postContent, setPostContent] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => {
    reset();
    onClose();
    getPostsData();
  };
  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleAttachmentsChange = (e) => {
    setAttachments(e.target.value);
  };

  const isValidate = () => {
    if (postContent === "") {
      setError("Content must be filled");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    return true;
  };

  const reset = () => {
    setPostContent("");
    setAttachments([]);
    setError("");
  };

  const handleCreatePost = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    const newData = {
      content: postContent,
      attachments: attachments,
      courseId,
    };

    console.log(newData);
    setIsLoading(true);
    try {
      await createPost(newData);
      setIsLoading(false);
      closeModal();
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
          <h2 className="font-poppins text-2xl font-medium">Add New Post </h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
              {error}
            </p>
          )}
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <form className="flex flex-col gap-2 w-full ">
              <label htmlFor="Content" className="text-active">
                Content
              </label>
              <input
                type="text"
                name="Content"
                id="Content"
                className="bg-gray-100 text-gray-700 text-sm p-2  rounded-lg outline-none"
                onChange={handlePostContentChange}
              />
            </form>
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3  text-center text-white "
              onClick={handleCreatePost}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={16} color="inherit"/> : "Done"} 
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

export default AddNewPost;
