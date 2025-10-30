import {
  MultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { forwardRef } from "react";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";
interface CustomMultiSelectProps extends MultiSelectProps {
  errorMessage?: string;
  isRequired?: boolean;}
const CustomMultiSelect = forwardRef<HTMLSelectElement, CustomMultiSelectProps>(
  ({ errorMessage, isRequired = true, ...inputProps }, ref) => {
    return (
      <>
        <CustomFormFieldLabel
          label={inputProps.label}
          isRequired={isRequired}
        />{" "}
        <MultiSelect
          error={errorMessage}
          {...inputProps}
          label={undefined}
        ></MultiSelect>
      </>
    );
  }
);
export default CustomMultiSelect;
