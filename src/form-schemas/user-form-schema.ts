import parsePhoneNumberFromString from "libphonenumber-js";
import * as yup from "yup";
import { UserFormData } from "../components/Forms/UserForm/UserForm"; // ✅ make sure this import exists

const userFormSchema: yup.ObjectSchema<UserFormData> = yup.object({
  firstname: yup
    .string()
    .optional()
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
    .optional()
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
    .optional()
    .test("is-valid-phone", "Phone number is not valid", (value) => {
      if (!value) return true; // ✅ Return true when empty since it's optional
      const phoneNumber = parsePhoneNumberFromString(value, "AE");
      return phoneNumber?.isValid() ?? false;
    }),
});

export default userFormSchema;
