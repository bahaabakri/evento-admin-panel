import styles from "./EditEvent.module.scss";
import { useEffect, useState } from "react";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useParams } from "react-router-dom";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
// import dayjs from "dayjs";
import { Loader } from "@mantine/core";
import { SelectedImage } from "@/UI/ImagePicker/ImagePicker";
import { MyEvent } from "../events.type";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const EditEventPage = () => {
  const { alert, handleError: handleErrorUpdatingEvent, handleSuccess: handleSuccessUpdatingEvent, setAlert } = useHandleErrorSuccess()
  const [defaultValues, setDefaultValues] = useState<EventFormData | null>(
    null
  );
  const [defaultSelectedImages, setDefaultSelectedImages] = useState<
    SelectedImage[]
  >([]);
  const { eventId } = useParams();
  const { loading, error: errorMessage, request } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  useEffect(() => {
    if (eventId) {
      fetchEventDetails(eventId);
    }
  }, []);

  const fetchEventDetails = async (id: string) => {
    const res = await request<MyEvent>("get", `admin/events/${id}`);
    if (res) {
      // Populate the form with the fetched event data
      const { images, ...rest } = res;
      setDefaultValues(rest);
      setDefaultSelectedImages(images);
    }
  };
  const handleEdit = async (formData: EventFormData, imagesIds: string[]) => {
    console.log("formData", formData);
    console.log("imageIds", imagesIds);
    const res = await request("patch", `admin/events/${eventId}`, {
      ...formData,
      // date: dayjs(formData.date).toISOString(),
      imagesIds,
    });
    if (res) {
      handleSuccessUpdatingEvent("Updated Event Successfully", '/events');
    } else {
      // handle error
      handleErrorUpdatingEvent(errorMessage);
    }
  };
  return (
    <div className={styles["new-event-wrapper"]}>
      <div className={styles["new-event"]}>
        <h1 className={styles["new-event-title"]}>Edit Event</h1>
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
          <EventForm
            mode="edit"
            defaultValues={defaultValues}
            defaultSelectedImages={defaultSelectedImages}
            isPending={loading}
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

export default EditEventPage;
