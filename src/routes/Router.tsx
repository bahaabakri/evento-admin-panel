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
import PendingAccountPage from "@/pages/Auth/PendingAccountPage/PendingAccountPage";
import RejectedAccountPage from "@/pages/Auth/RejectedAccountPage/RejectedAccountPage";
import EventsPage from "@/pages/Events/Events";
import UsersPage from "@/pages/Users/Users";
import AddUserPage from "@/pages/Users/add/AddUser";
import EditUserPage from "@/pages/Users/edit/EditUser";
import AdminsPage from "@/pages/Admins/Admins";
import AddAdminPage from "@/pages/Admins/add/AddAdmin";
import EditAdminPage from "@/pages/Admins/edit/EditAdmin";
import RolesPage from "@/pages/Roles/Roles";
import AddRolePage from "@/pages/Roles/add/AddRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        loader: authLoader,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "events",
            children: [
              { index: true, element: <EventsPage /> },
              { path: "add", element: <AddEventPage /> },
              { path: "edit/:eventId", element: <EditEventPage /> },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, element: <UsersPage /> },
              { path: "add", element: <AddUserPage /> },
              { path: "edit/:userId", element: <EditUserPage /> },
            ],
          },
          {
            path: "admins",
            children: [
              { index: true, element: <AdminsPage /> },
              { path: "add", element: <AddAdminPage /> },
              { path: "edit/:adminId", element: <EditAdminPage /> },
            ],
          },
          {
            path: "roles",
            children: [
              { index: true, element: <RolesPage /> },
              { path: "add", element: <AddRolePage /> },
              // { path: "edit/:adminId", element: <EditAdminPage /> },
            ],
          },
        ],
      },

      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/otp", element: <Otp /> },
      { path: "auth/logout", element: <LogoutPage /> },
      { path: "auth/pending", element: <PendingAccountPage /> },
      { path: "auth/rejected", element: <RejectedAccountPage /> },
    ],
  },
]);

export default function MainRouterProvider() {
  return <RouterProvider router={router} />;
}
