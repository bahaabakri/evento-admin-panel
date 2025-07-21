import { Textarea, type TextareaProps } from "@mantine/core";
import { forwardRef } from "react"
interface CustomTextareaProps extends TextareaProps {
    errorMessage?: string;
}
const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(({errorMessage, ...inputProps }, ref) => {
  return (
    <Textarea
      ref={ref}
      error={errorMessage}
      {...inputProps}
    />
  );
});

export default CustomTextarea;