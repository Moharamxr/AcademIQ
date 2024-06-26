import React, { useState } from "react";
import Magnifier from "../../assets/Magnifier.png";
import LoginLogo from "../../assets/icons/LoginLogo";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";
import { LinearProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const isValidData = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email");
      return false;
    }
    if (email === "" || password === "") {
      setErrorMessage("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    if (isValidData()) {
      try {
        setIsLoading(true);
        const data = await login(email, password);
        const newUserData = {
          name: data?.user?.name,
          _id: data?.user?._id,
          userId: data?.user?.userId,
          username: data?.user?.username,
          email: data?.user?.email,
          role: data?.user?.role,
          courses: data?.user?.courses,
        };
        dispatch(setUserData(newUserData));
        setIsLoading(false);

        setErrorMessage("");
        navigate("/home");
      } catch (error) {
        console.error("ERR", error);
        setIsLoading(false);
        setErrorMessage(error.response.data.error);
      }
    }
  };


  return isLoggedIn ? (
    <Navigate to="/home" />
  ) : (
    <div className="w-full h-screen flex">
      <div className="w-2/6 hidden bg-gradient-to-b from-active to-green-500 md:flex flex-col items-center pt-32  gap-8   ">
        <div>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center py-2">
            Welcome to
          </p>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center pt-4">
            AcademIQ
          </p>
        </div>
        <img src={Magnifier} alt="Magnifier" className="w-1/2 " />
      </div>
      <div className="bg-white md:w-4/6 w-full flex flex-col items-center gap-9 py-12 px-5  xl:px-40 lg:px-24 md:px-20">
        <LoginLogo />
        <div className="flex flex-col gap-8 w-full">
          <div className="">
            <p className="text-center text-red-600 font-semibold">
              {errorMessage}
            </p>
            <div className="flex flex-col gap-2 py-3">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                name="loginEmail"
                id="loginEmail"
                className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col gap-2 pt-3 pb-1 relative">
              <label htmlFor="loginPassword">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="loginPassword"
                id="loginPassword"
                className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
                onChange={handlePasswordChange}
              />
              <span
                className="absolute bottom-3 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <span className="float-end select-none cursor-pointer" onClick={()=>navigate('/forgot-password')}>
              Forget Password?
            </span>
            <button
              className="bg-active w-full text-white text-center text-lg rounded-lg py-2 mt-6"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className=" py-3 ">
                  <LinearProgress
                    variant="buffer"
                    value={0}
                    valueBuffer={0}
                    className="w-2/3"
                  />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
