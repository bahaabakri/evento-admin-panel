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
      const handleSuccess = (message: string, path :string| null = null) => {
        showSuccessToast(message);
        if(path) navigate(path);
      };
      /**
       * To handle adding event error
       * @param message 
       */
      const handleError = (message: string | string[]) => {
        // console.log(message, message instanceof(Array));
        
        dispatch(setAlert({
          type: "error",
          title: "Error",
          message: (Array.isArray(message)) ? message.join(', ') : message
        }))
        setTimeout(() => {
          dispatch(clearAlert())
        }, 5000);
      }
      return {
        alert, handleSuccess, handleError, setAlert
      }
}