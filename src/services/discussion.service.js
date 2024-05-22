import axios from "axios";
const path = "https://academiq.onrender.com";

const axiosInstance = axios.create();

const handleRequest = async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(handleRequest, (error) => {
  return Promise.reject(error);
});

const handleResponse = (response) => {
  console.log(response.data.message);
  console.log(response.data);
  return response.data;
};

const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    console.log("User is unauthorized. Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");

    window.location.href = "/login";
  } else {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const getDiscussion = async (courseId) => {
  try {
    const response = await axiosInstance.get(`${path}/discussions/${courseId}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const createPost = async (post) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${path}/discussions/posts`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response?.data?.message);
  console.log(response?.data);
  return response.data;
};

export const likePost = async (postId) => {
  try {
    const response = await axiosInstance.post(
      `${path}/discussions/posts/likes/${postId}`,
      {}
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await axiosInstance.post(
      `${path}/discussions/posts/comments/${postId}`,
      comment
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getPostComments = async (postId) => {
  try {
    const response = await axiosInstance.get(
      `${path}/discussions/posts/comments/${postId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
