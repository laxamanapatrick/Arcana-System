import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = process.env.REACT_APP_BASEURL;

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    // getAdmins: builder.query({
    //   query: () => `User/GetAllUsers`,
    //   providesTags: ["Admin Setup"],
    // }),
    // createAdmin: builder.mutation({
    //   query: (payload) => ({
    //     url: `User/AddNewUser`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Admin Setup"],
    // }),
  }),
});

export const { useGetAdminsQuery, useCreateAdminMutation } = jsonServerApi;
