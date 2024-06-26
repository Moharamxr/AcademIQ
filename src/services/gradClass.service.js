import axios from "axios";

const baseURL = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;
const axiosInstance = axios.create({ baseURL });

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

const makeRequest = async (method, url, data = null, params = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const createGradeClass = async (newData) => {
  return makeRequest("post", "/gradeClasses/", newData);
};

export const getGradeClasses = async () => {
  return makeRequest("get", "/gradeClasses");
};

export const getGradeClassById = async (id) => {
  return makeRequest("get", `/gradeClasses/${id}`);
};

export const UpdateGradeClass = async (id, newData) => {
  return makeRequest("put", `/gradeClasses/${id}`, newData);
};

export const getGradeClassByCourse = async (id) => {
  return makeRequest("get", `/gradeClasses/course/${id}`);
};

export const getGradeClassStudents = async (id, isPoints) => {
  return makeRequest("get", `/gradeClasses/${id}/students`, null, {
    points: isPoints || false,
  });
};

export const takeAttendance = async (id, newData) => {
  return makeRequest("post", `/gradeClasses/${id}/attendance`, newData);
};

export const reTakeAttendance = async (id, newData) => {
  return makeRequest("patch", `/gradeClasses/${id}/attendance`, newData);
};

export const getAttendance = async (id, date, period) => {
  return makeRequest("get", `/gradeClasses/${id}/attendance`, null, {
    date,
    period,
  });
};

export const assignStudentToGradClass = async (gradClassId, studentId) => {
  return makeRequest("patch", `/gradeClasses/${gradClassId}/students/${studentId}`);
};

export const removeStudentFromGradClass = async (gradClassId, studentId) => {
  return makeRequest("delete", `/gradeClasses/${gradClassId}/students/${studentId}`);
};

export const assignCourseToGradClass = async (gradClassId, courseId) => {
  return makeRequest("patch", `/gradeClasses/${gradClassId}/courses/${courseId}`);
};

export const removeCourseFromGradClass = async (gradClassId, courseId) => {
  return makeRequest("delete", `/gradeClasses/${gradClassId}/courses/${courseId}`);
};
