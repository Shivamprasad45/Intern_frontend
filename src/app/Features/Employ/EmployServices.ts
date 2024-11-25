// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee, Pagination } from "../../../../type";
export const Employ_API = createApi({
  tagTypes: ["Employee"],
  reducerPath: "Employee",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    Emploies: builder.query<Pagination, { page: Number; que: String }>({
      query: ({ page, que }) => ({
        url: `/Empl?search=${que}&page=${page}&limit=10`,
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
    Emploies_Delet: builder.mutation<string, string>({
      query: (_id) => ({
        url: `/Empl`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Employee"],
    }),
    Emploies_Create: builder.mutation<
      { message?: string; error?: string },
      Employee
    >({
      query: (Data) => ({
        url: `/Empl`,
        method: "POST",
        body: Data,
      }),
      invalidatesTags: ["Employee"],
    }),
    Emploies_Edit: builder.mutation<string, Employee>({
      query: (Data) => ({
        url: `/Empl`,
        method: "PUT",
        body: Data,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useEmploiesQuery,
  useEmploies_DeletMutation,
  useEmploies_CreateMutation,
  useEmploies_EditMutation,
} = Employ_API;
