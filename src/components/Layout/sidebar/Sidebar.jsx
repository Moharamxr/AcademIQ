import React, { useState, useEffect } from "react";
import Logo from "../../../assets/Logo.jsx";
import HomeIcon from "../../../assets/icons/HomeIcon.jsx";
import "./style.css";
import ChildIcon from "../../../assets/icons/ChildIcon.jsx";
import UpCursor from "../../../assets/icons/UpCursor.jsx";
import ConnectIcon from "../../../assets/icons/ConnectIcon.jsx";
import ReportIcon from "../../../assets/icons/ReportIcon.jsx";
import FirstChildImage from "../../../assets/FirstChild.png";
import SecondChildImage from "../../../assets/secondChild.png";
import SettingIcon from "../../../assets/icons/SettingIcon.jsx";
import SignOutIcon from "../../../assets/icons/SignoutIcon.jsx";
import SupportIcon from "../../../assets/icons/SupportIcon.jsx";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activeChild, setActiveChild] = useState(false);
  const [activeConnect, setActiveConnect] = useState(false);
  const [activeReport, setActiveReport] = useState(false);
  const [activeHome, setActiveHome] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);
  const [activeSupport, setActiveSupport] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    setActiveHome(path === "/");
    setActiveChild(path.includes("/child"));
    setActiveConnect(path.includes("/connect"));
    setActiveReport(path.includes("/report"));
    setActiveSetting(path.includes("/setting"));
    setActiveSupport(path.includes("/support"));
  }, [location.pathname]);

  return (
    <nav className="w-full min-w-[fit-content] max-h-[45rem] min-h-[45rem]  bg-white rounded-2xl">
      <div className="py-10 flex justify-center items-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-4 mx-auto px-6 pb-6 ">
        <NavLink
          to={"/"}
          className={` flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px] rounded-[3px] ${
            activeHome ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <HomeIcon active={activeHome} />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left ${
              activeHome ? "text-active" : "text-default"
            } `}
          >
            Home
          </p>
        </NavLink>

        <div
          className={`p-1 px-4 py-2  cursor-pointer  border-l-[3px] rounded-[3px] ${
            activeChild ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <NavLink to={"/child"} className="between space-x-4">
            <div className="flex space-x-4">
              <ChildIcon active={activeChild} />
              <p
                className={`font-poppins text-sm leading-6 tracking-normal text-left ${
                  activeChild ? "text-active" : "text-default h-1"
                } `}
              >
                Child
              </p>
            </div>
            <UpCursor active={activeChild} />
          </NavLink>
          <ul className={`list space-y-4 mt-3 ${activeChild ? "active" : ""}`}>
            <li>
              <div className="flex space-x-4 hover:bg-white rounded-xl">
                <img
                  src={FirstChildImage}
                  alt="FirstChild"
                  className="aspect-square"
                />
                <p
                  className={`font-poppins text-[10px] leading-6 tracking-normal text-left text-active flex-shrink-0 
                  `}
                >
                  Jane Cooper
                </p>
              </div>
            </li>
            <li>
              <div className="flex space-x-4 hover:bg-white rounded-xl">
                <img
                  src={SecondChildImage}
                  alt="SecondChild"
                  className="aspect-square"
                />
                <p
                  className={`font-poppins text-[10px] leading-6 tracking-normal text-left text-active flex-shrink-0 
                  `}
                >
                  Wade Cooper
                </p>
              </div>
            </li>
          </ul>
        </div>

        <NavLink
          to={"/connect"}
          className={`flex p-1 px-4 py-2 cursor-pointer space-x-4 rounded-[3px] border-l-[3px] ${
            activeConnect ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <ConnectIcon active={activeConnect} />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left ${
              activeConnect ? "text-active" : "text-default "
            }`}
          >
            Connect
          </p>
        </NavLink>

        <NavLink
          to={"/report"}
          className={`flex p-1 px-4 py-2 cursor-pointer space-x-3 rounded-[3px] border-l-[3px] ${
            activeReport ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <ReportIcon active={activeReport} />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left ${
              activeReport ? "text-active" : "text-default "
            }`}
          >
            Report
          </p>
        </NavLink>
      </div>

      <hr />

      <div className="flex flex-col gap-4 mx-auto px-6 pt-6 pb-2">
        <div
          className={` flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px]  rounded-[3px] ${
            activeSetting ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <SettingIcon active={!activeSetting} />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left ${
              activeSetting ? "text-active" : "text-default"
            } `}
          >
            Setting
          </p>
        </div>
        <div
          className={` flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px]  rounded-[3px] ${
            activeSupport ? "bg-active-bg  border-active " : "border-white "
          } hover:bg-active-bg`}
        >
          <SupportIcon active={!activeSupport} />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left ${
              activeSupport ? "text-active" : "text-default"
            } `}
          >
            Support & Help
          </p>
        </div>
        <div
          className={` flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors hover:bg-active-bg`}
        >
          <SignOutIcon />
          <p
            className={`font-poppins text-sm leading-6 tracking-normal text-left text-default`}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
