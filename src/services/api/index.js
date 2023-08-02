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
      query: ({ payload, id }) => ({
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
    updateUserAccount: builder.mutation({
      query: ({ payload, id }) => ({
        url: `User/UpdateUser/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User Accounts"],
    }),
    updateUserAccountStatus: builder.mutation({
      query: (id) => ({
        url: `User/UpdateUserStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User Accounts"],
    }),

    // UOM

    getUOM: builder.query({
      query: (params) => ({
        url: `GetUomAsync/GetUom`,
        method: "GET",
        params: params,
      }),
      providesTags: ["UOM"],
    }),
    createUOM: builder.mutation({
      query: (payload) => ({
        url: `Uom/AddNewUom`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["UOM"],
    }),
    updateUOM: builder.mutation({
      query: ({ payload, id }) => ({
        url: `UpdateUom/UpdateUom/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["UOM"],
    }),
    updateUOMStatus: builder.mutation({
      query: (id) => ({
        url: `Uom/UpdateUomStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["UOM"],
    }),

    // Product Category

    getProductCategory: builder.query({
      query: (params) => ({
        url: `ProductCategory/GetProductCategory`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Product Category"],
    }),
    createProductCategory: builder.mutation({
      query: (payload) => ({
        url: `ProductCategory/AddNewProductCategory`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product Category"],
    }),
    updateProductCategory: builder.mutation({
      query: ({ payload, id }) => ({
        url: `ProductCategory/UpdateProductCategory/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Product Category"],
    }),
    updateProductCategoryStatus: builder.mutation({
      query: (id) => ({
        url: `ProductCategory/UpdateProductCategoryStatus/${encodeURIComponent(
          id
        )}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product Category"],
    }),

    // Product Sub Category

    getProductSubCategory: builder.query({
      query: (params) => ({
        url: `ProductSubCategory/GetProductSubCategories`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Product Sub Category"],
    }),
    createProductSubCategory: builder.mutation({
      query: (payload) => ({
        url: `ProductSubCategory/AddNewProductSubCategory`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product Sub Category"],
    }),
    updateProductSubCategory: builder.mutation({
      query: ({ payload, id }) => ({
        url: `ProductSubCategory/UpdateProductSubCategory/${encodeURIComponent(
          id
        )}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Product Sub Category"],
    }),
    updateProductSubCategoryStatus: builder.mutation({
      query: (id) => ({
        url: `ProductSubCategory/UpdateProductSubCategoryStatus/${encodeURIComponent(
          id
        )}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product Sub Category"],
    }),

    // Meat Type

    getMeatType: builder.query({
      query: (params) => ({
        url: `GetMeatTypesAsync/GetMeatType`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Meat Type"],
    }),
    createMeatType: builder.mutation({
      query: (payload) => ({
        url: `MeatType/AddNewMeatType`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Meat Type"],
    }),
    updateMeatType: builder.mutation({
      query: ({ payload, id }) => ({
        url: `UpdateMeatType/UpdateMeatType/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Meat Type"],
    }),
    updateMeatTypeStatus: builder.mutation({
      query: (id) => ({
        url: `UpdateMeatTypeStatus/UpdateMeatTypeStatus/${encodeURIComponent(
          id
        )}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Meat Type"],
    }),

    // Items

    getItems: builder.query({
      query: (params) => ({
        url: `Items/GetAllItems`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Items"],
    }),
    createItems: builder.mutation({
      query: (payload) => ({
        url: `Items/AddNewItem`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Items"],
    }),
    updateItems: builder.mutation({
      query: ({ payload, id }) => ({
        url: `Items/UpdateItem/${encodeURIComponent(id)}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Items"],
    }),
    updateItemsStatus: builder.mutation({
      query: (id) => ({
        url: `Items/UpdateItemStatus/${encodeURIComponent(id)}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Items"],
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
  useUpdateUserAccountMutation,
  useUpdateUserAccountStatusMutation,

  //UOM
  useGetUOMQuery,
  useCreateUOMMutation,
  useUpdateUOMMutation,
  useUpdateUOMStatusMutation,

  //Product Category
  useGetProductCategoryQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useUpdateProductCategoryStatusMutation,

  //Product Sub Category
  useGetProductSubCategoryQuery,
  useCreateProductSubCategoryMutation,
  useUpdateProductSubCategoryMutation,
  useUpdateProductSubCategoryStatusMutation,

  //Meat Type
  useGetMeatTypeQuery,
  useCreateMeatTypeMutation,
  useUpdateMeatTypeMutation,
  useUpdateMeatTypeStatusMutation,

  //Items
  useGetItemsQuery,
  useCreateItemsMutation,
  useUpdateItemsMutation,
  useUpdateItemsStatusMutation,

  //
} = jsonServerApi;
