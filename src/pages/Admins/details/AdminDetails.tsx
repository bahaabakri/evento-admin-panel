import styles from "./AdminDetails.module.scss";
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
import DetailsTable from "@/UI/DetailsTable/DetailsTable";
import adminsDetailsColumns from "./admin-details-colums";
import EventCard from "@/components/Events/EventCard/EventCard";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const AdminDetailsPage = () => {

  const [adminData, setAdminData] = useState<User | null>();
  const { adminId } = useParams();
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
      const uniquePermissions = Array.from(
        new Map(
          data.roles
            .flatMap((role) => role.permissions)
            .map((permission) => [permission.id, permission])
        ).values()
      );
      setAdminData({
        ...data,
        permissions: uniquePermissions,
      });
    }
  };
  //   const handleEdit = async (formData: UserFormData) => {
  //     console.log("formData", formData);

  //     const { data, error } = await requestEditAdmin<MyResponse<User, 'user'>>(
  //       "patch",
  //       `admin/users/admins/${adminId}`,
  //       {
  //         ...formData,
  //       }
  //     );
  //     if (error) {
  //       // handle error
  //       handleErrorEditingAdmin(error);
  //     } else {
  //       handleSuccessEditingAdmin(data?.message || "Updated Admin Successfully", "/admins");
  //     }
  //   };

  return (
    <div className={styles["admin-details-wrapper"]}>
      <div className={styles["admin-details"]}>
        <h1 className={styles["admin-details-title"]}>Admin Details for {adminData?.firstname}</h1>
        {loadingAdminData ? (
          <Loader />
        ) : (
          <>
            <DetailsTable columns={adminsDetailsColumns} data={adminData} />
            {adminData?.createdEvents && adminData?.createdEvents?.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Events has been created by {adminData.firstname}:</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {adminData.createdEvents.map((event) => (
                    <div key={event.id} className="">
                      <EventCard event={event}></EventCard>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDetailsPage;
