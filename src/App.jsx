import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import CreateDepartment from './pages/CreateDepartment';

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-department" element={<CreateDepartment/>}/>
      </Routes>
    </div>
  );
};

export default App;
