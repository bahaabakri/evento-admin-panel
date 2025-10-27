// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./UserForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomButton from "@/UI/CustomButton/CustomButton";

// yup validation schema
const schema = yup.object({
  email: yup
    .string()
    .required("User Email is required")
    .email("Email address should be valid email")
});

export type  UserFormData = {
    email: string
}

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: UserFormData) => void;
  defaultValues: UserFormData;
  isPending?: boolean
};

const UserForm = ({ mode, onSubmit, defaultValues, isPending }: Props) => {
  console.log("defaultValues", defaultValues);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<UserFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitHandler = (formData: UserFormData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-user-form"]}>
        <div className={styles["side-wrapper"]}>
          <div
            className={` ${styles["user-form-item"]}`}
          >
            <label>Email:</label>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Email Name"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles["submit-btn-wrapper"]}>
        <CustomButton
          isPending={isPending}
          type="submit"
          disabled={
            !isValid ||
            isPending
          }
          className={styles["submit-btn"]}
        >
          {mode === "edit" ? <div>Update User</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default UserForm;
