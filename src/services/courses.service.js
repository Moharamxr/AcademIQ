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

export const createCourse = async (newData) => {
  try {
    const response = await axiosInstance.post(`${path}/courses`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getGradeCourses = async () => {
  try {
    const response = await axiosInstance.get(`${path}/courses`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`${path}/courses/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updateCourse = async (id, newData) => {
  try {
    const response = await axiosInstance.put(`${path}/courses/${id}`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
