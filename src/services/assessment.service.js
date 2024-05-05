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

export const createAssessment = async (newData) => {
  try {
    const response = await axiosInstance.post(`${path}/assessments`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updateAssessment = async (id, newData) => {
  try {
    const response = await axiosInstance.put(
      `${path}/assessments/${id}`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getAssessmentById = async (id) => {
  try {
    const response = await axiosInstance.get(`${path}/assessments/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getAssessmentByCourse = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${path}/assessments/course/${id}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const addMultiQuestionsToAssessment = async (id, newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/assessments/${id}/questions`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const addNewQuestionToAssessment = async (id, question) => {
  try {
    const response = await axiosInstance.post(
      `${path}/assessments/${id}/questions`,
      question
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
