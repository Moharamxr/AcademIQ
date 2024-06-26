import axios from "axios";
import io from "socket.io-client";

const path = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;

export const socket = io(path, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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

    ["token", "userId", "role", "isLoggedIn", "fullName", "email"].forEach(
      (item) => localStorage.removeItem(item)
    );
    window.location.href = "/";
  } else {
    console.error("Error occurred:", error);
    throw error;
  }
};

const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const config = {
      method,
      url: `${path}${url}`,
      data,
      headers: {
        ...headers,
      },
    };

    const response = await axiosInstance(config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const createChat = (newData) => apiRequest("post", "/chats", newData);
export const updateChat = (id, newData) =>
  apiRequest("put", `/chats/${id}`, newData);
export const getMyChats = () => apiRequest("get", "/chats");
export const addMemberToChat = (chatId, memberId) =>
  apiRequest("patch", `/chats/${chatId}/users/${memberId}`, {});
export const removeMemberFromChat = (chatId, memberId) =>
  apiRequest("delete", `/chats/${chatId}/users/${memberId}`, {});
export const sendMessage = (chatId, message) =>
  apiRequest("post", `/chats/${chatId}/messages`, message, {
    "Content-Type": "multipart/form-data",
  });
export const getChatMessages = (chatId) =>
  apiRequest("get", `/chats/${chatId}/messages`);
export const getChatMessageWithAttachment = (chatId, messageId) =>
  apiRequest("get", `/chats/${chatId}/messages/${messageId}`);
export const getChatWithUser = (userId) =>
  apiRequest("get", `/chats/users/${userId}`);

export const subscribeToChatMessages = (chatId, callback) => {
  socket.on(`chat:${chatId}`, (message) => {
    callback(message);
  });
};

export const unsubscribeFromChatMessages = (chatId) => {
  socket.off(`chat:${chatId}`);
};

export const createMeetingRoom = (newData) =>
  apiRequest("post", "/rooms/", newData);
