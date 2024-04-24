import axios from "axios";
const path = "http://13.60.57.85";
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
  console.log(response.data);
  return response.data;
};
