import axios from "axios";
const path = "https://academiq.onrender.com";

export const createTimetablePeriod = async (newData) => {
  const token = localStorage.getItem("token");
  console.log(newData);
  const response = await axios.patch(
    `${path}/gradeClasses/${newData.id}/timetables`,
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

export const getClassTimetable = async (id) => {

  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/gradeClasses/${id}/timetables`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}

export const deleteTimetablePeriod = async (gradeClassId,periodId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${path}/gradeClasses/${gradeClassId}/timetables/${periodId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}