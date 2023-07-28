import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = process.env.REACT_APP_BASEURL;

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: "cors",
  }),

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
        url: `Company/UpdateCompany/id=${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompanyStatus: builder.mutation({
      query: (id) => ({
        url: `Company/UpdateCompanyStatus/id=${encodeURIComponent(
          id
        )}`,
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
        url: `Department/UpdateDepartment/id=${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartmentStatus: builder.mutation({
      query: (id) => ({
        url: `Department/UpdateDepartmentStatus/id=${encodeURIComponent(id)}`,
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
        url: `Location/UpdateLocation/id=${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocationStatus: builder.mutation({
      query: (id) => ({
        url: `Location/UpdateLocationStatus/id=${encodeURIComponent(id)}`,
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
        url: `UserRole/UpdateUserRole/id=${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User Roles"],
    }),
    updateUserRoleStatus: builder.mutation({
      query: (id) => ({
        url: `UserRole/UpdateUserRoleStatus/id=${encodeURIComponent(id)}`,
        method: "PATCH",
        params: { id: id },
      }),
      invalidatesTags: ["User Roles"],
    }),
    untagUserRole: builder.mutation({
      query: (payload, id) => ({
        url: `UserRole/UntagUserRole`,
        method: "PUT",
        params: { id: id },
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
  useUntagUserRoleMutation,
  useUpdateUserRoleStatusMutation,

  //User Account
  useGetUserAccountsQuery,
  useCreateUserAccountMutation,
} = jsonServerApi;
