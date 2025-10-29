import styles from "./EditUser.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import EventForm, { EventFormData } from "@/components/EventForm/EventForm";
import { useHttp } from "@/hooks/useHttp";
import dayjs from "dayjs";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import UserForm, { UserFormData } from "@/components/UserForm/UserForm";
import { filterDataToSend } from "@/services/util";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import { Loader } from "@mantine/core";
import userFormSchema from "@/form-schemas/user-form-schema";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const EditUserPage = () => {
  const {
    alert,
    handleError: handleErrorEditingUser,
    handleSuccess: handleSuccessEditingUser,
    setAlert,
  } = useHandleErrorSuccess();
  const [defaultValues, setDefaultValues] = useState<UserFormData | null>();
  const { userId } = useParams();
  const { loading: loadingEditUser, request: requestEditUser } = useHttp();
  const { loading: loadingUserData, request: requestUserData } = useHttp();

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, []);
  const fetchUserDetails = async () => {
    const { data } = await requestUserData<User>(
      "get",
      `admin/users/users/${userId}`
    );
    if (data) {
      setDefaultValues({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
      });
    }
  };
  const handleEdit = async (formData: UserFormData) => {
    console.log("formData", formData);

    const { data, error } = await requestEditUser(
      "patch",
      `admin/users/users/${userId}`,
      {
        ...formData,
      }
    );
    if (error) {
      // handle error
      handleErrorEditingUser(error);
    } else {
      handleSuccessEditingUser("Updated User Successfully", "/users");
    }
  };
  ////////////////// helper methods /////////////////

  return (
    <div className={styles["edit-user-wrapper"]}>
      <div className={styles["edit-user"]}>
        <h1 className={styles["edit-user-title"]}>Edit User</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}
        {loadingUserData ? (
          <Loader />
        ) : (
          <UserForm
            schema={userFormSchema}
            mode="edit"
            defaultValues={defaultValues}
            isPending={loadingEditUser}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default EditUserPage;
