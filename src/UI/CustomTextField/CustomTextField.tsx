import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";
interface CustomTextFieldProps extends TextInputProps {
  errorMessage?: string;
  isRequired?: boolean;
}
const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ errorMessage, isRequired = true, ...inputProps }, ref) => {
    return (
      <>
        <CustomFormFieldLabel label={inputProps.label} isRequired={isRequired} />{" "}
        <TextInput
          ref={ref}
          error={errorMessage}
          {...inputProps}
          label={undefined}
        />
      </>
    );
  }
);

export default CustomTextField;
