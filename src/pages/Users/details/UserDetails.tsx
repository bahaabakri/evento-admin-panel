import styles from "./UserDetails.module.scss";
import { useHttp } from "@/hooks/useHttp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import { Loader } from "@mantine/core";
import DetailsTable from "@/UI/DetailsTable/DetailsTable";
import EventCard from "@/components/Events/EventCard/EventCard";
import userDetailsColumns from "./user-details-colums";
// import * as dayjs from "dayjs";

/**
 * New Event component
 * @description This component is used to add a new event.
 * @returns
 */
const UserDetailsPage = () => {

  const [userData, setUserData] = useState<User | null>();
  const { userId } = useParams();
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
      setUserData(data);
    }
  };

  return (
    <div className={styles["admin-details-wrapper"]}>
      <div className={styles["admin-details"]}>
        <h1 className={styles["admin-details-title"]}>Admin Details for {userData?.firstname || userData?.email}</h1>
        {loadingUserData ? (
          <Loader />
        ) : (
          <>
            <DetailsTable columns={userDetailsColumns} data={userData} />
            {/* {userData?.createdEvents && userData?.joinedEvents?.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Events has been joined by {userData.firstname}:</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {userData.createdEvents.map((event) => (
                    <div key={event.id} className="">
                      <EventCard event={event}></EventCard>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
