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
import { Permission } from "./permissions.type";
import permissionsColumns from "./permissions-columns";
// import { useDisclosure } from "@mantine/hooks"

const PermissionsPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const { loading, errorMessage, request } = useHttp();
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const fetchAllPermissions = async (
    page: number = 1,
    perPage: number = 10
  ) => {
    setPage(page);
    const { data: dataRes } = await request<MyResponsePagination<Permission>>(
      "get",
      `admin/permissions?page=${page}&perPage=${perPage}`
    );
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setPermissions(data);
    }
  };
  useEffect(() => {
    fetchAllPermissions();
  }, []);
  const navigateToViewPermission = (row: Permission) => {};

  return (
    <div>
      {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
      {/* Modal content */}
      {/* </Modal> */}
      <MainTable
        title={"All Permissions"}
        loading={loading}
        data={permissions}
        errorMessage={errorMessage}
        columns={permissionsColumns}
        renderActions={(row) => (
          <div className="flex gap-2">
            <ThemeIcon
              variant="light"
              color="blue"
              className="cursor-pointer"
              size={30}
              onClick={() => navigateToViewPermission(row)}
            >
              <IconEye color="blue" size={18} />
            </ThemeIcon>
            {/* <ThemeIcon variant="light" color="red" className="cursor-pointer" size={30} onClick={() => onClickDeleteButton(row)}>
                    <IconTrash color="red" size={18} />
                </ThemeIcon> */}
          </div>
        )}
      ></MainTable>
      {!loading && permissions && permissions.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={activePage}
          onChange={(page) => fetchAllPermissions(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default PermissionsPage;
