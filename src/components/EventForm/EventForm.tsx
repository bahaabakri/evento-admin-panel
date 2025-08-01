// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useCallback, useState } from "react";
import * as yup from "yup";
import dayjs from "dayjs";

import styles from "./EventForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomDateTimePicker from "@/UI/CustomDatePicker/CustomDatePicker";
import ImagePicker, { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import LocationPicker from "@/UI/LocationPicker/LocationPicker";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { requestUploadIntent } from "@/services/upload";
import type { RequestIntentResponse } from "@/types/upload.type";

// yup validation schema
const schema = yup.object({
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

export type  EventFormData = {
    date: string;
    name: string;
    location: string;
    description: string;
    lat: number;
    lng: number;
}

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: EventFormData, imageIds: string[]) => void;
  defaultValues: EventFormData;
  isPending?: boolean;
};

const EventForm = ({ mode, onSubmit, defaultValues, isPending }: Props) => {
  const [imageError, setImageError] = useState<string>();
  const [uploadIntent, setUploadIntent] = useState<RequestIntentResponse>();
  const [imagesIds, setImagesIds] = useState<string[]>([]);
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<EventFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  console.log("watch", watch('date'));
  // useEffect hook to request intent api
  useEffect(() => {
    requestUploadImageIntent();
  }, []);
  const requestUploadImageIntent = async () => {
    const intent = await requestUploadIntent();
    setUploadIntent(intent);
  };
  /**
   * * handleOnChangePicker
   * @description This function is used to handle the change event of the image picker.
   */
  const handleOnChangePicker = useCallback(
    (files: File[], selectedImages: SelectedImage[]) => {
      // once change in image picker please check error message
      checkImagesValidation(files);
      if (!imageError) {
        setImagesIds(selectedImages.map((el) => el.id.toString()));
      }
    },
    []
  );
  /**
   *
   * @param files * @description This function is used to check the validation of the images.
   */
  const checkImagesValidation = (files: File[]) => {
    setImageError(() => {
      if (files.length <= 0) return "Please upload at least one image";
      if (!files.every((el) => el.type.startsWith("image/")))
        return "Only image files are allowed";
    });
  };

  const submitHandler = (formData: EventFormData) => {
    if (!imagesIds.length) {
      setImageError("Please upload at least one image");
      return;
    }
    onSubmit(formData, imagesIds);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-event-form"]}>
        <div className={styles["side-wrapper"]}>
          <div
            className={`${styles["event-name-wrapper"]} ${styles["event-form-item"]}`}
          >
            <label>Name:</label>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Event Name"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div
            className={`${styles["event-location-wrapper"]} ${styles["event-form-item"]}`}
          >
            <label>Location:</label>
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Event Location"
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
            <input type="hidden" name="lng" value={lng} />
            <input type="hidden" name="lat" value={lat} />
            <LocationPicker
              onSelect={(selectedLat, selectedLng) => {
                setValue("lat", selectedLat);
                setValue("lng", selectedLng);
                setLat(selectedLat);
                setLng(selectedLng);
              }}
            />
          </div>
          <div
            className={`${styles["event-desc-wrapper"]} ${styles["event-form-item"]}`}
          >
            <label>Description:</label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextarea
                  {...field}
                  placeholder="Enter Event Description"
                  rows={4}
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>
        <div className={styles["side-wrapper"]}>
          <div
            className={`${styles["event-date-time-wrapper"]} ${styles["event-form-item"]}`}
          >
            <label>Event Date:</label>
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState }) => (
                <CustomDateTimePicker
                  {...field}
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
          </div>
          <div
            className={`${styles["event-img-wrapper"]} ${styles["event-form-item"]}`}
          >
            <label>Images:</label>
            <ImagePicker
              uploadIntent={uploadIntent}
              onChange={handleOnChangePicker}
              errorMessage={imageError}
            />
          </div>
        </div>
      </div>
      <div className={styles["submit-btn-wrapper"]}>
        <CustomButton
          isPending={isPending}
          type="submit"
          disabled={
            !isValid ||
            isPending ||
            !imagesIds ||
            (imagesIds && imagesIds.length <= 0)
          }
          className={styles["submit-btn"]}
        >
          {mode === "edit" ? <div>Update Event</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default EventForm;
