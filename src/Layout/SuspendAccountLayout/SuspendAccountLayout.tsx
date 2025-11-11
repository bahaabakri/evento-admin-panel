import HeroOverlay from "@/components/Hero/HeroOverlay/HeroOverlay";
import useAuth from "@/hooks/useAuth";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useLockedModal } from "@/hooks/useLockModal";
import CustomButton from "@/UI/CustomButton/CustomButton";
import CustomModal from "@/UI/CustomModal/CustomModal";
import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface SuspendAccountLayoutProps {
  title: string;
  message: ReactNode;
  showGoBackButton?: boolean;
}
const SuspendAccountLayout: FC<SuspendAccountLayoutProps> = ({
  title,
  message,
  showGoBackButton = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsOpened(true);
    }, 100);
  }, []);
  const handleLogout = () => {
    navigate("/auth/logout");
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  const content = (
    <div className="flex flex-col gap-5">
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

      <div className="flex gap-2">
        <div className="flex-1">
          <CustomButton isWidthFull onClick={handleLogout}>
            <div>Logout</div>
          </CustomButton>
        </div>
        {showGoBackButton && (
          <div className="flex-1">
            <CustomButton isWidthFull onClick={handleGoBack} isSecondButton>
              <div>Go Back</div>
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div className="w-screen h-screen">
      <HeroOverlay />
      <CustomModal title={title} opened={isOpened} onClose={handleGoBack}>
        {content}
      </CustomModal>
    </div>
  );
};

export default SuspendAccountLayout;
