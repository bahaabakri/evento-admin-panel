import styles from "./AddRole.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHttp } from "@/hooks/useHttp";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import RoleForm, { RoleFormData } from "@/components/RoleForm/RoleForm";
import { roleFormSchema } from "@/form-schemas/role-form-schema";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddRolePage = () => {
  const {
    alert,
    handleError: handleErrorAddingRole,
    handleSuccess: handleSuccessAddingRole,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading, request } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: RoleFormData) => {
    // console.log("formData", formData);
    const payload = {
      ...formData,
      permissionsIds: formData.permissions.map((p) => Number(p.value)),
    };
    const { data, error } = await request("post", "admin/roles", payload);
    if (error) {
      // handle error
      // console.log('error', error);
      
      handleErrorAddingRole(error);
    } else {
      handleSuccessAddingRole("Created Role Successfully", "/roles");
    }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["new-role-wrapper"]}>
      <div className={styles["new-role"]}>
        <h1 className={styles["new-role-title"]}>Add New Role</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}
        <RoleForm
          schema={roleFormSchema}
          mode="add"
          defaultValues={{
            name: "",
            description: "",
            permissions: [],
          }}
          isPending={loading}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddRolePage;
