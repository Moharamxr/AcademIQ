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

export const createChat = async (newData) => {
  try {
    const response = await axiosInstance.post(`${path}/chats`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const updateChat = async (id, newData) => {
  try {
    const response = await axiosInstance.put(`${path}/chats/${id}`, newData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getMyChats = async () => {
  try {
    const response = await axiosInstance.get(`${path}/chats`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
export const addMemberToChat = async (chatId, memberId) => {
  try {
    const response = await axiosInstance.patch(
      `${path}/chats/${chatId}/users/${memberId}`,
      {}
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
export const removeMemberToChat = async (chatId, memberId) => {
  try {
    const response = await axiosInstance.delete(
      `${path}/chats/${chatId}/users/${memberId}`,
      {}
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const response = await axiosInstance.post(
      `${path}/chats/${chatId}/messages`,
      message
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `${path}/chats/${chatId}/messages`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getChatMessageWithAttachment = async (chatId, messageId) => {
  try {
    const response = await axiosInstance.get(
      `${path}/chats/${chatId}/messages/${messageId}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getChatWithUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`${path}/chats/users/${userId}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
