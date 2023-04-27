import React from 'react';
import { Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import ChangePassword from './pages/ChangePassword/ChangePassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/password" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
