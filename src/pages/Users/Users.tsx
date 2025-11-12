import { useEffect, useState } from "react";
import MainTable from "@/UI/MainTable/MainTable";
import { useHttp } from "@/hooks/useHttp";
import { Pagination, ThemeIcon } from "@mantine/core";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { showErrorToast, showSuccessToast } from "@/services/toast";
import { User } from "@/types/user.type";
import { MyResponsePagination } from "@/types/response.type.";
import usersColumns from "./users-columns";
import useIsAllowed from "@/hooks/useIsAllowed";
import { PermissionsEnum } from "../Permissions/permissions.enum";
// import { useDisclosure } from "@mantine/hooks"

const UsersPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const { loading, errorMessage, request } = useHttp();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { openConfirmModal } = useConfirmModal();
  const { checkIsAllowed } = useIsAllowed();

  const fetchAllUsers = async (page: number = 1, perPage: number = 10) => {
    setPage(page);
    const { data: dataRes } = await request<MyResponsePagination<User>>(
      "get",
      `admin/users/users?page=${page}&perPage=${perPage}`
    );
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setUsers(data);
    }
  };
  const navigateToAddUser = () => {
    navigate("/users/add");
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigateToEditUser = (row: User) => {
    navigate(`/users/edit/${row.id}`);
};
const onClickViewButton = (row: User) => {
    navigate(`/users/details/${row.id}`);
  }
  const onClickDeleteButton = async (row: User) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete user?",
      message:
        "Are you sure you want to delete this user? This cannot be undone.",
      onConfirm: () => handleDelete(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const handleDelete = async (row: User) => {
    try {
      const res = await request("delete", `admin/users/users/${row.id}`);
      if (res) {
        // Optionally, you can refetch the events after deletion
        showSuccessToast("User deleted successfully");
        fetchAllUsers(activePage);
      }
    } catch (error) {
      showErrorToast(
        error instanceof Error ? error.message : "Failed to delete user"
      );
    }
  };
  return (
    <div>
      {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
      {/* Modal content */}
      {/* </Modal> */}
      <MainTable
        title={"All Users"}
        loading={loading}
        data={users}
        errorMessage={errorMessage}
        columns={usersColumns}
        renderActions={(row) => (
          <div className="flex gap-2">
            {checkIsAllowed([PermissionsEnum.VIEW_USERS]) && (
              <ThemeIcon
                variant="light"
                color="teal"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickViewButton(row)}
              >
                <IconEye color="teal" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.UPDATE_USERS]) && (
              <ThemeIcon
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToEditUser(row)}
              >
                <IconEdit color="blue" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.DELETE_USERS]) && (
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
        {checkIsAllowed([PermissionsEnum.DELETE_USERS]) && (
          <CustomButton
            onClick={navigateToAddUser}
            leftSection={<IconPlus size={14} />}
          >
            <div>Add New User</div>
          </CustomButton>
        )}
      </MainTable>
      {!loading && users && users.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={activePage}
          onChange={(page) => fetchAllUsers(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default UsersPage;
