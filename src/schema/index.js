import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
export const loginValues = {
  username: "",
  password: "",
};

export const companySchema = yup
  .object()
  .shape({
    companyId: yup.string(),
    companyName: yup.string().required("Company Name is required"),
  })
  .required();

export const departmentSchema = yup
  .object()
  .shape({
    companyId: yup.string(),
    departmentName: yup.string().required("Department Name is required"),
  })
  .required();

export const locationSchema = yup
  .object()
  .shape({
    locationId: yup.string(),
    locationName: yup.string().required("Location Name is required"),
  })
  .required();

export const userRoleSchema = yup
  .object()
  .shape({
    useRoleId: yup.string(),
    roleName: yup.string().required("User Role Name is required"),
  })
  .required();

export const userAccountSchema = yup
  .object()
  .shape({
    userAccountId: yup.string(),
    fullname: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    userRole: yup.object().required("Role is required"),
    company: yup.object().required("Company is required"),
    department: yup.object().required("Department is required"),
    location: yup.object().required("Location  is required"),
  })
  .required();

export const uomSchema = yup
  .object()
  .shape({
    uomId: yup.string(),
    uomCode: yup.string().required("UOM Code is required"),
    uomDescription: yup.string().required("UOM Name is required"),
  })
  .required();

export const productCategorySchema = yup
  .object()
  .shape({
    productCategoryId: yup.string(),
    productCategoryName: yup
      .string()
      .required("Product Category Name is required"),
  })
  .required();

export const productSubCategorySchema = yup
  .object()
  .shape({
    productSubCategoryId: yup.string(),
    productCategoryId: yup.string("Product Category Name is required"),
    productSubCategoryName: yup
      .string()
      .required("Product Sub Category Name is required"),
  })
  .required();
