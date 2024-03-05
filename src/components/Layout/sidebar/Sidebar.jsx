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
  const [navBar, setNavBar] = useState([
    {
      name: "Home",
      icon: <HomeIcon />,
      activeIcon: <HomeIcon active={true} />,
      path: "/",
      active: false,
    },
    {
      name: "Child",
      icon: <ChildIcon />,
      activeIcon: <ChildIcon active={true} />,
      path: "/child",
      active: false,
      children: [
        {
          name: "Jane Cooper",
          image: FirstChildImage,
          id: 1,
        },
        {
          name: "Wade Cooper",
          image: SecondChildImage,
          id: 2,
        },
      ],
    },
    {
      name: "Connect",
      icon: <ConnectIcon />,
      activeIcon: <ConnectIcon active={true} />,
      path: "/connect",
      active: false,
    },
    {
      name: "Report",
      icon: <ReportIcon />,
      activeIcon: <ReportIcon active={true} />,
      path: "/report",
      active: false,
    },
  ]);
  const staticNavBar = [
    {
      name: "Setting",
      icon: <SettingIcon />,
      activeIcon : <SettingIcon active={true} />,
      path: "/setting",
      active: false,
    },
    {
      name: "Support & Help",
      icon: <SupportIcon />,
      activeIcon : <SupportIcon active={true} />,
      path: "/support",
      active: false,
    },
    {
      name: "Logout",
      icon: <SignOutIcon />,
      activeIcon : <SignOutIcon active={true} />,
      path: "/logout",
      active: false,
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    setNavBar((prevNavBar) =>
      prevNavBar.map((item) => ({
        ...item,
        active: item.path === path,
      }))
    );
  }, [location.pathname]);

  return (
    <nav className="w-full min-w-[fit-content] min-h-full bg-white rounded-2xl">
      <div className="py-10 flex justify-center items-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-4 mx-auto px-6 pb-6">
        {navBar.map((item, index) => (
          <>
            {item.name !== "Child" ? (
              <NavLink
                key={index}
                to={item.path}
                className={`flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px] rounded-[3px] ${
                  item.active ? "bg-active-bg border-active" : "border-white"
                } hover:bg-active-bg`}
              >
                {!item.active ? item.icon : item.activeIcon}
                <p
                  className={`font-poppins text-sm leading-6 tracking-normal text-left ${
                    item.active ? "text-active" : "text-default"
                  }`}
                >
                  {item.name}
                </p>
              </NavLink>
            ) : (
              <div
                className={`p-1 px-4 py-2  cursor-pointer  border-l-[3px] rounded-[3px] ${
                  item.active ? "bg-active-bg  border-active " : "border-white "
                } hover:bg-active-bg`}
                key={index}
              >
                <NavLink
                  key={index}
                  to={item.path}
                  className="between space-x-4"
                >
                  <div className="flex space-x-4">
                    <ChildIcon active={item.active} />
                    <p
                      className={`font-poppins text-sm leading-6 tracking-normal text-left ${
                        item.active ? "text-active" : "text-default h-1"
                      } `}
                    >
                      {item.name}
                    </p>
                  </div>
                  <UpCursor active={item.active} />
                </NavLink>
                <ul
                  className={`list space-y-4 mt-3 ${
                    item.active ? "active" : ""
                  }`}
                >
                  {item.children.map((child, index) => () => {
                    return (
                      <li key={index}>
                        <div className="flex space-x-4 hover:bg-white rounded-xl">
                          <img
                            src={child.image}
                            alt="FirstChild"
                            className="aspect-square"
                          />
                          <p
                            className={`font-poppins text-[10px] leading-6 tracking-normal text-left text-active flex-shrink-0 
                  `}
                          >
                            {child.name}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        ))}
      </div>

      <hr />

      <div className="flex flex-col gap-4 mx-auto px-6 pt-6 pb-2">
        {staticNavBar.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px] rounded-[3px] border-white hover:bg-active-bg"
          >
                {!item.active ? item.icon : item.activeIcon}
            <p className="font-poppins text-sm leading-6 tracking-normal text-left text-default">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
