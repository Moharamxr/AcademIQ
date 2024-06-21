import axios from "axios";

const baseURL = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleResponse = (response) => {
  console.log(response.data.message); 
  console.log(response.data); 
  return response.data;
};

const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    console.log("User is unauthorized. Logging out...");
    const itemsToRemove = [
      "token",
      "userId",
      "role",
      "isLoggedIn",
      "fullName",
      "email",
    ];
    itemsToRemove.forEach((item) => localStorage.removeItem(item));
    window.location.href = "/"; 
  } else {
    console.error("Error occurred:", error);
  }
  throw error; 
};

const makeRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getDiscussion = async (courseId) => {
  return makeRequest("get", `/discussions/${courseId}`);
};

export const createPost = async (postData) => {
  const token = localStorage.getItem("token");
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return makeRequest("post", "/discussions/posts", postData, config);
};

export const likePost = async (postId) => {
  return makeRequest("post", `/discussions/posts/likes/${postId}`);
};

export const addComment = async (postId, comment) => {
  return makeRequest("post", `/discussions/posts/comments/${postId}`, comment);
};

export const getPostComments = async (postId) => {
  return makeRequest("get", `/discussions/posts/comments/${postId}`);
};

export const getAnnouncements = async () => {
  return makeRequest("get", "/discussions/global");
};

export const createAnnouncement = async (announcement) => {
  const token = localStorage.getItem("token");
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(
    "post",
    "/discussions/global/announcements",
    announcement,
    config
  );
};
