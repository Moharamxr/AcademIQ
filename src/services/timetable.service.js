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

export const createTimetablePeriod = async (newData) => {
  try {
    const response = await axiosInstance.patch(
      `${path}/gradeClasses/${newData.id}/timetables`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getClassTimetable = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${path}/gradeClasses/${id}/timetables`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
export const getTeacherTimetable = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${path}/users/${id}/timetables`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const deleteTimetablePeriod = async (gradeClassId, periodId) => {
  try {
    const response = await axiosInstance.delete(
      `${path}/gradeClasses/${gradeClassId}/timetables/${periodId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
