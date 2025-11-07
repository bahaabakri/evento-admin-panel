import MainTable from "@/UI/MainTable/MainTable";
import { Pagination, ThemeIcon } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Permission } from "./permissions.type";
import permissionsColumns from "./permissions-columns";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
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
          value={page}
          onChange={(page) => setPage(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default PermissionsPage;
