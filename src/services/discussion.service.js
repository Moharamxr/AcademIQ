import axios from "axios";
const path = "https://academiq.onrender.com";

export const getDiscussion = async (courseId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/discussions/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
};

export const createPost = async ( post) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${path}/discussions/posts`,
    post,
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

export const likePost = async (postId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${path}/discussions/posts/likes/${postId}`,
    {},
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

export const addComment = async (postId, comment) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${path}/discussions/posts/comments/${postId}`,
    comment,
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

export const getPostComments = async (postId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/discussions/posts/comments/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data.message);

  console.log(response.data);
  return response.data;
}