import { CustomAlertType } from "@/types/alert";
import CustomAlert from "@/UI/CustomAlert/CustomAlert";
import React, { ReactElement } from "react";
import styles from "./AuthLayout.module.scss";
import HeroOverlay from "@/components/Hero/HeroOverlay/HeroOverlay";
import Logo from "@/components/Logo/Logo";

interface AuthLayoutProps {
    children:ReactElement;
    title: string;
    subtitle:string;
    alert:CustomAlertType | null
    setAlert:(el) => void
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, alert, setAlert}) => {
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
              onClose={() => setAlert(null)}
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
