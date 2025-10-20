import { FC } from "react";
import SuspendAccountLayout from "../SuspendAccountLayout/SuspendAccountLayout";
import useAuth from "@/hooks/useAuth";

const PendingAccountPage:FC = () => {
  return (
    <SuspendAccountLayout 
        title="Account Pending Approval"
        message="Your account is currently pending approval by the administrator. You will be notified once your account has been reviewed."
    />
  );
}

export default PendingAccountPage;