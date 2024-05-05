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

export const createGradeClass = async (newData) => {
  try {
    const response = await axiosInstance.post(`${path}/gradeClasses/`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getGradeClasses = async () => {
  try {
    const response = await axiosInstance.get(`${path}/gradeClasses`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getGradeClassById = async (id) => {
  try {
    const response = await axiosInstance.get(`${path}/gradeClasses/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const UpdateGradeClass = async (id, newData) => {
  try {
    const response = await axiosInstance.put(
      `${path}/gradeClasses/${id}`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getGradeClassByCourse = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${path}/gradeClasses/course/${id}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getGradeClassStudents = async (id, isPoints) => {
  try {
    const response = await axiosInstance.get(
      `${path}/gradeClasses/${id}/students?points=${isPoints || false}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const takeAttendance = async (id, newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/gradeClasses/${id}/attendance`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const reTakeAttendance = async (id, newData) => {
  try {
    const response = await axiosInstance.patch(
      `${path}/gradeClasses/${id}/attendance`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getAttendance = async (id, date, period) => {
  try {
    const response = await axiosInstance.get(
      `${path}/gradeClasses/${id}/attendance?date=${date}&period=${period}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
