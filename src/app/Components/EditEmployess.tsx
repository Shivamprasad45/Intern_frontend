"use client";

import { useState } from "react";
import { useEmploies_EditMutation } from "../Features/Employ/EmployServices";
import { Employee } from "../../../type";

interface EmployeeFormValues {
  name: string;
  email: string;
  mobileNo: string;
  designation: string;
  gender: string;
  course: string[];
  imgUpload: File | null;
}

export default function EmployeeForm({ EditValues }: { EditValues: Employee }) {
  const [Edit_employess, { isLoading }] = useEmploies_EditMutation();
  const [formValues, setFormValues] = useState<EmployeeFormValues>({
    name: EditValues.name,
    email: EditValues.email,
    mobileNo: EditValues.mobileNo,
    designation: EditValues.designation,
    gender: EditValues.gender,
    course: EditValues.course || [],
    imgUpload: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const courseSet = new Set<string>(["MCA", "BCA", "BSC"]);

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

    // Basic validation
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

    // Attempt to submit the form
    try {
      const submissionData = {
        ...formValues,
        imgUpload: formValues.imgUpload.name, // Mocked to send the file name; handle file uploads separately
      };
      await Edit_employess({ _id: EditValues._id, ...submissionData }).unwrap();
      alert("Form submitted successfully!");
      setFormValues({
        name: "",
        email: "",
        mobileNo: "",
        designation: "",
        gender: "",
        course: [],
        imgUpload: null,
      });
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const alertAndStop = (message: string) => {
    alert(message);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobileNo"
            value={formValues.mobileNo}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Designation</label>
          <select
            name="designation"
            value={formValues.designation}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="">Select a designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block mb-2">Gender</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formValues.gender === "M"}
              onChange={handleInputChange}
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
            />
            Female
          </label>
        </div>
      </div>

      {/* Courses */}
      <div>
        <label className="block mb-2">Courses</label>
        {Array.from(courseSet).map((course) => (
          <label key={course} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formValues.course.includes(course)}
              onChange={() => handleCourseSelection(course)}
            />
            {course}
          </label>
        ))}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2">Upload Image</label>
        <input
          type="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-blue-500 text-white rounded p-2 w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
