import axios from "axios";
const path = "https://academiq.onrender.com";


export const getUsers = async (role) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/roles/${role}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const createUser = async (newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(`${path}/users/${newData.role}`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const getTeachersByCourse = async (courseId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/teachers/courses/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const getUsersCounts = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/counts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}