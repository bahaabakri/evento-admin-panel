import { FC, ReactNode } from "react";
import SuspendAccountLayout from "../../../Layout/SuspendAccountLayout/SuspendAccountLayout";

const UnauthorizedAccountPage: FC = () => {
  const message: ReactNode = (
    <p className="text-gray-8 text-md">
      Your session has expired. Please log in again to continue
    </p>
  );
  return <SuspendAccountLayout title="Unauthorized" message={message} />;
};

export default UnauthorizedAccountPage;
