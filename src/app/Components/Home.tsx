"use client";
import React, { useEffect, useState } from "react";
import {
  useEmploies_DeletMutation,
  useEmploiesQuery,
} from "../Features/Employ/EmployServices";
import { Employee } from "../../../type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EmployeeForm from "./EditEmployess";

import SecondNav from "./SecondNav";
import EmployeeForms from "./CreateEmpolyee";

const Table = () => {
  const [page, setpage] = useState<number>(0);
  const [Search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<string>(""); // Field to sort
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting order

  const {
    data: isData,
    isError,
    isLoading,
  } = useEmploiesQuery({ page: page, que: Search });
  const [Delet_Employ] = useEmploies_DeletMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [PropsData, setPropsData] = useState<Employee>();

  if (isLoading) return <div>Loading...</div>;

  const Delete = (_id: string) => {
    try {
      Delet_Employ(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const Edit_Function = (data: Employee) => {
    setPropsData(data);
  };

  // Sorting function
  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Sort data before rendering
  const sortedData = [...(isData?.data || [])].sort((a, b) => {
    if (!sortField) return 0; // If no sort field, do not sort
    const fieldA = a[sortField as keyof Employee];
    const fieldB = b[sortField as keyof Employee];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <SecondNav />
      </div>
      <div className="flex flex-wrap items-center justify-between space-y-4 md:space-y-0 md:space-x-20">
        <div className="text-lg font-semibold text-gray-700">
          <p>Total count: {isData?.totalEmployees}</p>
        </div>
        <Sheet open={isOpens} onOpenChange={setIsOpens}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Create Employees
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Employees</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <EmployeeForms />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="p-2 my-4 flex items-center justify-between gap-4 bg-blue-100 rounded-md">
        <label className="text-gray-600 font-medium">Search:</label>
        <input
          placeholder="Search here"
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("_id")}
            >
              Unique ID{" "}
              {sortField === "_id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">Mobile No</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>

            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("createDate")}
            >
              Create Date{" "}
              {sortField === "createDate"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item: Employee, index) => (
            <tr key={item._id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-1 w-6 text-center truncate">
                {item._id?.slice(20, 25)}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {/* {item.imgUpload} */}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`mailto:${item.email}`}
                  className="text-blue-500 underline"
                >
                  {item.email}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.mobileNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.designation}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.gender}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.course}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(item.createDate!).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center space-x-4 justify-center">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => Edit_Function(item)}
                      >
                        Edit
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Form</SheetTitle>
                        <SheetDescription>
                          Fill out this form to update the employee.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <EmployeeForm EditValues={PropsData!} />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => Delete(item._id!)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setpage(isData?.currentPage! - 1)}
              />
            </PaginationItem>
            {Array.from({ length: isData?.totalPages || 0 }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={isData?.currentPage === index + 1}
                  onClick={() => setpage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setpage(isData?.currentPage! + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Table;
