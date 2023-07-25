import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = process.env.REACT_APP_BASEURL;

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    createLogin: builder.mutation({
      query: (payload) => ({
        url: `Authenticate/Authenticate`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Login User"],
    }),
    getUserAccounts: builder.query({
      query: (params) => ({
        url: `User/GetUser`,
        method: "GET",
        params: params,
      }),
      providesTags: ["User Accounts"]
    }),
  }),
});

export const { useCreateLoginMutation, useGetUserAccountsQuery } = jsonServerApi;
