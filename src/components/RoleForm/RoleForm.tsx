// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./RoleForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomPhoneField from "@/UI/CustomPhoneField/CustomPhoneField";
import { isFieldRequired } from "@/services/form";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomMultiSelect from "@/UI/CustomMultiSelect/CustomMultiSelect";
import { useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { usePermissions } from "@/hooks/userPermissions";

export type RoleFormData = {
  name: string;
  description: string;
  permissionsIds: string[];
};

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: RoleFormData) => void;
  defaultValues: RoleFormData;
  isPending?: boolean;
  schema: yup.ObjectSchema<any>;
};

const RoleForm = ({
  mode,
  onSubmit,
  defaultValues,
  isPending,
  schema,
}: Props) => {
  console.log("defaultValues", defaultValues);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RoleFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { permissions, search, setSearch, loadMore } = usePermissions();
  const submitHandler = (formData: RoleFormData) => {
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-role-form"]}>
        <div className={styles["side-wrapper"]}>
          <div className={` ${styles["role-form-item"]}`}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Name"
                  placeholder="Enter Name"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div className={` ${styles["role-form-item"]}`}>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <CustomTextarea
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Description"
                  placeholder="Enter Description"
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
          <div className={` ${styles["role-form-item"]}`}>
            <Controller
              control={control}
              name="permissionsIds"
              render={({ field, fieldState }) => (
                <CustomMultiSelect
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Permissions"
                  placeholder="Select Permissions"
                  data={permissions}
                  searchable
                  searchValue={search}
                  onSearchChange={setSearch}
                  nothingFoundMessage="No permissions"
                  scrollAreaProps={{
                    onBottomReached: () => {
                      loadMore();
                    },
                  }}
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
          {mode === "edit" ? <div>Update Role</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default RoleForm;
