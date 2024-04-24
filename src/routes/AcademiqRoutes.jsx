import React from "react";

const AcademiqRoutes = () => {
  const role = localStorage.getItem("role");
  const routes = {
    admin: [
      {
        path: "/teachers",
        component: Teachers,
      },
      {
        path: "/students",
        component: Students,
      },
      {
        path: "/admins",
        component: Admins,
      },
      {
        path: "/dashboard",
        component: Dashboard,
      },
    ],
    student: [
      {
        path: "/assignments",
        component: StuAssignments,
      },
    ],
    teacher: [
      {
        path: "/classes",
        component: TeacherClasses,
      },
      {
        path: "/grades/details",
        component: TeacherGradesDetails,
      },
      {
        path: "/grades",
        component: TeacherGrades,
      },
      {
        path: "/exams",
        component: TeacherExams,
      },
      {
        path: "/attendance",
        component: Attendance,
      },
      {
        path: "/question-bank",
        component: QuestionBank,
      },
      {
        path: "/question-bank/unit",
        component: UnitBank,
      },
      {
        path: "/exams/details",
        component: TeacherExamDetails,
      },
      {
        path: "/exams/create",
        component: ExamCreation,
      },
    ],
    parent: [
      {
        path: "/parent",
        component: Parent,
      },
    ],
  };
  return (
    <>
      {routes[role].map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </>
  );
};

export default AcademiqRoutes;
