import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LinearProgress } from "@mui/material";
import Magnifier from "../../assets/Magnifier.png";
import LoginLogo from "../../assets/icons/LoginLogo";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handleSsnChange = (event) => {
    setSsn(event.target.value);
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
    if (ssn.trim() === "") {
      setErrorMessage("Please enter your SSN");
      return false;
    }
    if (password.trim() === "") {
      setErrorMessage("Please enter a new password");
      return false;
    }
    return true;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isValidData()) {
      setIsLoading(true);
      const newData = {
        email,
        ssn,
        password,
      };
      try {
        await forgotPassword(newData);
        setErrorMessage("");
        navigate("/login"); // Navigate to login page after successful password reset
      } catch (error) {
        console.error("Forgot password error:", error);
        setIsLoading(false);
        setErrorMessage(error.response?.data?.error || "Failed to reset password");
      }
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left side of the screen */}
      <div className="w-2/6 hidden bg-gradient-to-b from-active to-green-500 md:flex flex-col items-center pt-32 gap-8">
        <div>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center py-2">
            Welcome to
          </p>
          <p className="font-poppins font-medium text-white text-5xl leading-10 text-center pt-4">
            AcademIQ
          </p>
        </div>
        <img src={Magnifier} alt="Magnifier" className="w-1/2" />
      </div>

      {/* Right side of the screen */}
      <div className="bg-white md:w-4/6 w-full flex flex-col items-center gap-9 py-12 px-5 xl:px-40 lg:px-24 md:px-20">
        {/* Logo */}
        <div className="w-full center">
          <LoginLogo />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md">
          <h2 className="text-2xl leading-10 text-center py-2">Forgot Password</h2>
          {errorMessage && (
            <p className="text-center text-red-600 font-semibold">{errorMessage}</p>
          )}

          {/* Email input */}
          <div className="flex flex-col gap-2 py-3">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* SSN input */}
          <div className="flex flex-col gap-2 py-3">
            <label htmlFor="loginSsn">SSN</label>
            <input
              type="text"
              name="loginSsn"
              id="loginSsn"
              className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
              value={ssn}
              onChange={handleSsnChange}
              required
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2 pt-3 pb-1 relative">
            <label htmlFor="loginPassword">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="loginPassword"
              id="loginPassword"
              className="border-2 border-gray-200/70 rounded-lg px-5 h-11 outline-none text-gray-600"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="absolute bottom-3 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit button */}
          <button
            className="bg-active w-full text-white text-center text-lg rounded-lg py-2 mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="py-3">
                <LinearProgress variant="buffer" value={0} valueBuffer={0} className="w-2/3" />
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
