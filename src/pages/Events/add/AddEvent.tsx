// import CustomTextField from '@/UI/CustomTextField/CustomTextField'
import styles from "./AddEvent.module.scss";
// import CustomDateTimePicker from '@/UI/CustomDateTimePicker/CustomDateTimePicker'
// import ImagePicker, { SelectedImage } from '@/UI/ImagePicker/ImagePicker'
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActionState, useCallback, useEffect, useState } from "react";
import addEventAction from "./add-event-action";
// import Button from '@/UI/Button/Button';
// import Alert from '@mui/material/Alert';
import dayjs from "dayjs";
import CustomAlert from "../../../UI/CustomAlert/CustomAlert";
import CustomTextField from "../../../UI/CustomTextField/CustomTextField";
import CustomTextarea from "../../../UI/CustomTextArea/CustomTextArea";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import type { RequestIntentResponse } from "../../../types/upload.type";
import { requestUploadIntent } from "../../../services/upload";
import type { SelectedImage } from "../../../UI/ImagePicker/ImagePicker";
import ImagePicker from "../../../UI/ImagePicker/ImagePicker";
import CustomDateTimePicker from "../../../UI/CustomDatePicker/CustomDatePicker";
import LocationPicker from "../../../UI/LocationPicker/LocationPicker";
import type { CustomAlertType } from "../../../types/alert";
import { useNavigate } from "react-router-dom";
// import { requestUploadIntent } from '@/services/upload';
// import { RequestIntentResponse } from '@/types/upload.type';

// yup validation schema
const addEventFormValidationSchema = yup.object({
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

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddEventPage = () => {
  /*** states */
  const [imageError, setImageError] = useState<string>();
  const [uploadIntent, setUploadIntent] = useState<RequestIntentResponse>();
  const [imagesIds, setImagesIds] = useState<string[]>();
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [alert, setAlert] = useState<CustomAlertType | null>(null);
  const navigate = useNavigate();
  /*** react hook form */
  const {
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      date: dayjs().toISOString(),
      lat: 0,
      lng: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(addEventFormValidationSchema),
  });
  /*** action form hook */
  // console.log(watch("date"))
  const [addEventFormState, addEventFormAction, isPending] = useActionState(
    addEventAction,
    {
      errorMessage: null,
      successMessage: null,
    }
  );
  useEffect(() => {
    if (addEventFormState.successMessage) {
        handleSuccessAddingEvent(addEventFormState.successMessage);
    }
    else if (addEventFormState.errorMessage) {
        handleErrorAddingEvent(addEventFormState.errorMessage);
    }
  }, [addEventFormState])
  // useEffect hook to request intent api
  useEffect(() => {
    requestUploadImageIntent();
  }, []);
  ////////////////// helper methods /////////////////
  /**
   * To handle adding event success
   * @param message 
   */
    const handleSuccessAddingEvent = (message:string) => {
            setAlert({
                type: "success",
                title: "Success",
                message
            });
            setTimeout(() => {
                setAlert(null);
                navigate("/events");
            }, 5000);
        }

    /**
     * To handle adding event error
     * @param message 
     */
    const handleErrorAddingEvent = (message:string) => {
        setAlert({
            type: "error",
            title: "Error",
            message
        });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    }
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

  const requestUploadImageIntent = async () => {
    const intent = await requestUploadIntent();
    setUploadIntent(intent);
  };
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
  return (
    <div className={styles["new-event-wrapper"]}>
      <div className={styles["new-event"]}>
        <h1 className={styles["new-event-title"]}>Add New Event</h1>
        {alert && 
            <CustomAlert
                onClose={() => setAlert(null)}
                title={alert.title}
                message={alert.message}
                type={alert.type}
            />
        }

        {/* {addEventFormState && addEventFormState.errorMessage && (
        )}
        {addEventFormState && addEventFormState.successMessage && (

        )} */}
        <form action={addEventFormAction}>
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
                {imagesIds &&
                  imagesIds.map((el) => (
                    <input type="hidden" key={el} name="imagesIds" value={el} />
                  ))}
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
              <div>Submit</div>
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;
