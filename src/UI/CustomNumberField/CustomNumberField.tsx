import { NumberInput, NumberInputProps, TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";
interface CustomNumberFieldProps extends NumberInputProps {
  errorMessage?: string;
  isRequired?: boolean;
}
const CustomNumberField = forwardRef<HTMLInputElement, CustomNumberFieldProps>(
  ({ errorMessage, isRequired = true, ...inputProps }, ref) => {
    // console.log('isRequired', isRequired);
    
    return (
      <>
        <CustomFormFieldLabel label={inputProps.label} isRequired={isRequired} />{" "}
        <NumberInput
          ref={ref}
          error={errorMessage}
          {...inputProps}
          label={undefined}
        />
      </>
    );
  }
);

export default CustomNumberField;
