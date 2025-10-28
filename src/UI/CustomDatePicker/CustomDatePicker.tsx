import { DatePickerInput, type DatePickerInputProps } from "@mantine/dates";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";

interface CustomDateTimePickerProps extends DatePickerInputProps {
  errorMessage?: string;
  value?: string | null;
  isRequired?: boolean;
}
const CustomDateTimePicker = ({
  errorMessage,
  value,
  isRequired = true,
  ...inputProps
}: CustomDateTimePickerProps) => {
  // const [value, setValue] = useState<string | null>(null);
  return (
    <>
      <CustomFormFieldLabel label={inputProps.label} isRequired={isRequired} />
      <DatePickerInput
        error={errorMessage}
        placeholder="Pick date"
        value={value}
        {...inputProps}
        label={undefined}
      />
    </>
  );
};
export default CustomDateTimePicker;
