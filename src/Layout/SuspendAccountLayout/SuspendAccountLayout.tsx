import HeroOverlay from "@/components/Hero/HeroOverlay/HeroOverlay";
import useAuth from "@/hooks/useAuth";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useLockedModal } from "@/hooks/useLockModal";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface SuspendAccountLayoutProps {
  title: string;
  message: ReactNode;
}
const SuspendAccountLayout: FC<SuspendAccountLayoutProps> = ({
  title,
  message,
}) => {
  const { openLockedModal, closeLockedModal } = useLockedModal();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    closeLockedModal();
    navigate("/auth/logout");
  };
  const content = (
    <div className="flex flex-col gap-2">
      {user && isAuthenticated && (
        <div>
          Hi{" "}
          <span className="text-roseRed-5">
            {user.firstname + " " + user.lastname}
          </span>{" "}
          ,
        </div>
      )}
      <div>{message}</div>
    </div>
  );
  useEffect(() => {
    if (isAuthenticated !== null) {
      openLockedModal({
        title,
        content,
        onConfirm: handleLogout,
        confirmLabel: "Logout",
        color: "roseRed",
      });
    }
  }, [user, isAuthenticated]);
  return (
    <div className="w-screen h-screen">
      <HeroOverlay />
    </div>
  );
};

export default SuspendAccountLayout;
