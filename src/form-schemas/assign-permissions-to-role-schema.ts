import * as yup from "yup";

export const assignPermissionsToRoleSchema:yup.ObjectSchema<any> = yup.object({

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