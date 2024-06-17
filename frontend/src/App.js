
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connect from './pages/Connect';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
