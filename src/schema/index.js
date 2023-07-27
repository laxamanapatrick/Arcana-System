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
