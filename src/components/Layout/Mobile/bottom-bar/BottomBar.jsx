import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../../../assets/icons/HomeIcon";
import ChildIcon from "../../../../assets/icons/ChildIcon";
import ConnectIcon from "../../../../assets/icons/ConnectIcon";
import ReportIcon from "../../../../assets/icons/ReportIcon";
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
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const FixedBottomContent = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 5px;
  text-decoration: none;
  color: #94a3b8;

  &.active {
    color: #00769e;
    border-top: 4px solid #00769e;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 5px;
`;

const Label = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  margin: 0;
`;

const BottomBar = () => {
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
      {
        name: "Report",
        icon: <ReportIcon />,
        activeIcon: <ReportIcon active={true} />,
        path: "/report",
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
        path: `/child`,
        active: false,
      },
      {
        name: "Report",
        icon: <ReportIcon />,
        activeIcon: <ReportIcon active={true} />,
        path: "/report",
        active: false,
      },
      {
        name: "Connect",
        icon: <ConnectIcon />,
        activeIcon: <ConnectIcon active={true} />,
        path: "/connect",
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
      {
        name: "Connect",
        icon: <ConnectIcon />,
        activeIcon: <ConnectIcon active={true} />,
        path: "/connect",
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
      {
        name: "Assignments",
        icon: <AssignmentsIcon />,
        activeIcon: <AssignmentsIcon active={true} />,
        path: "/assignments",
        active: false,
      },
      {
        name: "Report",
        icon: <ReportIcon />,
        activeIcon: <ReportIcon active={true} />,
        path: "/report",
        active: false,
      },
      {
        name: "Connect",
        icon: <ConnectIcon />,
        activeIcon: <ConnectIcon active={true} />,
        path: "/connect",
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
            active: path.includes(item.path),
          })),
        };
        return updatedNav;
      });
    }
  }, [location.pathname, role]);

  return (
    <FixedBottomContent>
      {nav[role].map((item, index) => (
        <NavItem
          key={index}
          to={item.path}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <IconWrapper>{item.active ? item.activeIcon : item.icon}</IconWrapper>
          <Label className={item.active ? "text-active" : "text-default"}>
            {item.name}
          </Label>
        </NavItem>
      ))}
    </FixedBottomContent>
  );
};

export default BottomBar;
