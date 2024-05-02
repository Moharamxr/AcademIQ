import axios from "axios";
const path = "https://academiq.onrender.com";

export const createGradeClass = async (newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(`${path}/gradeClasses/`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};
export const getGradeClasses = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/gradeClasses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const getGradeClassById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/gradeClasses/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};
export const UpdateGradeClass = async (id,newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.put(`${path}/gradeClasses/${id}`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const takeAttendance = async (id,newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(`${path}/gradeClasses/${id}/attendance`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}

export const getGradeClassByCourse = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/gradeClasses/course/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}