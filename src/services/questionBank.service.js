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

export const getQuestionBanks = async (level) => {
  try {
    const response = await axiosInstance.get(
      `${path}/questionBanks?level=${level||''}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getQuestionBankById = async (id) => {
  try {
    const response = await axiosInstance.get(`${path}/questionBanks/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const createQuestionBank = async (newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/questionBanks/`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updateQuestionBank = async (id, newData) => {
  try {
    const response = await axiosInstance.put(
      `${path}/questionBanks/${id}`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const addQuestion = async (id, newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/questionBanks/${id}/questions`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updateQuestion = async (bankId, questionId, newData) => {
  try {
    const response = await axiosInstance.put(
      `${path}/questionBanks/${bankId}/questions/${questionId}`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const getQuestionById = async (bankId, questionId) => {
  try {
    const response = await axiosInstance.get(
      `${path}/questionBanks/${bankId}/questions/${questionId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
