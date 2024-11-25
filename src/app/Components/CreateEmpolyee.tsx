"use client";

import { useState } from "react";
import { useEmploies_CreateMutation } from "../Features/Employ/EmployServices";

interface EmployeeFormValues {
  name: string;
  email: string;
  mobileNo: string;
  designation: string;
  gender: string;
  course: string[];
  imgUpload: File | null;
}

export default function EmployeeForms() {
  const [Create_employess, { data, isLoading }] = useEmploies_CreateMutation();
  const [formValues, setFormValues] = useState<EmployeeFormValues>({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
    imgUpload: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const courseSet = new Set<string>(["MCA", "BCA", "BSC"]);
  console.log(data, "courseidi ");
  if (data?.message) {
    alert(data?.message);
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormValues((prev) => ({
      ...prev,
      imgUpload: file,
    }));
  };

  const handleCourseSelection = (course: string) => {
    setFormValues((prev) => {
      const isSelected = prev.course.includes(course);
      const updatedCourse = isSelected
        ? prev.course.filter((c) => c !== course)
        : [...prev.course, course];
      return { ...prev, course: updatedCourse };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!formValues.name.trim()) return alertAndStop("Name is required");
    if (!formValues.email.includes("@"))
      return alertAndStop("Invalid email format");
    if (!/^\d{10}$/.test(formValues.mobileNo))
      return alertAndStop("Mobile number must be 10 digits");
    if (!formValues.designation) return alertAndStop("Designation is required");
    if (!formValues.gender) return alertAndStop("Gender is required");
    if (formValues.course.length === 0)
      return alertAndStop("At least one course must be selected");
    if (
      !formValues.imgUpload ||
      !["image/jpeg", "image/png"].includes(formValues.imgUpload.type)
    ) {
      return alertAndStop("Only JPG or PNG files are allowed");
    }

    try {
      const submissionData = {
        ...formValues,
        imgUpload: formValues.imgUpload.name,
      };
      await Create_employess(submissionData).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const alertAndStop = (message: string) => {
    alert(message);
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded shadow-md max-w-md mx-auto"
    >
      <h1 className="text-lg font-semibold text-blue-700 text-center">
        Create Employee
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <label className="text-blue-600">Name:</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          className="border rounded p-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="text-blue-600">Email:</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          className="border rounded p-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="text-blue-600">Mobile No:</label>
        <input
          type="text"
          name="mobileNo"
          value={formValues.mobileNo}
          onChange={handleInputChange}
          className="border rounded p-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="text-blue-600">Designation:</label>
        <select
          name="designation"
          value={formValues.designation}
          onChange={handleInputChange}
          className="border rounded p-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div>
        <label className="text-blue-600">Gender:</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formValues.gender === "M"}
              onChange={handleInputChange}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formValues.gender === "F"}
              onChange={handleInputChange}
              className="mr-1"
            />
            Female
          </label>
        </div>
      </div>

      <div>
        <label className="text-blue-600">Courses:</label>
        <div className="grid grid-cols-3 gap-2">
          {Array.from(courseSet).map((course) => (
            <label key={course} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={formValues.course.includes(course)}
                onChange={() => handleCourseSelection(course)}
              />
              {course}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-blue-600">Upload Image:</label>
        <input
          type="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
          className="border rounded p-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
