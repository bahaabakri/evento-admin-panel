import * as yup from "yup";
import { HeroFormData } from "@/components/Forms/HeroForm/HeroForm";

const heroFormSchema: yup.ObjectSchema<Required<HeroFormData>> = yup.object({
  name: yup
    .string()
    .required("Hero name is required")
    .min(2, "Please Type at least 2 characters")
    .max(100, "Please Type less than 100 characters"),
  title: yup
    .string()
    .required("Hero title is required")
    .min(3, "Please Type at least 3 characters")
    .max(255, "Please Type less than 255 characters"),
  description: yup
    .string()
    .required("Hero description is required")
    .min(5, "Please Type at least 5 characters")
    .max(255, "Please Type less than 255 characters"),
});

export default heroFormSchema;
