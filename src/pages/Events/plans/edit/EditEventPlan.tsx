import styles from "./EditEventPlan.module.scss";
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
const EditEventPlanPage = () => {
  const {
    alert,
    handleError: handleErrorUpdatingEventPlan,
    handleSuccess: handleSuccessUpdatingEventPlan,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading: loadingEditPlan, request: requestEditPlan } = useHttp();
  const { eventId, planId } = useParams();
  const [eventData, setEventData] = useState<MyEvent>();
    const [defaultValues, setDefaultValues] = useState<EventPlanFormData | null>(
    null
  );
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
      const plan = data.plans.find((p) => p.id === +planId);
      setDefaultValues({...plan, eventId: +eventId });
    }
  };
  /*** action form hook */
  // console.log(watch("date"))
  const handleEdit = async (formData: EventPlanFormData) => {
    const { data, error } = await requestEditPlan<MyResponse<MyEventPlan, "plan">>(
      "patch",
      `admin/plans/${planId}`,
      {
        ...formData,
      }
    );
    if (error) {
      handleErrorUpdatingEventPlan(error);
    } else {
      handleSuccessUpdatingEventPlan(
        data?.message || "Updated Event Plan Successfully",
        "/events"
      );
    }
  };
  ////////////////// helper methods /////////////////

  return loadingEventData ? (
    <Loader />
  ) : (
    <div className={styles["edit-plan-wrapper"]}>
      <div className={styles["edit-plan"]}>
        <h1 className={styles["edit-plan-title"]}>Edit Plan '{defaultValues?.name}' for Event '{eventData?.name}'</h1>
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
            mode="edit"
            defaultValues={defaultValues}
            isPending={loadingEditPlan}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default EditEventPlanPage;
