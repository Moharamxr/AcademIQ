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


export const sendReport = async (newData) => {
  return makeRequest("post", "/reports", newData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getReport = async (id, markAsSeen) => {
  const params = markAsSeen ? { markAsSeen } : null;
  return makeRequest("get", `/reports/${id}`, null, params);
};

export const getUserReport = async (sent) => {
  const params = sent ? { sent } : null;
  return makeRequest("get", "/reports", null, params);
};

export const replayReport = async (id, newData) => {
  return makeRequest("post", `/reports/${id}/reply`, newData);
};
