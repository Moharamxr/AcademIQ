import axios from "axios";
const path = import.meta.env.VITE_ACADEMIQ_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(
    `${path}/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Login successful");
  localStorage.setItem("token", response?.data?.token);
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", response?.data?.user?.role);
  localStorage.setItem("userId", response?.data?.user?._id);
  const fullName = `${response?.data?.user?.name?.first} ${response?.data?.user?.name?.last}`;
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("email", response?.data?.user?.email);
  if (response.data.user.role === "student") {
    localStorage.setItem(
      "gradeClassId",
      response?.data?.user?.gradeClass?.gradeClassId
    );
  }
  localStorage.setItem(
    "profilePictureUrl",
    response?.data?.user?.profilePicture?.url
  );
  localStorage.setItem(
    "profilePicture",
    response?.data?.user?.profilePicture?.color
  );
  if (response.data.user.role === "parent") {
    localStorage.setItem("firstChild", response?.data?.user?.children[0]?._id);
  }

  console.log(response?.data);
  return response.data;
};

export const forgotPassword = async (newData) => {
  const response = await axios.post(`${path}/users/password/forget`, newData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("forget Password set correctly");
  return response.data;
};

export const resetPassword = async (newData) => {
  console.log("resetPassword", newData);

  try {
    const response = await axios.post(`${path}/users/password/reset`, newData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Reset Password set correctly");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
