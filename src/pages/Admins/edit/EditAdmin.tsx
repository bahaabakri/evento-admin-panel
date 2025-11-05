import styles from "./EditAdmin.module.scss";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import { useHttp } from "@/hooks/useHttp";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import UserForm, { UserFormData } from "@/components/Forms/UserForm/UserForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import { Loader } from "@mantine/core";
import adminFormSchema from "@/form-schemas/admin-form-schema";
import { MyResponse } from "@/types/response.type.";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const EditAdminPage = () => {
  const {
    alert,
    handleError: handleErrorEditingAdmin,
    handleSuccess: handleSuccessEditingAdmin,
    setAlert,
  } = useHandleErrorSuccess();
  const [defaultValues, setDefaultValues] = useState<UserFormData | null>();
  const { adminId } = useParams();
  const { loading: loadingEditAdmin, request: requestEditAdmin } = useHttp();
  const { loading: loadingAdminData, request: requestAdminData } = useHttp();

  useEffect(() => {
    if (adminId) {
      fetchAdminDetails();
    }
  }, []);
  const fetchAdminDetails = async () => {
    const { data } = await requestAdminData<User>(
      "get",
      `admin/users/admins/${adminId}`
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

    const { data, error } = await requestEditAdmin<MyResponse<User, 'user'>>(
      "patch",
      `admin/users/admins/${adminId}`,
      {
        ...formData,
      }
    );
    if (error) {
      // handle error
      handleErrorEditingAdmin(error);
    } else {
      handleSuccessEditingAdmin(data?.message || "Updated Admin Successfully", "/admins");
    }
  };

  return (
    <div className={styles["edit-admin-wrapper"]}>
      <div className={styles["edit-admin"]}>
        <h1 className={styles["edit-admin-title"]}>Edit Admin</h1>
        {alert && (
          <CustomAlert
            onClose={() => setAlert(null)}
            title={alert.title}
            message={alert.message}
            type={alert.type}
          />
        )}
        {loadingAdminData ? (
          <Loader />
        ) : (
          <UserForm
            schema={adminFormSchema}
            mode="edit"
            defaultValues={defaultValues}
            isPending={loadingEditAdmin}
            onSubmit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default EditAdminPage;
