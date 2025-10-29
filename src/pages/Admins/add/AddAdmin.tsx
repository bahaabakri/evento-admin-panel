import styles from "./AddAdmin.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHttp } from "@/hooks/useHttp";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import UserForm, { UserFormData } from "@/components/UserForm/UserForm";
import adminFormSchema from "@/form-schemas/admin-form-schema";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddAdminPage = () => {
  const {
    alert,
    handleError: handleErrorAddingAdmin,
    handleSuccess: handleSuccessAddingAdmin,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading, request } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: UserFormData) => {
    console.log("formData", formData);

    const { data, error } = await request("post", "admin/users/admins", {
      ...formData,
    });
    if (error) {
      // handle error
      handleErrorAddingAdmin(error);
    } else {
      handleSuccessAddingAdmin("Created Admin Successfully", "/admins");
    }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["new-admin-wrapper"]}>
      <div className={styles["new-admin"]}>
        <h1 className={styles["new-admin-title"]}>Add New Admin</h1>
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
        <UserForm
          schema={adminFormSchema}
          mode="add"
          defaultValues={{
            email: "",
            phone: "",
            firstname: "",
            lastname: "",
          }}
          isPending={loading}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddAdminPage;
