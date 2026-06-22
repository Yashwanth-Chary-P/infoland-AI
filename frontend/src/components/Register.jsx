import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔹 Register with email/password
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);

      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      }).then(() => navigate("/"));
    } catch (error) {
      setMessage("Please provide a valid email and password");
      Swal.fire({
        title: "Registration Failed",
        text: "Please check your email and password.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      console.error(error);
    }
  };

  // 🔹 Register with Google
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();

      Swal.fire({
        title: "Signed in with Google!",
        text: "Welcome to Book Store!",
        icon: "success",
        confirmButtonColor: "#2563eb",
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        title: "Google Sign-In Failed",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* 🔹 Google sign in */}
        <div className="mt-4">
          <button
            onClick={handleSignInWithGoogle}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <FaGoogle className="w-5 h-5 text-white" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
