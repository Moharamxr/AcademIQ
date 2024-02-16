import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Announcements from './components/Parent/announcements/Announcements';
import LeaderBoard from './components/Parent/leaderBoard/LeaderBoard';
import Connect from './components/connect/Connect';
import Report from './components/Report/Report';
import Parent from './components/Parent/home/Parent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Parent />} />

        <Route path="/connect" element={<Connect />} />
        
        <Route path="/report" element={<Report />} />
        
        
      </Routes>
    </Layout>
    
  );
}

export default App;
