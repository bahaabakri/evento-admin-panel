import { showSuccessToast } from "@/services/toast";
import { clearAlert, setAlert } from "@/store/alertSlice";
import { RootState } from "@/store/store";
import { CustomAlertType } from "@/types/alert.type";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useHandleErrorSuccess() {
    const {alert} = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch()
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
        dispatch(setAlert({
          type: "error",
          title: "Error",
          message
        }))
        setTimeout(() => {
          dispatch(clearAlert())
        }, 5000);
      }
      return {
        alert, handleSuccess, handleError
      }
}