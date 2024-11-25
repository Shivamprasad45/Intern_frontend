export interface Employee {
  _id?: string; // Unique identifier for the employee
  imgUpload: string; // Image identifier or URL
  name: string; // Name of the employee
  email: string; // Email of the employee
  mobileNo: string; // Mobile number of the employee
  designation: string; // Job designation/title
  gender: string; // Gender of the employee
  course: string[]; // Relevant course or qualification
  createDate?: string; // Creation or joining date
}

export interface Pagination {
  data: Employee[];
  totalEmployees: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface Message {
  Data?: string;
  message?: string;
  error?: string;
}

export interface Signup {
  userName: string;
  email: string;
  password: string;
}

export interface Login {
  userName: string;
  password: string;
}
