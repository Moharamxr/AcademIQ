import React from "react";
import Magnifier from "../../assets/Magnifier.png";
import LoginLogo from "../../assets/icons/LoginLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log(response);
      navigate("/home");
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
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
            <div className="flex flex-col gap-2 pt-3 pb-1">
              <label htmlFor="loginPassword ">Password</label>
              <input
                type="password"
                name="loginPassword"
                id="loginPassword"
                className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
                onChange={handlePasswordChange}
              />
            </div>
            <span className="float-end ">Forget Password?</span>
            <button
              className="bg-active w-full text-white text-center text-lg rounded-lg py-2 mt-6"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
