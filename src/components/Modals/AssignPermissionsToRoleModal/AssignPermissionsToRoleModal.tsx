// src/features/Admins/components/RejectAdminModal.tsx
import { useEffect, useState } from "react";
import CustomModal from "@/UI/CustomModal/CustomModal";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { User } from "@/types/user.type";
import CustomMultiSelect from "@/UI/CustomMultiSelect/CustomMultiSelect";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { Role } from "@/pages/Roles/roles.type";
import { combineMultiSelectData, isFieldRequired, makeSelectUniqueByValue, mapSelectedDataToLabelValuePair } from "@/services/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHttp } from "@/hooks/useHttp";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { Loader } from "@mantine/core";
import { assignPermissionsToRoleSchema } from "@/form-schemas/assign-permissions-to-role-schema";

interface AssignPermissionsToRoleModalProps {
  opened: boolean;
  onClose: () => void;
  loading?: boolean;
  roleId: number;
  updateRolesData: () => void
}
export type AssignPermissionsToRoleData = {
  permissions: { label: string; value: string }[];
};
const AssignPermissionsToRoleModal = ({
  opened,
  onClose,
  roleId,
  updateRolesData
}: AssignPermissionsToRoleModalProps) => {
  //   const [defaultValues, setDefaultValues] =
  //     useState<AssignPermissionsToRoleData | null>();
  const [selectedPermissions, setSelectedPermissions] = useState<
    { label: string; value: string }[]
  >([]);
  const [savedRole, setSavedRole] = useState<Role>(null)
  const {
    alert,
    handleError: handleErrorAssigningPermissions,
    handleSuccess: handleSuccessAssigningPermissions,
    setAlert,
  } = useHandleErrorSuccess();
  const {
    control,
    handleSubmit,
    // watch,
    setValue,
    formState: { isValid },
  } = useForm<AssignPermissionsToRoleData>({
    mode: "onBlur",
    resolver: yupResolver(assignPermissionsToRoleSchema),
  });
  const {
    labelValuePairData: permissions,
    loading: loadingFetchPermissions,
    search,
    setSearch,
    loadMore,
  } = usePaginatedFetch<Role>({
    endpoint: "/admin/permissions",
    mapDataToLabelValuePair: (data) =>
      makeSelectUniqueByValue(
        data.map((p) => ({ label: p.name, value: p.id.toString() }))
      ),
    perPage: 20,
    mode: "append", // 👈 infinite scroll mode
  });
  const { request: requestAssignPermissions, loading: loadingAssignPermissions } =
    useHttp();
  const { request: requestRoleData, loading: loadingRoleData } = useHttp();
  useEffect(() => {
    if (!roleId) return;
    // console.log('adminData', adminId);
    // get user by id
    getRoleDetails();
  }, [roleId]);
    useEffect(() => {
      setValue('permissions', selectedPermissions)
    }, [selectedPermissions]);

  const resetRoles = () => setValue("permissions", []);

  const getRoleDetails = async () => {
    const { data } = await requestRoleData<Role>(
      "get",
      `admin/roles/${roleId}`
    );
    if (data) {
      const permissions = data.permissions.map((el) => ({
        label: el.name,
        value: el.id.toString(),
      }));
      setSelectedPermissions(permissions);
      setSavedRole(data)
    }
  };

  const submitHandler = async (formData: AssignPermissionsToRoleData) => {
    const payload = {
      permissionsIds: formData.permissions.map((p) => Number(p.value)),
    };
    const { data, error } = await requestAssignPermissions<MyResponse<Role, "role">>(
      "patch",
      `admin/roles/${roleId}/assign-permissions`,
      payload
    );
    if (error) {
      // handle error
      handleErrorAssigningPermissions(error);
    } else {
      handleSuccessAssigningPermissions(data?.message || "Permissions has been assigned Successfully");
      updateRolesData()
      onClose();
    }
  };
  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title={`Assign Permissions To Role '${savedRole?.name}'`}
    >
      {loadingRoleData ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          {alert && (
            <CustomAlert
              onClose={() => setAlert(null)}
              title={alert.title}
              message={alert.message}
              type={alert.type}
            />
          )}
          <form onSubmit={handleSubmit(submitHandler)}>
            <Controller
              control={control}
              name="permissions"
              render={({ field, fieldState }) => (
                <CustomMultiSelect
                  handleResetSelect={resetRoles}
                  {...field}
                  isRequired={isFieldRequired(
                    assignPermissionsToRoleSchema,
                    field.name
                  )}
                  label="Permissions"
                  placeholder="Select Permissions"
                  data={combineMultiSelectData(permissions, selectedPermissions, loadingFetchPermissions)}
                  searchable
                  searchValue={search}
                  onSearchChange={setSearch}
                  nothingFoundMessage={"No permissions"}
                  value={field.value?.map((v) => v.value)}
                  onChange={(values) => {
                    // this is because hook form needs the value of multiselect to be label, value pairs
                    field.onChange(mapSelectedDataToLabelValuePair(permissions, selectedPermissions, values));
                    setSearch(search);
                    setSelectedPermissions(mapSelectedDataToLabelValuePair(permissions, selectedPermissions, values));
                  }}
                  scrollAreaProps={{
                    onBottomReached: () => {
                      if (!loadingFetchPermissions) loadMore();
                    },
                  }}
                  errorMessage={
                    fieldState.isTouched && fieldState.error
                      ? fieldState.error.message
                      : ""
                  }
                />
              )}
            />
            <div className="flex justify-end gap-2 mt-4">
              <CustomButton isSecondButton variant="default" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={!isValid || loadingAssignPermissions}
                isPending={loadingAssignPermissions}
              >
                Assign
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </CustomModal>
  );
};

export default AssignPermissionsToRoleModal;
