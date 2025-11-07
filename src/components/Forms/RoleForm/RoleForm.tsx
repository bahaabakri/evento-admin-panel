// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./RoleForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { isFieldRequired, makeSelectUniqueByValue } from "@/services/form";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomMultiSelect from "@/UI/CustomMultiSelect/CustomMultiSelect";
import { useEffect, useState } from "react";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { Permission } from "@/pages/Permissions/permissions.type";

export type RoleFormData = {
  name: string;
  description: string;
  permissions: { label: string; value: string }[];
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
  // console.log("defaultValues", defaultValues);
  const {
    control,
    handleSubmit,
    // watch,
    setValue,
    formState: { isValid },
  } = useForm<RoleFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const {
    data: permissions,
    loading,
    search,
    setSearch,
    loadMore,
  } = usePaginatedFetch<Permission>({
    endpoint: "/admin/permissions",
    mapData: (data) =>
      makeSelectUniqueByValue(data.map((p) => ({ label: p.name, value: p.id.toString() }))),
    perPage: 20,
    mode: "append", // 👈 infinite scroll mode
  });
  const submitHandler = (formData: RoleFormData) => {
    onSubmit(formData);
  };
  const [selectedPermissions, setSelectedPermissions] = useState<{label: string, value:string}[]>([])

  useEffect(() => {
    setSelectedPermissions(defaultValues?.permissions)  
  }, [defaultValues])
  /** ⬇ Helper: merge permissions + default values + loading placeholder */
  const getPermissionsData = () =>
    makeSelectUniqueByValue([
      ...permissions, // from BE
      ...(selectedPermissions ?? []), // saved after select
      ...(loading
        ? [
            {
              label: "Loading...",
              value: "__loading",
              disabled: true,
            },
          ]
        : []),
    ]);

  /** ⬇ Helper: map string[] from MultiSelect → { label, value }[] for form */
  const mapSelectedPermissions = (values: string[]) =>
    values.map((value) => {
      const found = [...permissions, ...selectedPermissions].find((p) => p.value === value);
      return found ?? { label: value, value };
    });

  /** ⬇ Helper: reset selected permissions */
  const resetPermissions = () => setValue("permissions", []);

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
              name="permissions"
              render={({ field, fieldState }) => (
                <CustomMultiSelect
                  handleResetSelect={resetPermissions}
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Permissions"
                  placeholder="Select Permissions"
                  data={getPermissionsData()}
                  searchable
                  searchValue={search}
                  onSearchChange={setSearch}
                  nothingFoundMessage={"No permissions"}
                  value={field.value?.map((v) => v.value)}
                  onChange={(values) => {
                    // this is because hook form needs the value of multiselect to be label, value pairs
                    field.onChange(mapSelectedPermissions(values))
                    setSearch(search)                    
                    setSelectedPermissions(mapSelectedPermissions(values))
                  }}
                  scrollAreaProps={{
                    onBottomReached: () => {
                      if (!loading) loadMore();
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
