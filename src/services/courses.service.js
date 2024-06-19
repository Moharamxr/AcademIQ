import axios from "axios";

const baseURL = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
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
    window.location.href = "/login";
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

export const createCourse = async (newData) => {
  return makeRequest("post", "/courses", newData);
};

export const createCourseMeeting = async (id) => {
  return makeRequest("post", `/courses/${id}/rooms`,{});
};

export const getGradeCourses = async () => {
  return makeRequest("get", "/courses");
};

export const getCourseById = async (id) => {
  return makeRequest("get", `/courses/${id}`);
};

export const getCourseByGradeClass = async (id) => {
  return makeRequest("get", `/courses/gradeClasses/${id}`);
};

export const updateCourse = async (id, newData) => {
  return makeRequest("put", `/courses/${id}`, newData);
};

export const uploadCourseMaterial = async (id, formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return makeRequest("patch", `/courses/${id}/materials`, formData, config);
};

export const assignTeacherToCourse = async (courseId, teacherId) => {
  return makeRequest("patch", `/courses/${courseId}/teachers/${teacherId}`);
};

export const removeTeacherFromCourse = async (courseId, teacherId) => {
  return makeRequest("delete", `/courses/${courseId}/teachers/${teacherId}`);
};
