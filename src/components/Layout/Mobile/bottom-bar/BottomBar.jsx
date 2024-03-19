import styled from "@emotion/styled";
import React from "react";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import ChildIcon from "../../../../assets/icons/ChildIcon";
import ConnectIcon from "../../../../assets/icons/ConnectIcon";
import ReportIcon from "../../../../assets/icons/ReportIcon";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AssignmentsIcon from "../../../../assets/icons/AssignmentsIcon.jsx";
import TodoListIcon from "../../../../assets/icons/TodoListIcon.jsx";
import AttendanceIcon from "../../../../assets/icons/AttendanceIcon.jsx";
import GradesIcon from "../../../../assets/icons/GradesIcon.jsx";
import ExamsIcon from "../../../../assets/icons/ExamsIcon.jsx";
import QuestionBankIcon from "../../../../assets/icons/QuestionBankIcon.jsx";
import ClassesIcon from "../../../../assets/icons/ClassesIcon.jsx";
import TeachersIcon from "../../../../assets/icons/TeachersIcon.jsx";
import AdminsIcon from "../../../../assets/icons/AdminsIcon.jsx";
import StudentsIcon from "../../../../assets/icons/StudentsIcon.jsx";

const FixedBottomContent = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const BottomBar = () => {
  const location = useLocation();
  const role = "teacher";
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
        name: "Classes",
        icon: <ClassesIcon />,
        activeIcon: <ClassesIcon active={true} />,
        path: "/classes",
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
        name: "Classes",
        icon: <ClassesIcon />,
        activeIcon: <ClassesIcon active={true} />,
        path: "/classes",
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

  useEffect(() => {
    const path = location.pathname;
    if (role && nav[role]) {
      setNav((prevNavBar) => {
        const updatedNav = {
          ...prevNavBar,
          [role]: prevNavBar[role].map((item) => ({
            ...item,
            active: item.path === path,
          })),
        };
        return updatedNav;
      });
    }
  }, [location.pathname, role]);

  return (
    <FixedBottomContent className={"bg-white  min-h-12  flex md:hidden px-2 gap-x-1 min-w-full"}>
      {nav[role].map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={`w-1/${nav[role].length} p-2  border-t-4 ${
            item.active && "border-t-active-br"
          } between flex-col rounded-sm items-center`}
        >
          {item.active ? item.activeIcon : item.icon}
          <p
            className={`font-poppins text-xs leading-6 tracking-normal text-center ${
              item.active ? "text-active" : "text-default"
            } `}
          >
            {item.name}
          </p>
        </NavLink>
      ))}
    </FixedBottomContent>
  );
};

export default BottomBar;
