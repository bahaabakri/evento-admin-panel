// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./EventPlanForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomButton from "@/UI/CustomButton/CustomButton";
import {
  combineMultiSelectData,
  isFieldRequired,
  makeSelectUniqueByValue,
  mapSelectedDataToLabelValuePair,
} from "@/services/form";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomMultiSelect from "@/UI/CustomMultiSelect/CustomMultiSelect";
import { useEffect, useState } from "react";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { Permission } from "@/pages/Permissions/permissions.type";
import CustomNumberField from "@/UI/CustomNumberField/CustomNumberField";

export type EventPlanFormData = {
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  eventId: number;
};

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: EventPlanFormData) => void;
  defaultValues: EventPlanFormData;
  isPending?: boolean;
  schema: yup.ObjectSchema<any>;
};

const EventPlanForm = ({
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
  } = useForm<EventPlanFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const submitHandler = (formData: EventPlanFormData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-plan-form"]}>
        <div className={styles["side-wrapper"]}>
          <div className={` ${styles["plan-form-item"]}`}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Name"
                  placeholder="Enter Plan Name"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div className={` ${styles["plan-form-item"]}`}>
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
          <div className="flex items-center gap-5">
            <div className={`flex-1 ${styles["plan-form-item"]}`}>
              <Controller
                control={control}
                name="price"
                render={({ field, fieldState }) => (
                  <CustomNumberField
                    {...field}
                    isRequired={isFieldRequired(schema, field.name)}
                    label="Price"
                    placeholder="Enter Price"
                    errorMessage={
                      fieldState.isTouched && fieldState.error
                        ? fieldState.error.message
                        : ""
                    }
                  />
                )}
              />
            </div>
            <div className={`flex-1 ${styles["plan-form-item"]}`}>
              <Controller
                control={control}
                name="currency"
                render={({ field, fieldState }) => (
                  <CustomTextField
                    {...field}
                    isRequired={isFieldRequired(schema, field.name)}
                    label="Currency"
                    placeholder="Enter Currency"
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
          <div className={` ${styles["plan-form-item"]}`}>
            <Controller
              control={control}
              name="capacity"
              render={({ field, fieldState }) => (
                <CustomNumberField
                  {...field}
                  isRequired={isFieldRequired(schema, field.name)}
                  label="Capacity"
                  placeholder="Enter Plan Capacity"
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
          {mode === "edit" ? <div>Update Plan</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default EventPlanForm;
