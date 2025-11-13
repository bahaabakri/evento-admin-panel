import { EventPlanFormData } from "@/components/Forms/PlanForm/EventPlanForm";
import * as yup from "yup";

const eventPlanFormSchema: yup.ObjectSchema<Required<EventPlanFormData>> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(255, "Description must be at most 255 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than 0"),

  currency: yup
    .string()
    .required("Currency is required")
    .max(10, "Currency code must be short (e.g., USD)"),

  capacity: yup
    .number()
    .typeError("Capacity must be an integer")
    .integer("Capacity must be an integer")
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1"),

  eventId: yup
    .number()
    .typeError("Event ID must be a number")
    .required("Event ID is required"),
});


export default eventPlanFormSchema
