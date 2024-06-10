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

export const getUsers = async (role) => {
  try {
    const response = await axiosInstance.get(`${path}/users/roles/${role}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const createUser = async (newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/users/${newData.role}`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${path}/users/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getTeachersByCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(
      `${path}/users/teachers/courses/${courseId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getUsersCounts = async () => {
  try {
    const response = await axiosInstance.get(`${path}/users/counts`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getChildrenByParent = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${path}/users/students/parents/${id}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const assignChildToParent = async (childId, parentId) => {
  try {
    const response = await axiosInstance.patch(
      `${path}/users/students/${childId}/parents/${parentId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const removeChildFromParent = async (childId, parentId) => {
  try {
    const response = await axiosInstance.delete(
      `${path}/users/students/${childId}/parents/${parentId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getTeacherCounts = async () => {
  try {
    const response = await axiosInstance.get(`${path}/users/teachers/home`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get(`${path}/users/notifications`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const searchAll = async (query) => {
  try {
    const response = await axiosInstance.get(`${path}/search?query=${query}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};