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


export const createTimetablePeriod = async (gradeClassId, newData) => {
  return makeRequest("patch", `${baseURL}/gradeClasses/${gradeClassId}/timetables`, newData);
};

export const getClassTimetable = async (gradeClassId) => {
  return makeRequest("get", `${baseURL}/gradeClasses/${gradeClassId}/timetables`);
};

export const getTeacherTimetable = async (teacherId) => {
  return makeRequest("get", `${baseURL}/users/${teacherId}/timetables`);
};

export const deleteTimetablePeriod = async (gradeClassId, periodId) => {
  return makeRequest("delete", `${baseURL}/gradeClasses/${gradeClassId}/timetables/${periodId}`);
};
