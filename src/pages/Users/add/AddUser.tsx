import styles from "./AddUser.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import UserForm, { UserFormData } from "@/components/UserForm/UserForm";
import { filterDataToSend } from "@/services/util";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AddUserPage = () => {
  const {
    alert,
    handleError: handleErrorAddingUser,
    handleSuccess: handleSuccessAddingUser,
    setAlert,
  } = useHandleErrorSuccess();
  const { loading, request } = useHttp();
  /*** action form hook */
  // console.log(watch("date"))
  const handleAdd = async (formData: UserFormData) => {
    console.log("formData", formData);

      const {data, error} = await request("post", "admin/users/users", {
        ...filterDataToSend(formData),
      });
      if (error) {
          // handle error
          handleErrorAddingUser(error);
      } else {
          handleSuccessAddingUser("Created User Successfully", "/users");
      }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["new-user-wrapper"]}>
      <div className={styles["new-user"]}>
        <h1 className={styles["new-user-title"]}>Add New User</h1>
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
          mode="add"
          defaultValues={{
            email: "",
            phone: "",
            firstname: "",
            lastname: ""
          }}
          isPending={loading}
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddUserPage;
