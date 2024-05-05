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
import AssignmentsIcon from "../../../assets/icons/AssignmentsIcon.jsx";
import TodoListIcon from "../../../assets/icons/TodoListIcon.jsx";
import AttendanceIcon from "../../../assets/icons/AttendanceIcon.jsx";
import GradesIcon from "../../../assets/icons/GradesIcon.jsx";
import ExamsIcon from "../../../assets/icons/ExamsIcon.jsx";
import QuestionBankIcon from "../../../assets/icons/QuestionBankIcon.jsx";
import ClassesIcon from "../../../assets/icons/ClassesIcon.jsx";
import TeachersIcon from "../../../assets/icons/TeachersIcon.jsx";
import AdminsIcon from "../../../assets/icons/AdminsIcon.jsx";
import StudentsIcon from "../../../assets/icons/StudentsIcon.jsx";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const [nav, setNav] = useState({
    admin: [
      {
        name: "Home",
        icon: <HomeIcon />,
        activeIcon: <HomeIcon active={true} />,
        path: "/home",
        active: false,
      },
      {
        name: "Courses",
        icon: <MenuBookIcon sx={{ color: "#94A3B8" }} />,
        activeIcon: <MenuBookIcon sx={{ color: "#00769E" }} />,
        path: "/admin/courses",
        active: false,
      },
      {
        name: "Classes",
        icon: <ClassesIcon />,
        activeIcon: <ClassesIcon active={true} />,
        path: "/admin/classes",
        active: false,
      },
      {
        name: "Teachers",
        icon: <TeachersIcon color={"#94A3B8"} />,
        activeIcon: <TeachersIcon color={"#00769E"} />,
        path: "/admin/teachers",
        active: false,
      },
      {
        name: "Students",
        icon: <StudentsIcon color={"#94A3B8"} />,
        activeIcon: <StudentsIcon color={"#00769E"} />,
        path: "/admin/students",
        active: false,
      },
      {
        name: "Parents",
        icon: <FamilyRestroomIcon sx={{ color: "#94A3B8" }} />,
        activeIcon: <FamilyRestroomIcon sx={{ color: "#00769E" }} />,
        path: "/admin/parents",
        active: false,
      },
      {
        name: "Admins",
        icon: <AdminsIcon color={"#94A3B8"} />,
        activeIcon: <AdminsIcon color={"#00769E"} />,
        path: "/admin/admins",
        active: false,
      },
    ],

    parent: [
      {
        name: "Home",
        icon: <HomeIcon />,
        activeIcon: <HomeIcon active={true} />,
        path: "/home",
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
            id: 1355,
          },
          {
            name: "Wade Cooper",
            image: SecondChildImage,
            id: 2555,
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
    ],
    student: [
      {
        name: "Home",
        icon: <HomeIcon />,
        activeIcon: <HomeIcon active={true} />,
        path: "/home",
        active: false,
      },
      {
        name: "Courses",
        icon: <ClassesIcon />,
        activeIcon: <ClassesIcon active={true} />,
        path: "/courses",
        active: false,
      },
      {
        name: "To Do List",
        icon: <TodoListIcon />,
        activeIcon: <TodoListIcon active={true} />,
        path: "/todolist",
        active: false,
      },
      {
        name: "Assignments",
        icon: <AssignmentsIcon />,
        activeIcon: <AssignmentsIcon active={true} />,
        path: "/assignments",
        active: false,
      },
      {
        name: "Exams",
        icon: <ExamsIcon />,
        activeIcon: <ExamsIcon active={true} />,
        path: "/exams",
        active: false,
      },
    ],
    teacher: [
      {
        name: "Home",
        icon: <HomeIcon />,
        activeIcon: <HomeIcon active={true} />,
        path: "/home",
        active: false,
      },
      {
        name: "Courses",
        icon: <ClassesIcon />,
        activeIcon: <ClassesIcon active={true} />,
        path: "/courses",
        active: false,
      },
      {
        name: "Question Bank",
        icon: <QuestionBankIcon />,
        activeIcon: <QuestionBankIcon active={true} />,
        path: "/question-bank",
        active: false,
      },
      {
        name: "Exams",
        icon: <ExamsIcon />,
        activeIcon: <ExamsIcon active={true} />,
        path: "/exams",
        active: false,
      },
      {
        name: "Grades",
        icon: <GradesIcon />,
        activeIcon: <GradesIcon active={true} />,
        path: "/grades",
        active: false,
      },
      {
        name: "Attendance",
        icon: <AttendanceIcon />,
        activeIcon: <AttendanceIcon active={true} />,
        path: "/attendance",
        active: false,
      },
    ],
  });
  const staticNavBar = [
    {
      name: "Setting",
      icon: <SettingIcon />,
      activeIcon: <SettingIcon active={true} />,
      path: "/setting",
      active: false,
    },
    {
      name: "Support & Help",
      icon: <SupportIcon />,
      activeIcon: <SupportIcon active={true} />,
      path: "/support",
      active: false,
    },
    {
      name: "Logout",
      icon: <SignOutIcon />,
      activeIcon: <SignOutIcon active={true} />,
      path: "/",
      active: false,
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (role && nav[role]) {
      setNav((prevNavBar) => {
        const updatedNav = {
          ...prevNavBar,
          [role]: prevNavBar[role].map((item) => ({
            ...item,
            active: path.includes(item.path),
          })),
        };
        return updatedNav;
      });
    }
  }, [location.pathname, role]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("token", "");
    localStorage.removeItem("role", "");
    localStorage.removeItem("userId", "");
    localStorage.removeItem("fullName", "");
    localStorage.removeItem("email", "");
    window.location.href = "/";
  };

  return (
    <nav className="w-full min-w-[fit-content] h-full  max-h-[45rem] min-h-min bg-white rounded-2xl">
      <div className="py-10 flex justify-center items-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-4 mx-auto px-6 pb-6">
        {nav[role] &&
          nav[role].map((item, index) => (
            <div key={index}>
              {item.name !== "Child" ? (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex p-1 px-4 py-2 cursor-pointer space-x-4 transition-colors border-l-[3px] rounded-[3px] ${
                      isActive ? "bg-active-bg border-active " : "border-white"
                    } hover:bg-active-bg`
                  }
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
                    item.active
                      ? "bg-active-bg  border-active "
                      : "border-white "
                  } hover:bg-active-bg`}
                  key={item.path}
                >
                  <NavLink to={item.path} className="between space-x-4">
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
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <div className="flex space-x-4 hover:bg-white rounded-xl">
                          <img
                            src={child.image}
                            alt={child.name}
                            className="aspect-square"
                          />
                          <p className="font-poppins text-[10px] leading-6 tracking-normal text-left text-active flex-shrink-0">
                            {child.name}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>

      <hr />

      <div className="flex flex-col gap-4 mx-auto px-6 pt-6 pb-[48px]">
        {staticNavBar.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={item.name === "Logout" ? handleLogout : null}
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
