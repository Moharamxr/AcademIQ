import axios from "axios";
const path = "https://academiq.onrender.com";

export const getQuestionBanks = async (level) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/questionBanks?level=${level}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};
export const getQuestionBankById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/questionBanks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const createQuestionBank = async (newData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${path}/questionBanks/`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const updateQuestionBank = async (id, newData) => {
  const token = localStorage.getItem("token");
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

export const addQuestion = async (id, newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.post(
    `${path}/questionBanks/${id}/questions`,
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

export const getQuestionById = async (bankId,questionId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/questionBanks/${bankId}/questions/${questionId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};
