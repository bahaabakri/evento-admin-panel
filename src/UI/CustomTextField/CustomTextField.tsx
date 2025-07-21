import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react"
interface CustomTextFieldProps extends TextInputProps {
    errorMessage?: string;
}
const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(({errorMessage, ...inputProps }, ref) => {
  return (
    <TextInput
      ref={ref}
      error={errorMessage}
      {...inputProps}
    />
  );
});

export default CustomTextField;