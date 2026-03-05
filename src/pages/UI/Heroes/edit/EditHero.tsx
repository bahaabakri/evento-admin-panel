import styles from "./EditHero.module.scss";
import { useEffect, useState } from "react";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useParams } from "react-router-dom";
import EventForm, { EventFormData } from "@/components/Forms/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
// import dayjs from "dayjs";
import { Loader } from "@mantine/core";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { HeroResponse } from "@/components/Hero/hero.type";
import HeroForm, { HeroFormData } from "@/components/Forms/HeroForm/HeroForm";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const EditHeroPage = () => {
  const { alert, handleError: handleErrorUpdatingHero, handleSuccess: handleSuccessUpdatingHero, setAlert } = useHandleErrorSuccess()
  const [defaultValues, setDefaultValues] = useState<HeroFormData | null>(
    null
  );
  const [defaultSelectedImages, setDefaultSelectedImages] = useState<
    SelectedImage[]
  >([]);
  const { heroId } = useParams();
  const { loading: loadingEditHero, request:requestEditHero } = useHttp();
  const { loading: loadingHeroData, request: requestHeroData } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  useEffect(() => {
    if (heroId) {
      fetchHeroDetails(heroId);
    }
  }, []);

  const fetchHeroDetails = async (id: string) => {
    const {data} = await requestHeroData<HeroResponse>("get", `admin/heroes/${id}`);
    if (data) {
      // Populate the form with the fetched hero data
      const { images, ...rest } = data;
      setDefaultValues(rest);
      setDefaultSelectedImages(images);
    }
  };
  const handleEdit = async (formData: HeroFormData, imagesIds: number[]) => {
    // console.log("formData", formData);
    // console.log("imageIds", imagesIds);
    const {data, error} = await requestEditHero<MyResponse<HeroResponse, 'hero'>>("patch", `admin/heroes/${heroId}`, {
      ...formData,
      // date: dayjs(formData.date).toISOString(),
      imagesIds,
    });
    if (error) {
      // handle error
      handleErrorUpdatingHero(error);
    } else {
      handleSuccessUpdatingHero(data?.message || "Updated Hero Successfully", '/ui/heroes');
    }
  };
  return (
    <div className={styles["new-hero-wrapper"]}>
      <div className={styles["new-hero"]}>
        <h1 className={styles["new-hero-title"]}>Edit Hero</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}

        {/* {addEventFormState && addEventFormState.errorMessage && (
        )}
        {addEventFormState && addEventFormState.successMessage && (

        )} */}
        {defaultValues ? (
          <HeroForm
            mode="edit"
            defaultValues={defaultValues}
            defaultSelectedImages={defaultSelectedImages}
            isPending={loadingEditHero}
            onSubmit={handleEdit}
          />
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Loader size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditHeroPage;
