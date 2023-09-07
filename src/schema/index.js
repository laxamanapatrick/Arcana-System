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

export const storeTypeSchema = yup
  .object()
  .shape({
    storeTypeId: yup.string(),
    storeTypeName: yup.string().required("Store Type Name is required"),
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
    ownersName: yup.string().required("Owner Name is required"),
    ownersAddress: yup.string().required("Owner Address is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    businessName: yup.string().required("Business Name is required"),
    storeType: yup.object().required("Store Type is required"),
  })
  .required();

export const freebieSchema = yup
  .object()
  .shape({
    clientId: yup.string(),
    freebies: yup.array().of(
      yup.object().shape({
        items: yup.object().required("Product Code Required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .typeError("Must be a number"),
      })
    ),
  })
  .required();

export const directCustomerDetails = yup.object().shape({
  businessAddress: yup.string().required("Business Address is required"),
  representativeName: yup.string().required("Representative Name is required"),
  representativePosition: yup.string().required("Representative Position"),
  cluster: yup
    .number()
    .required("Number is required")
    .typeError("Must be a number"),
});

export const directTermsAndConditions = yup.object().shape({
  freezer: yup.boolean().required().typeError("Please select an option"),
  typeOfCustomer: yup.string().required("Please select a customer type"),
  directDelivery: yup.boolean().required().typeError("Please select an option"),
  bookingCoverage: yup.number().required().typeError("Must be a number"),
  ModeOfPayment: yup.number().required().typeError("Must be a number"),
  Terms: yup.number().required().typeError("Must be a number"),
  creditLimit: yup.number().required().typeError("Must be a number"),
  termDays: yup.object().required("Term Days is required"),
  discountTypes: yup.object().required("Discount Type is required"),
});
