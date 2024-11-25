"use client";
import { useUser_loginMutation } from "@/app/Features/Auth/AuthServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  //router navigation

  const router = useRouter();
  // State variables for username and password

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Login_submit, { data, isLoading, isSuccess }] =
    useUser_loginMutation();
  // Handle form submission
  const handleLogin = () => {
    try {
      Login_submit({ password: password, userName: username });
    } catch (error) {
      console.log(error);
    }
  };

  // Alert messages if error or success
  if (data?.error) {
    alert(data?.error);
  }
  if (data?.message && data?.Data) {
    alert(data?.message);
  }

  // Local storage settings
  useEffect(() => {
    const user = localStorage.getItem("userPhoneNumber");
    if (user !== null) {
      router.push("/"); // Redirect if user is already logged in
    }
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      if (data.Data) {
        localStorage.setItem("userPhoneNumber", data?.Data!);
        router.push("/"); // Redirect after successful submission
      }
    }
  }, [isSuccess, router]);

  if (isSuccess) {
    window.location.reload();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-black">
        {/* Header Section */}
        <div className="p-4 bg-yellow-400 flex items-center justify-between">
          <h1 className="text-lg font-bold">Logo</h1>
          <h2 className="text-lg font-bold">Login Page</h2>
        </div>
        {/* Form Section */}
        <div className="p-6 space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
              className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
            />
          </div>
          <div className="">
            <Link href={"/Auth/Signup"} className="text-blue-800">
              I have no accout
            </Link>
          </div>
          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-white py-2 font-bold text-lg rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
