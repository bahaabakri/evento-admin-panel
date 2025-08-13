import { showSuccessToast } from "@/services/toast";
import { CustomAlertType } from "@/types/alert.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useHandleErrorSuccess() {
    const [alert, setAlert] = useState<CustomAlertType | null>(null);
    const navigate = useNavigate();
      /**
       * To handle adding event success
       * @param message
       */
      const handleSuccess = (message: string, path :string = '/auth') => {
        showSuccessToast(message);
        navigate(path);
      };
      /**
       * To handle adding event error
       * @param message 
       */
      const handleError = (message: string) => {
        setAlert({
          type: "error",
          title: "Error",
          message
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
      return {
        alert, setAlert, handleSuccess, handleError
      }
}