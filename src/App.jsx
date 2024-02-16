import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Announcements from './components/Parent/announcements/Announcements';
import LeaderBoard from './components/Parent/leaderBoard/LeaderBoard';
import Connect from './components/connect/Connect';
import Report from './components/Report/Report';

function App() {
  return (
    <Layout>
      <Report />
    </Layout>
  );
}

export default App;
