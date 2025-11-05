import { useEffect, useState } from "react";
import MainTable from "@/UI/MainTable/MainTable";
import { useHttp } from "@/hooks/useHttp";
import { Pagination, ThemeIcon } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { showErrorToast, showSuccessToast } from "@/services/toast";
import { User } from "@/types/user.type";
import { MyResponse, MyResponsePagination } from "@/types/response.type.";
import { Role } from "./roles.type";
import rolesColumns from "./roles-columns";
// import { useDisclosure } from "@mantine/hooks"

const RolesPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const { loading, errorMessage, request } = useHttp();
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();
  const { openConfirmModal } = useConfirmModal();

  const fetchAllRoles = async (page: number = 1, perPage: number = 10) => {
    setPage(page);
    const { data: dataRes } = await request<MyResponsePagination<Role>>(
      "get",
      `admin/roles?page=${page}&perPage=${perPage}`
    );
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setRoles(data);
    }
  };
  const navigateToAddRole = () => {
    navigate("/roles/add");
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const navigateToEditRole = (row: Role) => {
    navigate(`/roles/edit/${row.id}`);
  };
  const onClickDeleteButton = async (row: Role) => {
    // Implement delete functionality here

    openConfirmModal({
      title: "Delete role?",
      message:
        "Are you sure you want to delete this role? This cannot be undone.",
      onConfirm: () => handleDelete(row),
      confirmLabel: "Delete",
      color: "red",
    });
  };

  const handleDelete = async (row: Role) => {
    const { data, error } = await request<MyResponse<Role, "role">>(
      "delete",
      `admin/roles/${row.id}`
    );
    if (error) {
      showErrorToast(error || "Failed to delete role");
    } else {
      showSuccessToast(data?.message || "Role deleted successfully");
      fetchAllRoles(activePage);
    }
  };
  return (
    <div>
      {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
      {/* Modal content */}
      {/* </Modal> */}
      <MainTable
        title={"All Roles"}
        loading={loading}
        data={roles}
        errorMessage={errorMessage}
        columns={rolesColumns}
        renderActions={(row) => (
          <div className="flex gap-2">
            <ThemeIcon
              variant="light"
              color="blue"
              className="cursor-pointer"
              size={30}
              onClick={() => navigateToEditRole(row)}
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
          </div>
        )}
      >
        <CustomButton
          onClick={navigateToAddRole}
          leftSection={<IconPlus size={14} />}
        >
          <div>Add New Role</div>
        </CustomButton>
      </MainTable>
      {!loading && roles && roles.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={activePage}
          onChange={(page) => fetchAllRoles(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default RolesPage;
