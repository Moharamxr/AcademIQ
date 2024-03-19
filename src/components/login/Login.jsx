import React from "react";
import Magnifier from "../../assets/Magnifier.png";
import LoginLogo from "../../assets/icons/LoginLogo";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex">
      <div className="w-2/6 bg-gradient-to-b from-active to-green-500 flex flex-col items-center pt-32  gap-8   ">
        <div>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center py-2">
            Welcome to
          </p>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center pt-4">
            AcademiQ
          </p>
        </div>
        <img src={Magnifier} alt="Magnifier" className="w-1/2 " />
      </div>
      <div className="bg-white w-4/6 flex flex-col items-center py-12  px-40 ">
        <LoginLogo w={50} h={20} />
        <div className="flex flex-col gap-8 w-full">
          <span className="font-poppins font-medium  text-3xl leading-10">
            Login
          </span>
          <div className="gap-5">
            <div className="flex flex-col gap-2 py-3">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                name="loginEmail"
                id="loginEmail"
                className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2 pt-3 pb-1">
              <label htmlFor="loginPassword ">Password</label>
              <input
                type="password"
                name="loginPassword"
                id="loginPassword"
                className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
              />
            </div>
            <span className="float-end ">Forget Password?</span>
            <button className="bg-active w-full text-white text-center text-lg rounded-lg py-2 mt-6" onClick={()=> navigate('/home')}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
