// src/features/Admins/components/RejectAdminModal.tsx
import { useEffect, useState } from "react";
import CustomModal from "@/UI/CustomModal/CustomModal";
import CustomTextarea from "@/UI/CustomTextArea/CustomTextArea";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { User } from "@/types/user.type";
import CustomMultiSelect from "@/UI/CustomMultiSelect/CustomMultiSelect";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { Role } from "@/pages/Roles/roles.type";
import { isFieldRequired, makeSelectUniqueByValue } from "@/services/form";
import { Controller, useForm } from "react-hook-form";
import { assignRolesToAdminSchema } from "@/form-schemas/assign-roles-to-admin-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHttp } from "@/hooks/useHttp";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { MyResponse } from "@/types/response.type.";
import { Loader } from "@mantine/core";

interface AssignRolesToAdminModalProps {
  opened: boolean;
  onClose: () => void;
  loading?: boolean;
  adminId: number;
}
export type AssignRolesToAdminData = {
  roles: { label: string; value: string }[];
};
const AssignRolesToAdminModal = ({
  opened,
  onClose,
  adminId,
}: AssignRolesToAdminModalProps) => {
  //   const [defaultValues, setDefaultValues] =
  //     useState<AssignRolesToAdminData | null>();
  const [selectedRoles, setSelectedRoles] = useState<
    { label: string; value: string }[]
  >([]);
  const {
    alert,
    handleError: handleErrorAssigningRoles,
    handleSuccess: handleSuccessAssigningRoles,
    setAlert,
  } = useHandleErrorSuccess();
  const {
    control,
    handleSubmit,
    // watch,
    setValue,
    formState: { isValid },
  } = useForm<AssignRolesToAdminData>({
    mode: "onBlur",
    resolver: yupResolver(assignRolesToAdminSchema),
  });
  const {
    data: roles,
    loading: loadingFetchRoles,
    search,
    setSearch,
    loadMore,
  } = usePaginatedFetch<Role>({
    endpoint: "/admin/roles",
    mapData: (data) =>
      makeSelectUniqueByValue(
        data.map((p) => ({ label: p.name, value: p.id.toString() }))
      ),
    perPage: 20,
    mode: "append", // 👈 infinite scroll mode
  });
  const { request: requestAssignRoles, loading: loadingAssignRoles } =
    useHttp();
  const { request: requestUserData, loading: loadingUserData } = useHttp();
  useEffect(() => {
    if (!adminId) return;
    // console.log('adminData', adminId);
    // get user by id
    getUserDetails();
  }, [adminId]);
    useEffect(() => {
      setValue('roles', selectedRoles)
    }, [selectedRoles]);

  const getRolesData = () => {
    console.log("roles", roles);
    console.log("selectedRoles", selectedRoles);

    return makeSelectUniqueByValue([
      ...roles, // from BE
      ...(selectedRoles ?? []), // saved after select
      ...(loadingFetchRoles
        ? [
            {
              label: "Loading...",
              value: "__loading",
              disabled: true,
            },
          ]
        : []),
    ]);
  };
  const mapSelectedRoles = (values: string[]) =>
    values.map((value) => {
      const found = [...roles, ...selectedRoles].find((p) => p.value === value);
      return found ?? { label: value, value };
    });
  const resetRoles = () => setValue("roles", []);

  const getUserDetails = async () => {
    const { data } = await requestUserData<User>(
      "get",
      `admin/users/admins/${adminId}`
    );
    if (data) {
      const roles = data.roles.map((el) => ({
        label: el.name,
        value: el.id.toString(),
      }));
      setSelectedRoles(roles);
    }
  };

  const submitHandler = async (formData: AssignRolesToAdminData) => {
    const payload = {
      ...formData,
      rolesIds: formData.roles.map((p) => Number(p.value)),
    };
    const { data, error } = await requestAssignRoles<MyResponse<User, "user">>(
      "patch",
      `admin/users/admins/${adminId}/assign-roles`,
      payload
    );
    if (error) {
      // handle error
      handleErrorAssigningRoles(error);
    } else {
      handleSuccessAssigningRoles(data?.message || "Updated Role Successfully");
      onClose();
    }
  };
  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title="Assign Roles To Admin"
    >
      {loadingUserData ? (
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
              name="roles"
              render={({ field, fieldState }) => (
                <CustomMultiSelect
                  handleResetSelect={resetRoles}
                  {...field}
                  isRequired={isFieldRequired(
                    assignRolesToAdminSchema,
                    field.name
                  )}
                  label="Roles"
                  placeholder="Select Roles"
                  data={getRolesData()}
                  searchable
                  searchValue={search}
                  onSearchChange={setSearch}
                  nothingFoundMessage={"No permissions"}
                  value={field.value?.map((v) => v.value)}
                  onChange={(values) => {
                    // this is because hook form needs the value of multiselect to be label, value pairs
                    field.onChange(mapSelectedRoles(values));
                    setSearch(search);
                    setSelectedRoles(mapSelectedRoles(values));
                  }}
                  scrollAreaProps={{
                    onBottomReached: () => {
                      if (!loadingFetchRoles) loadMore();
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
                disabled={!isValid || loadingAssignRoles}
                isPending={loadingAssignRoles}
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

export default AssignRolesToAdminModal;
