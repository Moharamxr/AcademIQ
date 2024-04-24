import axios from "axios";
const path = "http://13.60.57.85";

export const createGradeClass = async (newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(
    `${path}/gradeClasses/`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
export const createCourse = async (newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(
    `${path}/courses`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
export const getUsers = async (role) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/${role}`, {
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
  const response = await axios.post(
    `${path}/users/${newData.role}`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}
