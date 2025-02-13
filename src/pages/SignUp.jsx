import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../services/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState("employee");
  const { register, handleSubmit } = useForm();

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };

  const onSubmit = (data) => {
    dispatch(signup({ ...data, accountType }, navigate));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              accountType === "employee"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleAccountTypeChange("employee")}
          >
            Employee
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${
              accountType === "manager"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleAccountTypeChange("manager")}
          >
            Manager
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              type="text"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              type="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
              type="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              type="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center">
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
