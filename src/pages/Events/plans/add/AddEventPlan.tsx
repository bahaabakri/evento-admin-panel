import styles from "./AddEventPlan.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, {
  EventFormData,
} from "@/components/Forms/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { MyEvent, MyEventPlan } from "../../events.type";
import EventPlanForm, {
  EventPlanFormData,
} from "@/components/Forms/PlanForm/EventPlanForm";
import { useParams } from "react-router-dom";
import eventPlanFormSchema from "@/form-schemas/plan-form-schema";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddEventPlanPage = () => {
  const {
    alert,
    handleError: handleErrorAddingEventPlan,
    handleSuccess: handleSuccessAddingEventPlan,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading, request } = useHttp();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<MyEvent>();
  const { loading: loadingEventData, request: requestEventData } = useHttp();

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, []);
  const fetchEventDetails = async () => {
    const { data } = await requestEventData<MyEvent>(
      "get",
      `admin/events/${eventId}`
    );
    if (data) {
      setEventData(data);
    }
  };
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: EventPlanFormData) => {
    const { data, error } = await request<MyResponse<MyEventPlan, "plan">>(
      "post",
      "admin/plans",
      {
        ...formData,
      }
    );
    if (error) {
      handleErrorAddingEventPlan(error);
    } else {
      handleSuccessAddingEventPlan(
        data?.message || "Created Event Plan Successfully",
        "/events"
      );
    }
  };
  ////////////////// helper methods /////////////////

  return loadingEventData ? (
    <Loader />
  ) : (
    <div className={styles["new-plan-wrapper"]}>
      <div className={styles["new-plan"]}>
        <h1 className={styles["new-plan-title"]}>Add New Plan for Event '{eventData?.name}'</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}
        {eventId && (
          <EventPlanForm
            schema={eventPlanFormSchema}
            mode="add"
            defaultValues={{
              name: "",
              description: "",
              price: null,
              capacity: null,
              currency: "",
              eventId: +eventId,
            }}
            isPending={loading}
            onSubmit={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default AddEventPlanPage;
