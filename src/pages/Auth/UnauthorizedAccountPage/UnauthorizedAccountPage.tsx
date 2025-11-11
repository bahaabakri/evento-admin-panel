import { FC, ReactNode } from "react";
import SuspendAccountLayout from "../../../Layout/SuspendAccountLayout/SuspendAccountLayout";
import { useLocation } from "react-router-dom";

const UnauthorizedAccountPage: FC = () => {
  const location = useLocation();

  const errorMessage =
    location.state?.message ||
    "You are not authorized to access this page or do this action.";
  const message: ReactNode = (
    <p className="text-gray-8 text-md">{errorMessage}</p>
  );
  return (
    <SuspendAccountLayout
      showGoBackButton
      title="Unauthorized"
      message={message}
    />
  );
};

export default UnauthorizedAccountPage;
