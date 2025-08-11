import styles from "./AddEvent.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddEventPage = () => {
  const { alert, handleError: handleErrorAddingEvent, handleSuccess: handleSuccessAddingEvent, setAlert } = useHandleErrorSuccess()
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
      handleSuccessAddingEvent('Created Event Successfully', '/events');
    } else {
      // handle error
      handleErrorAddingEvent(errorMessage);
    }
  };
  ////////////////// helper methods /////////////////

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
