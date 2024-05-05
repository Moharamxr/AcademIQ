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
import UserCourses from "../components/Teacher/classes/UserCourses";
import CourseDetailsPage from "../components/Teacher/classes/CourseDetailsPage";
import ClassesForAttendance from "../components/Teacher/attendance/ClassesForAttendance";
import Parents from "../components/Admin/Parents/Parents";
import SelectQuestions from "../components/Teacher/exams/SelectQuestions";
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
        path: "/admin/parents",
        component: <Parents />,
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
        path: "/courses",
        component: <UserCourses />,
      },
      {
        path: "/courses/details/:id",
        component: <CourseDetailsPage />,
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
        path: "/home",
        component: <Teacher />,
      },
      {
        path: "/courses",
        component: <UserCourses />,
      },
      {
        path: "/courses/details/:id",
        component: <CourseDetailsPage />,
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
        component: <ClassesForAttendance />,
      },
      {
        path: "/attendance/:id",
        component: <Attendance />,
      },
      {
        path: "/question-bank",
        component: <QuestionBank />,
      },
      {
        path: "/question-bank/unit/:id",
        component: <UnitBank />,
      },
      {
        path: "/exams/details",
        component: <TeacherExamDetails />,
      },
      {
        path: "/exams/create/:id",
        component: <ExamCreation />,
      },
      {
        path: "/exams/create/:id/select-questions",
        component: <SelectQuestions />,
      },
    ],
    parent: [
      {
        path: "/home",
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
