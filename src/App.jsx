import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import CreateDepartment from "./pages/CreateDepartment";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/core/Navbar";
import EditDepartment from "./pages/EditDepartment";

const App = () => {
  return (
    <div>
      <Navbar />
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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-department"
          element={
              <CreateDepartment />
          }
        />
        <Route
          path="/dashboard-user"
          element={
              <UserDashboard />
          }
        />
        <Route path="/edit-department/:id" element={<EditDepartment />} />
      </Routes>
    </div>
  );
};

export default App;
