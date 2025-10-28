import { FC, ReactNode } from "react";

export interface CustomFormFieldLabelProps {
    isRequired?: boolean;
    label?: ReactNode;
}
const CustomFormFieldLabel:FC<CustomFormFieldLabelProps> = ({isRequired = true, label}) => {
        // console.log(label, isRequired);

    if (!label) return null;
    return (
        <label>{label}: {isRequired && <span className="text-roseRed-5">*</span>}</label>
    )
}

export default CustomFormFieldLabel