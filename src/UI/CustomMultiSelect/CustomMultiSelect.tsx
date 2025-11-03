import {
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
  Loader,
  MultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { forwardRef } from "react";
import CustomFormFieldLabel from "../CustomFormFieldLabel/CustomFormFieldLabel";
import {
  IconCheck,
  IconSquareRoundedX,
  IconSquareRoundedXFilled,
} from "@tabler/icons-react";
interface CustomMultiSelectProps extends MultiSelectProps {
  errorMessage?: string;
  isRequired?: boolean;
  handleResetSelect?: () => void;
}
const CustomMultiSelect = forwardRef<any, CustomMultiSelectProps>(
  (
    { errorMessage, handleResetSelect, isRequired = true, ...inputProps },
    ref
  ) => {
    return (
      <>
        <div className="flex justify-between items-center">
          <CustomFormFieldLabel
            label={inputProps.label}
            isRequired={isRequired}
          />
          <div
            onMouseDown={(e) => {
              e.preventDefault(); // prevents input focus/dropdown toggle
              e.stopPropagation(); // stops event bubbling
              handleResetSelect?.();
            }}
            className="text-roseRed-5 cursor-pointer text-xs"
          >
            Reset All
          </div>
        </div>
        <MultiSelect
          classNames={{
            option: "data-[checked=true]:bg-gray-1",
          }}
          styles={{
            option: {
              marginBottom: 6, // add space between dropdown items
              borderRadius: 6,
            },
          }}
          error={errorMessage}
          {...inputProps}
          label={undefined}
          chevronColor="roseRed"
          checkIconPosition="right"
          renderOption={(item: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
            // special handling for our loading item
            if (item.option.value === "__loading") {
              return (
                <div className="flex justify-center w-full py-2">
                  <Loader size="xs" />
                </div>
              );
            }
            return (
              <div className="flex justify-between items-center w-full">
                <div>{item.option.label}</div>
                {item.checked && (
                  <div>
                    <IconCheck className="text-roseRed-5" size={18} />
                  </div>
                )}
              </div>
            );
          }}
        ></MultiSelect>
      </>
    );
  }
);
export default CustomMultiSelect;
