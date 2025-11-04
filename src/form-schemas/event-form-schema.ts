import { EventFormData } from "@/components/EventForm/EventForm";
import * as yup from "yup";
import dayjs from "dayjs";

const eventFormSchema: yup.ObjectSchema<Required<EventFormData>> = yup.object({
  name: yup
    .string()
    .required("Event name is required")
    .min(3, "Please Type at least 3 characters")
    .max(255, "Please Type less than 255 characters"),
  location: yup
    .string()
    .required("Event location is required")
    .min(3, "Please Type at least 3 characters")
    .max(255, "Please Type less than 255 characters"),
  description: yup
    .string()
    .required("Event description is required")
    .min(5, "Please Type at least 5 characters")
    .max(255, "Please Type less than 255 characters"),
  date: yup
    .string()
    .required("Start date is required")
    .test("is-valid-date", "Invalid date format", (value) => {
      return value ? dayjs(value).isValid() : false;
    }),
  lat: yup
    .number()
    .required("Latitude is required")
    .min(-90, "Latitude must be ≥ -90")
    .max(90, "Latitude must be ≤ 90"),
  lng: yup
    .number()
    .required("Longitude is required")
    .min(-90, "Latitude must be ≥ -90")
    .max(90, "Latitude must be ≤ 90"),
});

export default eventFormSchema