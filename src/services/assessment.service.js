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
    const response = await axiosInstance({
      method,
      url: `${path}${url}`,
      data,
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const buildQueryParams = (params) => {
  const validParams = Object.entries(params)
    .filter(([key, value]) => value !== null && value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return validParams ? `?${validParams}` : "";
};

export const createAssessment = (newData) =>
  apiRequest("post", "/assessments", newData);
export const updateAssessment = (id, newData) =>
  apiRequest("put", `/assessments/${id}`, newData);
export const addMaterialsToAssessment = (id, materials) =>
  apiRequest("patch", `/assessments/${id}/materials`, materials);
export const removeMaterialsToAssessment = (id, materialId) =>
  apiRequest("delete", `/assessments/${id}/materials/${materialId}`);
export const getAssessmentById = (id) =>
  apiRequest("get", `/assessments/${id}`);
export const getAssessmentByCourse = (id, type) =>
  apiRequest("get", `/assessments/courses/${id}${type ? `?type=${type}` : ""}`);
export const getAssessmentByStatus = (status, studentId, type) => {
  const params = buildQueryParams({ status, studentId, type });
  return apiRequest("get", `/assessments${params}`);
};
export const addMultiQuestionsToAssessment = (id, newData) =>
  apiRequest("patch", `/assessments/${id}/questions`, newData);
export const addNewQuestionToAssessment = (id, question) =>
  apiRequest("post", `/assessments/${id}/questions`, question);
export const deleteAssessmentQuestion = (assessmentId, questionId) =>
  apiRequest("delete", `/assessments/${assessmentId}/questions/${questionId}`);

export const createSubmission = (id) =>
  apiRequest("post", `/submissions/assessments/${id}`, {});
export const submitExamAnswers = (id, answers) =>
  apiRequest("patch", `/submissions/assessments/${id}/submit`, answers, {
    "Content-Type": "multipart/form-data",
  });
export const getStartedSubmission = (id) =>
  apiRequest("get", `/submissions/assessments/${id}/started`);
export const getSubmissionById = (id) =>
  apiRequest("get", `/submissions/${id}`);
export const getSubmissionByAssessment = (id) =>
  apiRequest("get", `/submissions/assessments/${id}`);
export const getSubmissionsByStudent = (id) =>
  apiRequest("get", `/submissions/students/${id}`);
export const getStudentSubmissionByAssessment = (assessmentId, studentId) =>
  apiRequest(
    "get",
    `/submissions/assessments/${assessmentId}/students/${studentId}`
  );
export const markAssessment = (id, data) =>
  apiRequest("patch", `/submissions/${id}/mark`, data);
