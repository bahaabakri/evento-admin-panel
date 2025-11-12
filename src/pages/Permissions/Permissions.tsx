import MainTable from "@/UI/MainTable/MainTable";
import { Pagination, ThemeIcon } from "@mantine/core";
import { IconEye, IconSettings2, IconSettingsShare } from "@tabler/icons-react";
import { Permission } from "./permissions.type";
import permissionsColumns from "./permissions-columns";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import useIsAllowed from "@/hooks/useIsAllowed";
import { PermissionsEnum } from "./permissions.enum";
import { useNavigate } from "react-router-dom";
// import { useDisclosure } from "@mantine/hooks"

const PermissionsPage = () => {
  const {
    data: permissions,
    loading,
    page,
    setPage,
    total,
    errorMessage,
  } = usePaginatedFetch<Permission>({
    endpoint: "/admin/permissions",
    perPage: 10,
    mode: "replace", // 👈 no accumulation
  });
  const numOfPages = Math.ceil(total / 10);
  const { checkIsAllowed } = useIsAllowed();
  const navigate = useNavigate();
  // const navigateToViewPermission = (row: Permission) => {};
  const navigateToPermissionRoles = (row: Permission) => {
    navigate(`/roles?permissionId=${row.id}&permissionName=${row.name}`);
  };
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
            {checkIsAllowed([PermissionsEnum.VIEW_ROLES]) && (
              <ThemeIcon
                title="Show related roles"
                variant="light"
                color="teal"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToPermissionRoles(row)}
              >
                <IconSettingsShare color="teal" size={18} />
              </ThemeIcon>
            )}
            {/* {checkIsAllowed([PermissionsEnum.VIEW_PERMISSIONS]) && (
              <ThemeIcon
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToViewPermission(row)}
              >
                <IconEye color="blue" size={18} />
              </ThemeIcon>
            )} */}

            {/* <ThemeIcon variant="light" color="red" className="cursor-pointer" size={30} onClick={() => onClickDeleteButton(row)}>
                    <IconTrash color="red" size={18} />
                </ThemeIcon> */}
          </div>
        )}
      ></MainTable>
      {!loading && permissions && permissions.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={page}
          onChange={(page) => setPage(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default PermissionsPage;
