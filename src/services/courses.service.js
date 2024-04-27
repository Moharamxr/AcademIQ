
import axios from "axios";
const path = "https://academiq.onrender.com";

export const createCourse = async (newData) => {
    const token = localStorage.getItem("token");
    console.log(newData);
    const response = await axios.post(`${path}/courses`, newData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    console.log(response.data.message);
  
    console.log(response.data);
    return response.data;
  };
  export const getGradeCourses = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${path}/courses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    console.log(response.data.message);
  
    console.log(response.data);
    return response.data;
  };
  export const getCourseById = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${path}/courses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    console.log(response.data.message);
    console.log(response.data);
    return response.data;
  };
  export const updateCourse = async (id, newData) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${path}/courses/${id}`, newData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    console.log(response.data.message);
    console.log(response.data);
    return response.data;
  };