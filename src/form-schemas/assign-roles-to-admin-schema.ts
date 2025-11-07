import * as yup from "yup";

export const assignRolesToAdminSchema:yup.ObjectSchema<any> = yup.object({

  roles: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .min(1, "At least one role is required")
    .required("Roles are required"),
});