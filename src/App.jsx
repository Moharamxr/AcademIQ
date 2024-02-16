import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Announcements from './components/Parent/announcements/Announcements';
import LeaderBoard from './components/Parent/leaderBoard/LeaderBoard';
import Connect from './components/connect/Connect';

function App() {
  return (
    <Layout>
      <Connect />
    </Layout>
  );
}

export default App;
