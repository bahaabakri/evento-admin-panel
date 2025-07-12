import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./Layout/Layout"
import EventPage from "./pages/Events/Events"
import HomePage from "./pages/Home/Home"


const MainRouterProvider = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} /> {/* Default child route */}
            <Route path="events">
                <Route path="" element={<EventPage/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    )

}

export default MainRouterProvider