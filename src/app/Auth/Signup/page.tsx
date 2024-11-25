"use client";
import { useUser_SubmitMutation } from "@/app/Features/Auth/AuthServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignUpPage = () => {
  // State to hold the form data
  const [Submit, { data, isError, isLoading, isSuccess }] =
    useUser_SubmitMutation();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        router.push("/Auth/Login");
      }

      // Redirect after successful submission
    }
  }, [isSuccess, data?.Data, router]);

  // Check for existing user session on mount
  useEffect(() => {
    const user = localStorage.getItem("userPhoneNumber");
    if (user !== null) {
      router.push("/"); // Redirect if user is already logged in
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    try {
      Submit(formData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data?.message);
  ///Alerts the user
  if (data?.error) {
    alert(data?.error);
  }
  if (data?.message) {
    alert(data.message);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Sign-Up Card */}
      <div className="w-full max-w-md bg-white border border-black">
        {/* Header Section */}
        <div className="p-4 bg-yellow-400 flex items-center justify-between">
          <h1 className="text-lg font-bold">Logo</h1>
          <h2 className="text-lg font-bold">Sign-Up Page</h2>
        </div>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
            />
          </div>
          {/* Confirm Password Field */}
          <div className="">
            <Link href={"/Auth/Login"} className="text-blue-800">
              I have accout
            </Link>
          </div>

          {/* Sign-Up Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 font-bold text-lg rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {isLoading ? "Loading..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
