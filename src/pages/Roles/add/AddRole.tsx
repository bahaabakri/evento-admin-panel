import styles from "./AddRole.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import UserForm, { UserFormData } from "@/components/UserForm/UserForm";
import { filterDataToSend } from "@/services/util";
import userFormSchema from "@/form-schemas/user-form-schema";
import RoleForm, { RoleFormData } from "@/components/RoleForm/RoleForm";
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
    console.log("formData", formData);

    const { data, error } = await request("post", "admin/roles", {
      ...formData,
    });
    if (error) {
      // handle error
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

        {/* {addEventFormState && addEventFormState.errorMessage && (
        )}
        {addEventFormState && addEventFormState.successMessage && (

        )} */}
        <RoleForm
          schema={userFormSchema}
          mode="add"
          defaultValues={{
            name: "",
            description: "",
            permissionsIds: []
          }}
          isPending={loading}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddRolePage;
