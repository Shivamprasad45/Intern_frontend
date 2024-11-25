"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SecondNav = () => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  const LogOut = () => {
    try {
      localStorage.removeItem("userPhoneNumber");
      setUser(null); // Update state after logout
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userPhoneNumber");

    if (storedUser === null) {
      router.push("/Auth/Login");
    } else {
      setUser(storedUser); // Update state with stored user's phone number
    }
  }, [router]);

  return (
    <div className="bg-gray-100 px-4 py-2 shadow-md md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
        {/* Left section */}
        <div className="flex space-x-4 text-sm md:text-base">
          <p
            className="cursor-pointer hover:text-blue-500"
            onClick={() => router.push("/")}
          >
            Home
          </p>
          <p
            className="cursor-pointer hover:text-blue-500"
            onClick={() => router.push("/EmployeeList")}
          >
            Employee List
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center mt-3 space-x-4 md:mt-0">
          <p className="text-sm font-medium md:text-base">{user}</p>
          <Button
            onClick={LogOut}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondNav;
