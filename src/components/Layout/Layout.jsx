import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./top-bar/TopBar";
import BottomBar from "./Mobile/bottom-bar/BottomBar";
import MobileTopBar from "./Mobile/top-bar/MobileTopBar";
import Login from "../login/Login";
import { useNavigate, useLocation } from "react-router-dom";
import ForgotPassword from "../login/ForgotPassword";

const Layout = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  useEffect(() => {
    if ((!isLoggedIn && (path !== "/") && path !== "/forgot-password")) {
      console.log("Not logged in");
      navigate("/");
    }
  }, [isLoggedIn, path, navigate]);
  return isLoggedIn ? (
    <main className="flex gap-4  w-full md:p-5 p-0  pt-14 md:pb-4 md:pt-5 pb-14">
      <section className="hidden  md:block md:w-2/6 lg:w-3/12 xl:w-1/6  ">
        <Sidebar />
      </section>

      <section className="w-full lg:w-9/12 md:w-4/6 xl:w-5/6 ">
        <MobileTopBar />
        <div className=" flex-shrink-0 overflow-hidden  pt-0 hidden md:block">
          <TopBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 pb-4 md:pb-0 ">
          {props.children}
        </div>
      </section>
      <BottomBar />
    </main>
  ) : path === "/" ? (
    <Login />
  ) : (
    <ForgotPassword />
  );
};

export default Layout;
