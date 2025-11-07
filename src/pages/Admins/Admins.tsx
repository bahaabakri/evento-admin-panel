import { useEffect, useState } from "react";
import MainTable from "@/UI/MainTable/MainTable";
import { useHttp } from "@/hooks/useHttp";
import { Pagination, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconPlus,
  IconSettingsPlus,
  IconSquare,
  IconSquareX,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { showErrorToast, showSuccessToast } from "@/services/toast";
import { User } from "@/types/user.type";
import { MyResponse, MyResponsePagination } from "@/types/response.type.";
import adminsColumns from "./admins-columns";
import { UserStatus } from "@/enums/user-status.enum";
import RejectAdminModal from "@/components/Modals/RejectAdminModal/RejectAdminModal";
import AssignRolesToAdminModal from "@/components/Modals/AssignRolesToAdminModal/AssignRolesToAdminModal";
// import { useDisclosure } from "@mantine/hooks"

const AdminsPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [admins, setAdmins] = useState<User[]>([]);
  const navigate = useNavigate();
  const { openConfirmModal } = useConfirmModal();
  const [rejectingAdmin, setRejectingAdmin] = useState<User | null>(null);
  const [assigningRolesAdmin, setAssigningRolesAdmin] = useState<User | null>(
    null
  );
  const {
    loading: loadingAdminsData,
    errorMessage: errorMessageAdminsData,
    request: requestAdminsData,
  } = useHttp();
  const { loading: loadingApproveAdmin, request: requestApproveAdmin } =
    useHttp();
  const { loading: loadingRejectAdmin, request: requestRejectAdmin } =
    useHttp();
  const { loading: loadingDeleteAdmin, request: requestDeleteAdmin } =
    useHttp();

  const fetchAllAdmins = async (page: number = 1, perPage: number = 10) => {
    setPage(page);
    const { data: dataRes } = await requestAdminsData<
      MyResponsePagination<User>
    >("get", `admin/users/admins?page=${page}&perPage=${perPage}`);
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setAdmins(data);
    }
  };
  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const navigateToAddAdmin = () => {
    navigate("/admins/add");
  };
  const navigateToEditAdmin = (row: User) => {
    navigate(`/admins/edit/${row.id}`);
  };
  const onClickViewButton = (row: User) => {
    navigate(`/admins/details/${row.id}`);
  };
  const onClickDeleteButton = async (row: User) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete admin?",
      message:
        "Are you sure you want to delete this admin? This cannot be undone.",
      onConfirm: () => handleDelete(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const onClickApproveButton = async (row: User) => {
    openConfirmModal({
      title: "Approve admin?",
      message:
        "Are you sure you want to approve this admin? This cannot be undone.",
      onConfirm: () => handleApprove(row),
      confirmLabel: "Approve",
      color: "green",
    });
  };
  const onClickRejectButton = async (row: User) => {
    setRejectingAdmin(row);
  };
  const onClickAssignRolesButton = async (row: User) => {
    setAssigningRolesAdmin(row);
  };
  const handleDelete = async (row: User) => {
    const { data, error } = await requestDeleteAdmin<MyResponse<User, "user">>(
      "delete",
      `admin/users/admins/${row.id}`
    );
    if (error) {
      showErrorToast(error || "Failed to delete admin");
    } else {
      showSuccessToast(data?.message || "Admin deleted successfully");
      fetchAllAdmins(activePage);
    }
  };

  const handleApprove = async (row: User) => {
    const { data, error } = await requestApproveAdmin<MyResponse<User, "user">>(
      "post",
      `admin/users/admins/${row.id}/approve`
    );
    if (error) {
      showErrorToast(error || "Failed to approve admin");
    } else {
      showSuccessToast(data?.message || "Admin approved successfully");
      fetchAllAdmins(activePage);
    }
  };
  const handleReject = async (row: User, reason: string) => {
    const { data, error } = await requestRejectAdmin<MyResponse<User, "user">>(
      "post",
      `admin/users/admins/${row.id}/reject`,
      { reason }
    );
    if (error) {
      showErrorToast(error || "Failed to reject admin");
    } else {
      showSuccessToast(data?.message || "Admin rejected successfully");
      fetchAllAdmins(activePage);
    }
  };
  return (
    <>
      <div>
        {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
        {/* Modal content */}
        {/* </Modal> */}
        <MainTable
          title={"All Admins"}
          loading={loadingAdminsData}
          data={admins}
          errorMessage={errorMessageAdminsData}
          columns={adminsColumns}
          renderActions={(row) => (
            <div className="flex gap-2">
              <ThemeIcon
                variant="light"
                color="teal"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickViewButton(row)}
              >
                <IconEye color="teal" size={18} />
              </ThemeIcon>
              <ThemeIcon
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToEditAdmin(row)}
              >
                <IconEdit color="blue" size={18} />
              </ThemeIcon>
              <ThemeIcon
                variant="light"
                color="red"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickDeleteButton(row)}
              >
                <IconTrash color="red" size={18} />
              </ThemeIcon>
              <ThemeIcon
                title="assign roles"
                variant="light"
                color="violet"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickAssignRolesButton(row)}
              >
                <IconSettingsPlus color="violet" size={18} />
              </ThemeIcon>
              {row.status === UserStatus.PENDING && (
                <>
                  <ThemeIcon
                    title="approve admin"
                    variant="light"
                    color="green"
                    className="cursor-pointer"
                    size={30}
                    onClick={() => onClickApproveButton(row)}
                  >
                    <IconCheck color="green" size={18} />
                  </ThemeIcon>
                  <ThemeIcon
                    title="reject admin"
                    variant="light"
                    color="red"
                    className="cursor-pointer"
                    size={30}
                    onClick={() => onClickRejectButton(row)}
                  >
                    <IconSquareX color="red" size={18} />
                  </ThemeIcon>
                </>
              )}
            </div>
          )}
        >
          <CustomButton
            onClick={navigateToAddAdmin}
            leftSection={<IconPlus size={14} />}
          >
            <div>Add New Admin</div>
          </CustomButton>
        </MainTable>
        {!loadingAdminsData && admins && admins.length > 0 && (
          <Pagination
            className="m-auto w-fit"
            value={activePage}
            onChange={(page) => fetchAllAdmins(page)}
            total={numOfPages}
          />
        )}
      </div>
      <RejectAdminModal
        key={rejectingAdmin?.id}
        opened={!!rejectingAdmin}
        onClose={() => setRejectingAdmin(null)}
        onSubmit={(reason) => handleReject(rejectingAdmin!, reason)}
        loading={loadingRejectAdmin}
      />
      <AssignRolesToAdminModal
        key={assigningRolesAdmin?.id}
        opened={!!assigningRolesAdmin}
        adminId={assigningRolesAdmin?.id}
        onClose={() => setAssigningRolesAdmin(null)}
      />
    </>
  );
};

export default AdminsPage;
