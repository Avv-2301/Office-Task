import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
