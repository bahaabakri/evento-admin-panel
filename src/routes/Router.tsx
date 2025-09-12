import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/Layout/Layout";
import EventPage from "@/pages/Events/Events";
import HomePage from "@/pages/Home/Home";
import AddEventPage from "@/pages/Events/add/AddEvent";
import EditEventPage from "@/pages/Events/edit/EditEvent";
import Otp from "@/pages/Auth/Otp/Otp";
import LogoutPage from "@/pages/Auth/Logout/Logout";
import { authLoader } from "./loaders/auth-loader";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage />, loader: authLoader },
      {
        path: "events",
        loader: authLoader,
        children: [
          { index: true, element: <EventPage /> },
          { path: "add", element: <AddEventPage /> },
          { path: "edit/:eventId", element: <EditEventPage /> },
        ],
      },
      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/otp", element: <Otp /> },
      { path: "auth/logout", element: <LogoutPage /> },
    ],
  },
]);

export default function MainRouterProvider() {
  return <RouterProvider router={router} />;
}