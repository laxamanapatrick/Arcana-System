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
    productCategory: yup.object().required("Product Category Name is required"),
    productSubCategoryName: yup
      .string()
      .required("Product Sub Category Name is required"),
  })
  .required();

export const meatTypeSchema = yup
  .object()
  .shape({
    meatTypeId: yup.string(),
    meatTypeName: yup.string().required("Meat Type Name is required"),
  })
  .required();

export const itemsSchema = yup
  .object()
  .shape({
    id: yup.string(),
    itemCode: yup.string().required("Item Code is required"),
    itemDescription: yup.string().required("Item Description is required"),
    productSubCategory: yup
      .object()
      .required("Product Sub Category Name is required"),
    uom: yup.object().required("UOM is required"),
    meatType: yup.object().required("Meat Type is required"),
  })
  .required();

export const discountSchema = yup
  .object()
  .shape({
    id: yup.string(),
    lowerBound: yup.number().required().typeError("Lower Bound is required"),
    upperBound: yup.number().required().typeError("Upper Bound is required"),
    commissionRateLower: yup
      .number()
      .required()
      .typeError("Commission Rate Lower is required"),
    commissionRateUpper: yup
      .number()
      .required()
      .typeError("Commission Rate Higher is required"),
  })
  .required();

export const termDaysSchema = yup
  .object()
  .shape({
    id: yup.string(),
    days: yup
      .number()
      .required("Days is a required field")
      .typeError("Days must be a number"),
  })
  .required();

export const prospectSchema = yup
  .object()
  .shape({
    id: yup.string(),
    ownersName: yup.string(),
    ownersAddress: yup.string(),
    phoneNumber: yup.string(),
    businessName: yup.string(),
    storeType: yup.string(),
  })
  .required();
