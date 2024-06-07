import React from "react";
import { Routes } from "react-router-dom";
import Connect from "../components/connect/Connect";
import Report from "../components/Report/Report";
import { Route } from "react-router-dom";
import ToDoPage from "../components/Student/todo-list/ToDoPage";
import Child from "../components/Parent/child/Child";
import Teacher from "../components/Teacher/home/Teacher";
import TeacherGrades from "../components/Teacher/grades/TeacherGrades";
import TeacherGradesDetails from "../components/Teacher/grades/TeacherGradesDetails";
import ExamCreation from "../components/Teacher/exams/examCreation/ExamCreation";
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
import UserCourses from "../components/classes/UserCourses";
import CourseDetailsPage from "../components/classes/CourseDetailsPage";
import ClassesForAttendance from "../components/Teacher/attendance/ClassesForAttendance";
import Parents from "../components/Admin/Parents/Parents";
import SelectQuestions from "../components/Teacher/exams/examCreation/SelectQuestions";
import ExamDetails from "../components/Teacher/exams/examDetailsPage/ExamDetails";
import ExamsPage from "../components/Teacher/exams/ExamsPage";
import StudentParentHome from "../components/Parent/home/StudentParentHome";
import SupportAndHelp from "../components/Layout/Support&Help/SupportAndHelp";
import Settings from "../components/Layout/Setting/Settings";
import AssignmentsPage from "../components/Assignments/AssignmentsPage";
import MarkAssignments from "../components/Assignments/mark/MarkAssignments";

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
        path: "/profile/:id",
        component: <UserProfile />,
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
      {
        path: "/report",
        component: <Report />,
      },
    ],
    student: [
      {
        path: "/home",
        component: <StudentParentHome />,
      },
      {
        path: "/profile/:id",
        component: <UserProfile />,
      },
      {
        path: "/assignments",
        component: <AssignmentsPage />,
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
        component: <ExamsPage />,
      },
      {
        path: "/exams/details/:id",
        component: <ExamDetails />,
      },
      {
        path: "/assignments",
        component: <AssignmentsPage />,
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
        path: "/profile/:id",
        component: <UserProfile />,
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
        component: <ExamsPage />,
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
        path: "/exams/details/:id",
        component: <ExamDetails />,
      },
      {
        path: "/exams/create/:id",
        component: <ExamCreation />,
      },
      {
        path: "/exams/create/:id/select-questions",
        component: <SelectQuestions />,
      },
      {
        path: "/assignments",
        component: <AssignmentsPage />,
      },
      {
        path: "/assignments/mark/:id",
        component: <MarkAssignments />,
      },
      {
        path: "/report",
        component: <Report />,
      },
    ],
    parent: [
      {
        path: "/home",
        component: <StudentParentHome />,
      },
      {
        path: "/report",
        component: <Report />,
      },
      {
        path: "/child/:childID",
        component: <Child />,
      },
      {
        path: "/profile/:id",
        component: <UserProfile />,
      },
    ],
  };
  const staticRoutes = [
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "/connect",
      component: <Connect />,
    },
    {
      path: "/support",
      component: <SupportAndHelp />,
    },
    {
      path: "/",
      component: <Login />,
    },
    {
      path: "/settings",
      component: <Settings />,
    },
    {
      path: "*",
      component: <Login />,
    },
  ];
  return (
    <>
      <Routes>
        {staticRoutes.map((route, index) => (
          <Route key={index+99} path={route.path} element={route.component} />
        ))}
        {routes[role]?.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default AcademiqRoutes;
