import { forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import { TextInput } from "@mantine/core";
import type { ComponentProps } from "react";
import flags from 'react-phone-number-input/flags'

type PhoneInputProps = ComponentProps<typeof PhoneInput>;

interface CustomPhoneFieldProps extends PhoneInputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

const CustomPhoneField = forwardRef<HTMLInputElement, CustomPhoneFieldProps>(
  ({ placeholder, errorMessage, value, onChange, ...inputProps }, ref) => {
    return (
      <PhoneInput
        ref={ref as any}
        value={value}
        onChange={onChange}
        defaultCountry="US"
        international
        withCountryCallingCode
        inputComponent={TextInput as any} // 👈 this makes it use Mantine’s TextInput
        {...(placeholder ? { placeholder } : {})}
        error={errorMessage}
        {...inputProps}
      />
    );
  }
);

export default CustomPhoneField;
