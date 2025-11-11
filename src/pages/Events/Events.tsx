import { useEffect, useState } from "react";
import MainTable from "@/UI/MainTable/MainTable";
import { useHttp } from "@/hooks/useHttp";
import type { MyEvent } from "./events.type";
import eventsColumns from "./events-columns";
import { Pagination, ThemeIcon } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { showErrorToast, showSuccessToast } from "@/services/toast";
import { MyResponse, MyResponsePagination } from "@/types/response.type.";
import useIsAllowed from "@/hooks/useIsAllowed";
import { PermissionsEnum } from "../Permissions/permissions.enum";
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

  const handleEdit = (row: MyEvent) => {
    navigate(`/events/edit/${row.id}`);
  };
  const onClickDeleteButton = async (row: MyEvent) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete item?",
      message:
        "Are you sure you want to delete this item? This cannot be undone.",
      onConfirm: () => handleDelete(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const handleDelete = async (row: MyEvent) => {
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
        renderActions={(row) => (
          <div className="flex gap-2">
            {checkIsAllowed([PermissionsEnum.UPDATE_EVENTS]) && (
              <ThemeIcon
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => handleEdit(row)}
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
                onClick={() => onClickDeleteButton(row)}
              >
                <IconTrash color="red" size={18} />
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
