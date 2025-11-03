import styles from "./EditRole.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHttp } from "@/hooks/useHttp";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import RoleForm, { RoleFormData } from "@/components/RoleForm/RoleForm";
import { roleFormSchema } from "@/form-schemas/role-form-schema";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Role } from "../roles.type";
import { Loader } from "@mantine/core";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const EditRolePage = () => {
  const {
    alert,
    handleError: handleErrorEditingRole,
    handleSuccess: handleSuccessEditingRole,
    setAlert,
  } = useHandleErrorSuccess();
  const [defaultValues, setDefaultValues] = useState<RoleFormData | null>();
  const { roleId } = useParams();
  const { loading: loadingEditRole, request: requestEditRole } = useHttp();
  const { loading: loadingRoleData, request: requestRoleData } =
    useHttp(); /*** action form hook */
  // console.log(watch("date"))

  useEffect(() => {
    if (roleId) {
      fetchRoleDetails();
    }
  }, []);
  const fetchRoleDetails = async () => {
    const { data } = await requestRoleData<Role>(
      "get",
      `admin/roles/${roleId}`
    );
    if (data) {
    //   console.log(data);

      setDefaultValues({
        name: data.name,
        description: data.description,
        permissions: data.permissions.map((el) => ({
          label: el.name,
          value: el.id.toString(),
        })),
      });
    }
  };
  const handleEdit = async (formData: RoleFormData) => {
    // console.log("formData", formData);
    const payload = {
      ...formData,
      permissionsIds: formData.permissions.map((p) => Number(p.value)),
    };
    const { data, error } = await requestEditRole(
      "patch",
      `admin/roles/${roleId}`,
      payload
    );
    if (error) {
      // handle error
      handleErrorEditingRole(error);
    } else {
      handleSuccessEditingRole("Updated Role Successfully", "/roles");
    }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["edit-role-wrapper"]}>
      <div className={styles["edit-role"]}>
        <h1 className={styles["edit-role-title"]}>Edit Role</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}
        {loadingRoleData ? (
          <Loader />
        ) : (
          <RoleForm
            schema={roleFormSchema}
            mode="edit"
            defaultValues={defaultValues}
            isPending={loadingEditRole}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default EditRolePage;
