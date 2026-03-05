import styles from "./AddHero.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, {
  EventFormData,
} from "@/components/Forms/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { HeroResponse } from "@/components/Hero/hero.type";
import HeroForm, { HeroFormData } from "@/components/Forms/HeroForm/HeroForm";
import AddEventPage from "@/pages/Events/add/AddEvent";
// import * as dayjs from "dayjs";

/**
 * New Hero component
 * @description This component is used to add a new hero.
 * @returns
 */
const AddHeroPage = () => {
  const {
    alert,
    handleError: handleErrorAddingHero,
    handleSuccess: handleSuccessAddingHero,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading, request } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: HeroFormData, imagesIds: number[]) => {
    // console.log("formData", formData);
    // console.log("imageIds", imagesIds);
    const { data, error } = await request<MyResponse<HeroResponse, "hero">>(
      "post",
      "admin/heroes",
      {
        ...formData,
        // date: dayjs(formData.date).toISOString(),
        imagesIds,
      },
    );
    if (error) {
      handleErrorAddingHero(error);
    } else {
      handleSuccessAddingHero(
        data?.message || "Created Hero Successfully",
        "/ui/heroes",
      );
    }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["new-hero-wrapper"]}>
      <div className={styles["new-hero"]}>
        <h1 className={styles["new-hero-title"]}>Add New Hero</h1>
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
        <HeroForm
          mode="add"
          defaultValues={{
            name: "",
            title: "",
            description: "",
          }}
          isPending={loading}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddHeroPage;