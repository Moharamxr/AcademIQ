import axios from "axios";
import io from "socket.io-client";

const path = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;

// Initialize WebSocket connection
export const socket = io(path, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const axiosInstance = axios.create();

// Axios request interceptor to add Authorization header
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

// Helper function to handle successful responses
const handleResponse = (response) => {
  console.log(response.data.message);
  console.log(response.data);
  return response.data;
};

// Helper function to handle errors
const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    console.log("User is unauthorized. Logging out...");
    // Clear local storage on unauthorized access
    ["token", "userId", "role", "isLoggedIn", "fullName", "email"].forEach((item) => localStorage.removeItem(item));
    // Redirect to login page
    window.location.href = "/login";
  } else {
    console.error("Error occurred:", error);
    throw error;
  }
};

// General function for making API requests
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

// Chat API functions
export const createChat = (newData) => apiRequest("post", "/chats", newData);
export const updateChat = (id, newData) => apiRequest("put", `/chats/${id}`, newData);
export const getMyChats = () => apiRequest("get", "/chats");
export const addMemberToChat = (chatId, memberId) => apiRequest("patch", `/chats/${chatId}/users/${memberId}`, {});
export const removeMemberFromChat = (chatId, memberId) => apiRequest("delete", `/chats/${chatId}/users/${memberId}`, {});
export const sendMessage = (chatId, message) => apiRequest("post", `/chats/${chatId}/messages`, message, {
  "Content-Type": "multipart/form-data",
});
export const getChatMessages = (chatId) => apiRequest("get", `/chats/${chatId}/messages`);
export const getChatMessageWithAttachment = (chatId, messageId) => apiRequest("get", `/chats/${chatId}/messages/${messageId}`);
export const getChatWithUser = (userId) => apiRequest("get", `/chats/users/${userId}`);

// Function to listen for new chat messages via WebSocket
export const subscribeToChatMessages = (chatId, callback) => {
  socket.on(`chat:${chatId}`, (message) => {
    callback(message);
  });
};

// Function to stop listening for chat messages
export const unsubscribeFromChatMessages = (chatId) => {
  socket.off(`chat:${chatId}`);
};
