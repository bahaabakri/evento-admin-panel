import parsePhoneNumberFromString from "libphonenumber-js";
import * as yup from "yup";
import { UserFormData } from "../components/UserForm/UserForm";

const adminFormSchema: yup.ObjectSchema<Required<UserFormData>> = yup.object({
  firstname: yup
    .string()
    .required("Firstname is required")
    .test(
      "min-if-not-empty",
      "Firstname must be at least 2 characters",
      (value) => {
        if (!value) return true; // Skip when empty
        return value.length >= 2;
      }
    ),
  lastname: yup
    .string()
    .required("Lastname is required")
    .test(
      "min-if-not-empty",
      "Lastname must be at least 2 characters",
      (value) => {
        if (!value) return true; // Skip when empty
        return value.length >= 2;
      }
    ),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Phone number is not valid", (value) => {
      if (!value) return true;
      // Parse without specifying a default region for international support
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber?.isValid() ?? false;
    }),
});

export default adminFormSchema;
