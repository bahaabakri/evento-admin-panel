import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "@/Layout/Layout"
import EventPage from "@/pages/Events/Events"
import HomePage from "@/pages/Home/Home"
import AddEventPage from "@/pages/Events/add/AddEvent"
import EditEventPage from "./pages/Events/edit/EditEvent"
import LoginRegister from "./pages/Auth/LoginRegister/LoginRegister"
import Otp from "./pages/Auth/Otp/Otp"


const MainRouterProvider = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} /> {/* Default child route */}
            <Route path="events">
                <Route index element={<EventPage/>} />
                <Route path="add" element={<AddEventPage />} />
                <Route path="edit/:eventId" element={<EditEventPage />} />
            </Route>
            <Route path="auth">
              <Route path="loginRegister" element={<LoginRegister/>} />
              <Route path="otp" element={<Otp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    )

}

export default MainRouterProvider