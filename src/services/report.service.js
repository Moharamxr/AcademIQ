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

export const sendReport = async (newData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${path}/reports`, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getReport = async (id, markAsSeen) => {
  const seenParams = markAsSeen ? `?markAsSeen=${markAsSeen}` : "";
  try {
    const response = await axiosInstance.get(
      `${path}/reports/${id}${seenParams``}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getUserReport = async (sent) => {
  const sentParams = sent ? `?sent=${sent}` : "";
  try {
    const response = await axiosInstance.get(`${path}/reports${sentParams}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const replayReport = async (id, newData) => {
  try {
    const response = await axiosInstance.post(
      `${path}/reports/${id}/reply`,
      newData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
