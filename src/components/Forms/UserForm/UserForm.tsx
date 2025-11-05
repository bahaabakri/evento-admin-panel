// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./UserForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomPhoneField from "@/UI/CustomPhoneField/CustomPhoneField";
import { isFieldRequired } from "@/services/form";

export type UserFormData = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
};

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: UserFormData) => void;
  defaultValues: UserFormData;
  isPending?: boolean;
schema: yup.ObjectSchema<any>; // 👈 new

};

const UserForm = ({ mode, onSubmit, defaultValues, isPending, schema }: Props) => {
  console.log("defaultValues", defaultValues);
  const {
    control,
    handleSubmit,
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
          <div className={` ${styles["user-form-item"]}`}>
            <Controller
              control={control}
              name="firstname"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Firstname"
                  placeholder="Enter Firstname"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div className={` ${styles["user-form-item"]}`}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Email"
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
        <div className={styles["side-wrapper"]}>
          <div className={` ${styles["user-form-item"]}`}>
            <Controller
              control={control}
              name="lastname"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  placeholder="Enter Lastname"
                  label="Lastname"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div className={` ${styles["user-form-item"]}`}>
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <CustomPhoneField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Phone"
                  placeholder="Enter Phone Number"
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
          disabled={!isValid || isPending}
          className={styles["submit-btn"]}
        >
          {mode === "edit" ? <div>Update User</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default UserForm;
