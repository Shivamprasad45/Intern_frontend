// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login, Message, Signup } from "../../../../type";

// Define a service using a base URL and expected endpoints
export const USer_API = createApi({
  tagTypes: ["aUTH"],
  reducerPath: "aUTH",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    User_Submit: builder.mutation<Message, Signup>({
      query: (Signupdata) => ({
        url: `/user`,
        body: Signupdata,
        method: "POST",
      }),
    }),
    User_login: builder.mutation<Message, Login>({
      query: (Signupdata) => ({
        url: `/user`,
        body: Signupdata,
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUser_SubmitMutation, useUser_loginMutation } = USer_API;
