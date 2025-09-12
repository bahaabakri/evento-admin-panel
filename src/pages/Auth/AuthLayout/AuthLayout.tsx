import { CustomAlertType } from "@/types/alert.type";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import React, { ReactElement } from "react";
import styles from "./AuthLayout.module.scss";
import HeroOverlay from "@/components/Hero/HeroOverlay/HeroOverlay";
import Logo from "@/components/Logo/Logo";
import { useHandleErrorSuccess } from "@/hooks/useHandleErrorSuccess";
import { useDispatch } from "react-redux";
import { clearAlert } from "@/store/alertSlice";

interface AuthLayoutProps {
    children:ReactElement;
    title: string;
    subtitle:string;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle}) => {
  const { alert } = useHandleErrorSuccess();
  const dispatch = useDispatch();
  
  return (
    <div className={styles["auth-container"]}>
      <div className={styles["overlay-wrapper"]}>
        <HeroOverlay />
      </div>
      <div className={styles["auth-wrapper"]}>
        <div className={styles['auth']}>
          <Logo />
          <h2 className={styles['auth-title']}>{title}</h2>
          <p className={styles['auth-subtitle']}>{subtitle}</p>
          {alert && (
            <CustomAlert
              onClose={() => dispatch(clearAlert())}
              title={alert.title}
              message={alert.message}
              type={alert.type}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
