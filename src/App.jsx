import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Announcements from './components/Parent/announcements/Announcements';
import LeaderBoard from './components/Parent/leaderBoard/LeaderBoard';
import Connect from './components/connect/Connect';
import Report from './components/Report/Report';
import Parent from './components/Parent/home/Parent';
import { Route, Routes } from 'react-router-dom';
import Calendar from './components/Student/calender/Calender';
import ToDoPage from './components/Student/todo-list/ToDoPage';
import StuAssignments from './components/Student/assignments/StuAssignments';
import Child from './components/Parent/child/Child';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Parent />} />

        <Route path="/connect" element={<Connect />} />
        
        <Route path="/report" element={<Report />} />

        <Route path="/todolist" element={<ToDoPage />} />

        <Route path="/assignments" element={<StuAssignments />} />

        <Route path="/child" element={<Child />} />
        
        
      </Routes>
    </Layout>
    
  );
}

export default App;
