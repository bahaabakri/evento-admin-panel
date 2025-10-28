import { Textarea, type TextareaProps } from "@mantine/core";
import { forwardRef } from "react";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";
interface CustomTextareaProps extends TextareaProps {
  errorMessage?: string;
  isRequired?: boolean;
}
const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ errorMessage, isRequired = true, ...inputProps }, ref) => {
    return (
      <>
        <CustomFormFieldLabel label={inputProps.label} isRequired={isRequired} />{" "}
        <Textarea
          ref={ref}
          error={errorMessage}
          {...inputProps}
          label={undefined}
        />
      </>
    );
  }
);

export default CustomTextarea;
