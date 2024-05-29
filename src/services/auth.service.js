import axios from "axios";
const path = "https://academiq.onrender.com";
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
    localStorage.setItem("gradeClassId", response?.data?.user?.gradeClassId);
  }
  localStorage.setItem('profilePictureUrl', response?.data?.user?.profilePicture?.url)
  localStorage.setItem('profilePicture', response?.data?.user?.profilePicture?.color)
  if (response.data.user.role === "parent") {
    localStorage.setItem("firstChild", response?.data?.user?.children[0]?._id);
  }
  
  console.log(response?.data);
  return response.data;
};
