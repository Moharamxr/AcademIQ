import React from "react";
import { Routes } from "react-router-dom";
import Connect from "../components/connect/Connect";
import Report from "../components/Report/Report";
import Parent from "../components/Parent/home/Parent";
import { Route } from "react-router-dom";
import ToDoPage from "../components/Student/todo-list/ToDoPage";
import StuAssignments from "../components/Student/assignments/StuAssignments";
import Child from "../components/Parent/child/Child";
import Teacher from "../components/Teacher/home/Teacher";
import TeacherClasses from "../components/Teacher/classes/TeacherClasses";
import TeacherGrades from "../components/Teacher/grades/TeacherGrades";
import TeacherGradesDetails from "../components/Teacher/grades/TeacherGradesDetails";
import TeacherExams from "../components/Teacher/exams/TeacherExams";
import TeacherExamDetails from "../components/Teacher/exams/TeacherExamDetails";
import ExamCreation from "../components/Teacher/exams/ExamCreation";
import Teachers from "../components/Admin/Teachers/Teachers";
import Students from "../components/Admin/Students/Students";
import Admins from "../components/Admin/Admins/Admins";
import Attendance from "../components/Teacher/attendance/Attendance";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Login from "../components/login/Login";
import QuestionBank from "../components/Teacher/question-bank/Questionbank";
import UnitBank from "../components/Teacher/question-bank/UnitBank";
import AdminClasses from "../components/Admin/AdminClasses/AdminClasses";
import AdminCourses from "../components/Admin/AdminCourses/AdminCourses";
import UserProfile from "../components/Admin/profile/UserProfile";
import AdminCourseDetails from "../components/Admin/AdminCourses/AdminCourseDetails";
import AdminClassDetails from "../components/Admin/AdminClasses/AdminClassDetails";
const AcademiqRoutes = () => {
  const role = localStorage.getItem("role");
  const routes = {
    admin: [
      {
        path: "/admin/teachers",
        component: <Teachers />,
      },
      {
        path: "/admin/students",
        component: <Students />,
      },
      {
        path: "/admin/admins",
        component: <Admins />,
      },
      {
        path: "/home",
        component: <Dashboard />,
      },
      {
        path: "/admin/courses",
        component: <AdminCourses />,
      },
      {
        path: "/admin/classes",
        component: <AdminClasses />,
      },
      {
        path: "/admin/courses/:id",
        component: <AdminCourseDetails />,
      },
      {
        path: "/admin/classes/:id",
        component: <AdminClassDetails />,
      },
      {
        path: "/admin/user/:id",
        component: <UserProfile />,
      },
    ],
    student: [
      {
        path: "/home",
        component: <Parent />,
      },
      {
        path: "/assignments",
        component: <StuAssignments />,
      },
      {
        path: "/classes",
        component: <TeacherClasses />,
      },
      {
        path: "/exams",
        component: <TeacherExams />,
      },
      {
        path: "/exams/details",
        component: <TeacherExamDetails />,
      },
      {
        path: "todolist",
        component: <ToDoPage />,
      },
    ],
    teacher: [
      {
        path: "/teacher",
        component: <Teacher />,
      },
      {
        path: "/classes",
        component: <TeacherClasses />,
      },
      {
        path: "/grades/details",
        component: <TeacherGradesDetails />,
      },
      {
        path: "/grades",
        component: <TeacherGrades />,
      },
      {
        path: "/exams",
        component: <TeacherExams />,
      },
      {
        path: "/attendance",
        component: <Attendance />,
      },
      {
        path: "/question-bank",
        component: <QuestionBank />,
      },
      {
        path: "/question-bank/unit",
        component: <UnitBank />,
      },
      {
        path: "/exams/details",
        component: <TeacherExamDetails />,
      },
      {
        path: "/exams/create",
        component: <ExamCreation />,
      },
    ],
    parent: [
      {
        path: "/parent",
        component: <Parent />,
      },
      {
        path: "/connect",
        component: <Connect />,
      },
      {
        path: "/report",
        component: <Report />,
      },
      {
        path: "child",
        component: <Child />,
      },
    ],
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {routes[role]?.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default AcademiqRoutes;
