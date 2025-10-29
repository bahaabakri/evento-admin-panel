import { forwardRef } from "react";
import PhoneInput from "react-phone-number-input";
import { TextInput } from "@mantine/core";
import type { ComponentProps } from "react";
import flags from "react-phone-number-input/flags";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";

type PhoneInputProps = ComponentProps<typeof PhoneInput>;

interface CustomPhoneFieldProps extends PhoneInputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isRequired?: boolean;
}

const CustomPhoneField = forwardRef<HTMLInputElement, CustomPhoneFieldProps>(
  (
    {
      placeholder,
      isRequired = true,
      errorMessage,
      value,
      onChange,
      ...inputProps
    },
    ref
  ) => {
    return (
      <>
        <CustomFormFieldLabel label={inputProps.label} isRequired={isRequired} />{" "}
        <PhoneInput
          ref={ref as any}
          value={value}
          onChange={(val) => onChange(val ?? "")} // ✅ convert undefined → ""
          defaultCountry="US"
          international
          withCountryCallingCode
          inputComponent={TextInput as any} // 👈 this makes it use Mantine’s TextInput
          {...(placeholder ? { placeholder } : {})}
          error={errorMessage}
          {...inputProps}
          label={undefined}
        />
      </>
    );
  }
);

export default CustomPhoneField;
