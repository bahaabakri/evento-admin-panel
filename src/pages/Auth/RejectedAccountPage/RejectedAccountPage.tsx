import { FC, ReactNode } from "react";
import SuspendAccountLayout from "../../../Layout/SuspendAccountLayout/SuspendAccountLayout";
import useAuth from "@/hooks/useAuth";

const RejectedAccountPage: FC = () => {
  const { user } = useAuth();
  const message: ReactNode = (
    <p className="text-gray-8 text-md">
      Your account registration has been rejected by the administrator&nbsp;
      {user && user.rejectionReason && (
        <span>
          because of this reason <span className="font-bold">"{user.rejectionReason}"</span>
        </span>
      )}{" "}
      Please contact support for further assistance.
    </p>
  );
  return <SuspendAccountLayout title="Account Rejected" message={message} />;
};

export default RejectedAccountPage;
