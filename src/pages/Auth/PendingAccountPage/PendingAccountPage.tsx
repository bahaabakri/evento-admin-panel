import { FC, ReactNode } from "react";
import SuspendAccountLayout from "../../../Layout/SuspendAccountLayout/SuspendAccountLayout";
import useAuth from "@/hooks/useAuth";

const PendingAccountPage: FC = () => {
  const message: ReactNode = (
    <p className="text-gray-8 text-md">
      Your account is currently pending approval by the administrator. You will
      be notified once your account has been reviewed.
    </p>
  );
  return <SuspendAccountLayout title="Account Pending Approval" message={message} />;
};

export default PendingAccountPage;
