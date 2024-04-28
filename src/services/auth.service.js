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

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", response.data.user.role);
  localStorage.setItem("id", response.data.user._id);
  console.log(response.data);
  return response.data;
};
