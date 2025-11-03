import { RoleFormData } from "@/components/RoleForm/RoleForm";
import * as yup from "yup";

export const roleFormSchema = yup.object({
  name: yup
    .string()
    .required("Role name is required")
    .min(2, "Role name must be at least 2 characters"),
  
  description: yup
    .string()
    .required("Role description is required")
    .min(5, "Description must be at least 5 characters"),
  
  permissions: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .min(1, "At least one permission is required")
    .required("Permissions are required"),
});