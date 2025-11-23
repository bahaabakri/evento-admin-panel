import { useEffect, useState } from "react";
import MainTable from "@/UI/MainTable/MainTable";
import { useHttp } from "@/hooks/useHttp";
import type { MyEvent, MyEventPlan } from "./events.type";
import eventsColumns from "./events-columns";
import { Pagination, Table, ThemeIcon } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { showErrorToast, showSuccessToast } from "@/services/toast";
import { MyResponse, MyResponsePagination } from "@/types/response.type.";
import useIsAllowed from "@/hooks/useIsAllowed";
import { PermissionsEnum } from "../Permissions/permissions.enum";
import eventPlansColumns from "./plans/event-plans-columns";
// import { useDisclosure } from "@mantine/hooks"

const EventsPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const { loading, request, errorMessage } = useHttp();
  const [events, setEvents] = useState<MyEvent[]>([]);
  const navigate = useNavigate();
  const { openConfirmModal } = useConfirmModal();
  const { checkIsAllowed } = useIsAllowed();

  const fetchAllEvents = async (page: number = 1, perPage: number = 10) => {
    setPage(page);
    const { data: dataRes } = await request<MyResponsePagination<MyEvent>>(
      "get",
      `admin/events?page=${page}&perPage=${perPage}`
    );
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setEvents(data);
    }
  };
  const navigateToAddEvent = () => {
    navigate("/events/add");
  };
  useEffect(() => {
    fetchAllEvents();
  }, []);

  const navigateToEditEvent = (row: MyEvent) => {
    navigate(`/events/edit/${row.id}`);
  };
  const navigateToEditPlan = (row: MyEventPlan, eventId:number) => {
    navigate(`/events/${eventId}/plans/edit/${row.id}`);
  };
  const navigateToCreatePlan = (row: MyEvent) => {
    navigate(`/events/${row.id}/plans/add`);
  };
  const onClickDeleteEventButton = async (row: MyEvent) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete Event?",
      message:
        "Are you sure you want to delete this event? This cannot be undone.",
      onConfirm: () => handleDeleteEvent(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const handleDeleteEvent = async (row: MyEvent) => {
    const { data, error } = await request<MyResponse<MyEvent, "event">>(
      "delete",
      `admin/events/${row.id}`
    );
    if (error) {
      showErrorToast(error || "Failed to delete event");
    } else {
      showSuccessToast(data?.message || "Event deleted successfully");
      fetchAllEvents(activePage);
    }
  };

  const onClickDeletePlanButton = async (row: MyEventPlan) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete Plan?",
      message:
        "Are you sure you want to delete this event plan? This cannot be undone.",
      onConfirm: () => handleDeletePlan(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const handleDeletePlan = async (row: MyEventPlan) => {
    const { data, error } = await request<MyResponse<MyEventPlan, "event">>(
      "delete",
      `admin/plans/${row.id}`
    );
    if (error) {
      showErrorToast(error || "Failed to delete plan");
    } else {
      showSuccessToast(data?.message || "Event Plan deleted successfully");
      fetchAllEvents(activePage);
    }
  };
  return (
    <div>
      {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
      {/* Modal content */}
      {/* </Modal> */}
      <MainTable
        title={"All Events"}
        loading={loading}
        data={events}
        errorMessage={errorMessage}
        columns={eventsColumns}
        twoLevelsTableStatus="parent"
        renderNestedRows={(event) => (
          <MainTable
            twoLevelsTableStatus="child"
            title={`Plans for Event '${event.name}'`}
            data={event.plans}
            columns={eventPlansColumns}
            renderActions={(row) => (
              <div className="flex gap-2">
                {checkIsAllowed([PermissionsEnum.UPDATE_PLANS]) && (
                  <ThemeIcon
                    variant="light"
                    color="blue"
                    className="cursor-pointer"
                    size={30}
                    onClick={() => navigateToEditPlan(row, event.id)}
                  >
                    <IconEdit color="blue" size={18} />
                  </ThemeIcon>
                )}
                {checkIsAllowed([PermissionsEnum.DELETE_PLANS]) && (
                  <ThemeIcon
                    variant="light"
                    color="red"
                    className="cursor-pointer"
                    size={30}
                    onClick={() => onClickDeletePlanButton(row)}
                  >
                    <IconTrash color="red" size={18} />
                  </ThemeIcon>
                )}
              </div>
            )}
          />
        )}
        renderActions={(row) => (
          <div className="flex gap-2">
            {checkIsAllowed([PermissionsEnum.UPDATE_EVENTS]) && (
              <ThemeIcon
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToEditEvent(row)}
              >
                <IconEdit color="blue" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.DELETE_EVENTS]) && (
              <ThemeIcon
                variant="light"
                color="red"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickDeleteEventButton(row)}
              >
                <IconTrash color="red" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.CREATE_PLANS]) && (
              <ThemeIcon
                title="Create Plan"
                variant="light"
                color="teal"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToCreatePlan(row)}
              >
                <IconPlus color="teal" size={18} />
              </ThemeIcon>
            )}
          </div>
        )}
      >
        {checkIsAllowed([PermissionsEnum.CREATE_EVENTS]) && (
          <CustomButton
            onClick={navigateToAddEvent}
            leftSection={<IconPlus size={14} />}
          >
            <div>Add New Event</div>
          </CustomButton>
        )}
      </MainTable>
      {!loading && events && events.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={activePage}
          onChange={(page) => fetchAllEvents(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default EventsPage;
