import { DatePickerInput, type DatePickerInputProps } from '@mantine/dates';

interface CustomDateTimePickerProps extends DatePickerInputProps {
  errorMessage?:string;
  value?:string | null;
  // onChange?:(val:string | null) => void
}
const CustomDateTimePicker = ({errorMessage, value, ...inputProps}:CustomDateTimePickerProps) => {
  // const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      error={errorMessage}
      placeholder="Pick date"
      value={value}
      {...inputProps}
    />
  );
}
export default CustomDateTimePicker