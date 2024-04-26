import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Connect from "./components/connect/Connect";
import Report from "./components/Report/Report";
import Parent from "./components/Parent/home/Parent";
import { Route, Routes } from "react-router-dom";
import ToDoPage from "./components/Student/todo-list/ToDoPage";
import StuAssignments from "./components/Student/assignments/StuAssignments";
import Child from "./components/Parent/child/Child";
import Teacher from "./components/Teacher/home/Teacher";
import TeacherClasses from "./components/Teacher/classes/TeacherClasses";
import TeacherGrades from "./components/Teacher/grades/TeacherGrades";
import TeacherGradesDetails from "./components/Teacher/grades/TeacherGradesDetails";
import TeacherExams from "./components/Teacher/exams/TeacherExams";
import TeacherExamDetails from "./components/Teacher/exams/TeacherExamDetails";
import ExamCreation from "./components/Teacher/exams/ExamCreation";
import Teachers from "./components/Admin/Teachers/Teachers";
import Students from "./components/Admin/Students/Students";
import Admins from "./components/Admin/Admins/Admins";
import Attendance from "./components/Teacher/attendance/Attendance";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Login from "./components/login/Login";
import QuestionBank from "./components/Teacher/question-bank/Questionbank";
import UnitBank from "./components/Teacher/question-bank/UnitBank";
import AdminClasses from "./components/Admin/AdminClasses/AdminClasses";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";
import UserProfile from "./components/Admin/profile/UserProfile";
import AcademiqRoutes from "./routes/AcademiqRoutes";

function App() {
  return (
    <Layout>
      <AcademiqRoutes />

      {/* <Route path="/home" element={<Parent />} />

        <Route path="/teacher" element={<Teacher />} />

        <Route path="/classes" element={<TeacherClasses />} />

        <Route path="/grades/details" element={<TeacherGradesDetails />} />
        
        <Route path="/grades" element={<TeacherGrades />} />

        <Route path="/exams" element={<TeacherExams />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/question-bank" element={<QuestionBank />} />

        <Route path="/question-bank/unit" element={<UnitBank />} />

        <Route path="/exams/details" element={<TeacherExamDetails />} />

        <Route path="/exams/create" element={<ExamCreation />} />

        <Route path="/parent" element={<Parent />} />

        <Route path="/connect" element={<Connect />} />
        
        <Route path="/report" element={<Report />} />

        <Route path="/todolist" element={<ToDoPage />} />

        <Route path="/assignments" element={<StuAssignments />} />

        <Route path="/child" element={<Child />} />

        <Route path='/admin/user/:id' element={<UserProfile />} />

        <Route path="/admin/courses" element={<AdminCourses />} />

        <Route path="/admin/classes" element={<AdminClasses />} />

        <Route path="/admin/teachers" element={<Teachers />} />

        <Route path="/admin/students" element={<Students />} />

        <Route path="/admin/admins" element={<Admins />} />

        <Route path="/admin/dashboard" element={<Dashboard />} /> */}
    </Layout>
  );
}

export default App;
