import { removeAuthenticatedUser } from "@/store/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const LogoutPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(removeAuthenticatedUser())
        navigate("/", { replace: true });
    }, [])
    return <></>
}
export default LogoutPage