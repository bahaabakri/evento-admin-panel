import { FC } from "react";
import SuspendAccountLayout from "../SuspendAccountLayout/SuspendAccountLayout";

const RejectedAccountPage:FC = () => {
  return (
    <SuspendAccountLayout 
        title="Account Rejected"
        message="Your account registration has been rejected by the administrator. Please contact support for further assistance."
    />
  );
}

export default RejectedAccountPage;