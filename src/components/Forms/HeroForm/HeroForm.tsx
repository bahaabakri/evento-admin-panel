// EventForm.tsx
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useCallback, useState } from "react";

import styles from "./HeroForm.module.scss";
import CustomTextField from "@/UI/CustomTextField/CustomTextField";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomDateTimePicker from "@/UI/CustomDatePicker/CustomDatePicker";
import ImagePicker, { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import LocationPicker from "@/UI/LocationPicker/LocationPicker";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { requestUploadIntent } from "@/services/upload";
import type { RequestIntentResponse } from "@/types/upload.type";
import { EventFormData } from "../EventForm/EventForm";
import heroFormSchema from "@/form-schemas/hero-form-schema";

export type HeroFormData = {
  name: string;
  title: string;
  description: string;
};

type Props = {
  mode: "add" | "edit";
  onSubmit: (data: HeroFormData, imageIds: number[]) => void;
  defaultValues: HeroFormData;
  isPending?: boolean;
  defaultSelectedImages?: SelectedImage[];
};

const HeroForm = ({
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
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<HeroFormData>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(heroFormSchema),
  });
  // console.log("watch", watch("date"));
  // useEffect hook to request intent api
  useEffect(() => {
    // setImagesIds(defaultSelectedImages.map((el) => el.id.toString()));
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
      checkImagesValidation(files, selectedImages);
      if (!imageError) {
        setImagesIds(selectedImages.map((el) => el.id));
      }
    },
    [],
  );
  /**
   *
   * @param files * @description This function is used to check the validation of the images.
   */
  const checkImagesValidation = (
    files: File[],
    selectedImages: SelectedImage[],
  ) => {
    if (selectedImages && selectedImages.length > 0) return;
    setImageError(() => {
      if (files.length <= 0) return "Please upload at least one image";
      if (!files.every((el) => el.type.startsWith("image/")))
        return "Only image files are allowed";
    });
  };

  const submitHandler = (formData: HeroFormData) => {
    if (!imagesIds.length) {
      setImageError("Please upload at least one image");
      return;
    }
    // console.log(imagesIds);

    onSubmit(formData, imagesIds);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles["new-hero-form"]}>
        <div className={styles["side-wrapper"]}>
          <div
            className={`${styles["hero-name-wrapper"]} ${styles["hero-form-item"]}`}
          >
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Hero Name (Not appear on the UI, just for internal use)"
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
            className={`${styles["hero-title-wrapper"]} ${styles["hero-form-item"]}`}
          >
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Hero Title"
                  label="Title"
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
            className={`${styles["hero-desc-wrapper"]} ${styles["hero-form-item"]}`}
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
            className={`${styles["hero-img-wrapper"]} ${styles["hero-form-item"]}`}
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
          {mode === "edit" ? <div>Update Hero</div> : <div>Submit</div>}
        </CustomButton>
      </div>
    </form>
  );
};

export default HeroForm;
