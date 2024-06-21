import axios from "axios";
const path = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;

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
    ["token", "userId", "role", "isLoggedIn", "fullName", "email"].forEach(
      (item) => localStorage.removeItem(item)
    );
    window.location.href = "/";
  } else {
    console.error("Error occurred:", error);
  }
  throw error;
};

const makeRequest = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
export const getUsers = (role) =>
  makeRequest("get", `${path}/users/roles/${role}`);

export const createUser = (newData) =>
  makeRequest("post", `${path}/users/${newData.role}`, newData);

export const updateUser = (userId, newData) =>
  makeRequest("put", `${path}/users/${userId}?role=${newData.role}`, newData);

export const getUserById = (id) => makeRequest("get", `${path}/users/${id}`);

export const getTeachersByCourse = (courseId) =>
  makeRequest("get", `${path}/users/teachers/courses/${courseId}`);

export const getUsersCounts = () => makeRequest("get", `${path}/users/counts`);

export const getChildrenByParent = (id) =>
  makeRequest("get", `${path}/users/students/parents/${id}`);

export const assignChildToParent = (childId, parentId) =>
  makeRequest("patch", `${path}/users/students/${childId}/parents/${parentId}`);

export const removeChildFromParent = (childId, parentId) =>
  makeRequest(
    "delete",
    `${path}/users/students/${childId}/parents/${parentId}`
  );

export const getTeacherCounts = () =>
  makeRequest("get", `${path}/users/teachers/home`);

export const getNotifications = () =>
  makeRequest("get", `${path}/users/notifications`);

export const searchAll = (query) =>
  makeRequest("get", `${path}/search?query=${query}`);

export const searchUsers = (query) =>
  makeRequest("get", `${path}/users/search?query=${query}`);
