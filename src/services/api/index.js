import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";
import { saltkey } from "../saltkey";

const baseURL = process.env.REACT_APP_BASEURL;

const getBearerToken = () => {
  let userDatadecrypted;
  if (sessionStorage.getItem("Token")) {
    const token = sessionStorage.getItem("Token");
    const deciphertext = CryptoJS.AES.decrypt(token, saltkey);
    userDatadecrypted = JSON.parse(deciphertext.toString(CryptoJS.enc.Utf8));
  }
  return userDatadecrypted;
};

const baseQueryWithBearer = fetchBaseQuery({
  baseUrl: baseURL,
  mode: "cors",
  prepareHeaders(headers) {
    // Set the Authorization header with the bearer token
    const token = getBearerToken();
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: baseQueryWithBearer,

  // Login

  endpoints: (builder) => ({
    createLogin: builder.mutation({
      query: (payload) => ({
        url: `Authenticate/Authenticate`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Login User"],
    }),

    // Company

    getCompany: builder.query({
      query: (params) => ({
        url: `Company/GetAllCompanies`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: `Company/AddNewCompany`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ payload, id }) => ({
        url: `Company/UpdateCompany/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompanyStatus: builder.mutation({
      query: (id) => ({
        url: `Company/UpdateCompanyStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Company"],
    }),

    // Department

    getDepartment: builder.query({
      query: (params) => ({
        url: `Department/GetAllDepartment`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Department"],
    }),
    createDepartment: builder.mutation({
      query: (payload) => ({
        url: `Department/AddNewDepartment`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: ({ payload, id }) => ({
        url: `Department/UpdateDepartment/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartmentStatus: builder.mutation({
      query: (id) => ({
        url: `Department/UpdateDepartmentStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Department"],
    }),

    // Location

    getLocation: builder.query({
      query: (params) => ({
        url: `Location/GetAllLocations`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Location"],
    }),
    createLocation: builder.mutation({
      query: (payload) => ({
        url: `Location/AddNewLocation`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `Location/UpdateLocation/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocationStatus: builder.mutation({
      query: (id) => ({
        url: `Location/UpdateLocationStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Location"],
    }),

    // User Role

    getUserRole: builder.query({
      query: (params) => ({
        url: `UserRole/GetUserRoles`,
        method: "GET",
        params: params,
      }),
      providesTags: ["User Roles"],
    }),
    createUserRole: builder.mutation({
      query: (payload) => ({
        url: `UserRole/AddNewUserRole`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User Roles"],
    }),
    updateUserRole: builder.mutation({
      query: ({ payload, id }) => ({
        url: `UserRole/UpdateUserRole/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User Roles"],
    }),
    updateUserRoleStatus: builder.mutation({
      query: (id) => ({
        url: `UserRole/UpdateUserRoleStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User Roles"],
    }),
    updateTaggedUserRole: builder.mutation({
      query: ({payload, id}) => ({
        url: `UserRole/UntagAndTagUserRole/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User Roles"],
    }),

    // User Account

    getUserAccounts: builder.query({
      query: (params) => ({
        url: `User/GetUser`,
        method: "GET",
        params: params,
      }),
      providesTags: ["User Accounts"],
    }),
    createUserAccount: builder.mutation({
      query: (payload) => ({
        url: `User/AddNewUser`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User Accounts"],
    }),
  }),
});

export const {
  //Login
  useCreateLoginMutation,

  //Company
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useUpdateCompanyStatusMutation,

  //Department
  useGetDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useUpdateDepartmentStatusMutation,

  //Location
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useUpdateLocationStatusMutation,

  //User Role
  useGetUserRoleQuery,
  useCreateUserRoleMutation,
  useUpdateUserRoleMutation,
  useUpdateTaggedUserRoleMutation,
  useUpdateUserRoleStatusMutation,

  //User Account
  useGetUserAccountsQuery,
  useCreateUserAccountMutation,
} = jsonServerApi;
