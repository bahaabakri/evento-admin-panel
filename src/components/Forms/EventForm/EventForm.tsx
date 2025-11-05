// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useCallback, useState } from "react";

import styles from "./EventForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomDateTimePicker from "@/UI/CustomDatePicker/CustomDatePicker";
import ImagePicker, { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import LocationPicker from "@/UI/LocationPicker/LocationPicker";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { requestUploadIntent } from "@/services/upload";
import type { RequestIntentResponse } from "@/types/upload.type";
import eventFormSchema from "@/form-schemas/event-form-schema";

export type EventFormData = {
  date: string;
  name: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
};

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: EventFormData, imageIds: number[]) => void;
  defaultValues: EventFormData;
  isPending?: boolean;
  defaultSelectedImages?: SelectedImage[];
};

const EventForm = ({
  mode,
  onSubmit,
  defaultValues,
  isPending,
  defaultSelectedImages,
}: Props) => {
  // console.log("defaultValues", defaultValues);
  const [imageError, setImageError] = useState<string>();
  const [uploadIntent, setUploadIntent] = useState<RequestIntentResponse>();
  const [imagesIds, setImagesIds] = useState<number[]>([]);
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
    resolver: yupResolver(eventFormSchema),
  });
  // console.log("watch", watch("date"));
  // useEffect hook to request intent api
  useEffect(() => {
    // setImagesIds(defaultSelectedImages.map((el) => el.id.toString()));
    requestUploadImageIntent();
  }, []);
  
  // console.log("watch", watch());
  useEffect(() => {
    handleSelectLocation(defaultValues.lat, defaultValues.lng);
  }, [defaultValues]);
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
      checkImagesValidation(files, selectedImages);
      if (!imageError) {
        setImagesIds(selectedImages.map((el) => el.id));
      }
    },
    []
  );
  /**
   *
   * @param files * @description This function is used to check the validation of the images.
   */
  const checkImagesValidation = (
    files: File[],
    selectedImages: SelectedImage[]
  ) => {
    if (selectedImages && selectedImages.length > 0) return;
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
    // console.log(imagesIds);

    onSubmit(formData, imagesIds);
  };

  const handleSelectLocation = (selectedLat: number, selectedLng: number) => {
    setValue("lat", selectedLat);
    setValue("lng", selectedLng);
    setLat(selectedLat);
    setLng(selectedLng);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-event-form"]}>
        <div className={styles["side-wrapper"]}>
          <div
            className={`${styles["event-name-wrapper"]} ${styles["event-form-item"]}`}
          >
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Event Name"
                  label="Name"
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
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  label="Location"
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
              onSelect={handleSelectLocation}
              defaultLat={defaultValues.lat}
              defaultLng={defaultValues.lng}
            />
          </div>
          <div
            className={`${styles["event-desc-wrapper"]} ${styles["event-form-item"]}`}
          >
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextarea
                  {...field}
                  placeholder="Enter Event Description"
                  label="Description"
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
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState }) => (
                <CustomDateTimePicker
                  {...field}
                  label="Event Date & Time"
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
            <ImagePicker
              label="Images"
              defaultSelectedImages={defaultSelectedImages}
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
