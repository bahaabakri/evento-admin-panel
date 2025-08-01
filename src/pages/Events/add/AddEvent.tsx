import styles from "./AddEvent.module.scss";
import { useState } from "react";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import type { CustomAlertType } from "@/types/alert";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "@/services/toast";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddEventPage = () => {
  const [alert, setAlert] = useState<CustomAlertType | null>(null);
  const navigate = useNavigate();
  const {loading, error:errorMessage, request} = useHttp()
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: EventFormData, imagesIds: string[]) => {
    console.log("formData", formData);
    console.log("imageIds", imagesIds);
    const res = await request('post', 'admin/events', {
        ...formData,
        // date: dayjs(formData.date).toISOString(),
        imagesIds
    })
    if (res) {
      handleSuccessAddingEvent('Created Event Successfully');
    } else {
      // handle error
      handleErrorAddingEvent(errorMessage);
    }
  };
  ////////////////// helper methods /////////////////
  /**
   * To handle adding event success
   * @param message 
   */
    const handleSuccessAddingEvent = (message:string) => {
          showSuccessToast(message);
          navigate('/events');
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
        <EventForm
          mode="add"
          defaultValues={{
              name: "",
              location: "",
              description: "",
              date: dayjs().toISOString(),
              lat: 0,
              lng: 0
          }}
          isPending={loading}
          onSubmit={handleAdd} 
        />
      </div>
    </div>
  );
};

export default AddEventPage;
