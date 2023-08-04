import * as Yup from "yup";

export const newAdinSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Z -']+$/, "Incorrect format")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 symbols!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Must be at least 8 symbols!")
    .required("Required"),
});