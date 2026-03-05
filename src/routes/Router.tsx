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
import EditRolePage from "@/pages/Roles/edit/EditRole";
import PermissionsPage from "@/pages/Permissions/Permissions";
import UnauthorizedAccountPage from "@/pages/Auth/UnauthorizedAccountPage/UnauthorizedAccountPage";
import AdminDetailsPage from "@/pages/Admins/details/AdminDetails";
import UnauthenticatedAccountPage from "@/pages/Auth/UnauthenticatedAccountPage/UnauthenticatedAccountPage";
import UserDetailsPage from "@/pages/Users/details/UserDetails";
import AddEventPlanPage from "@/pages/Events/plans/add/AddEventPlan";
import EditEventPlanPage from "@/pages/Events/plans/edit/EditEventPlan";
import HeroesPage from "@/pages/UI/Heroes/HeroesPage";
import HeroDetailsPage from "@/pages/UI/Heroes/details/HeroDetails";
import AddHeroPage from "@/pages/UI/Heroes/add/AddHero";
import EditHeroPage from "@/pages/UI/Heroes/edit/EditHero";

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
              {
                path: ":eventId/plans",
                children: [
                  { path: "add", element: <AddEventPlanPage /> },
                  { path: "edit/:planId", element: <EditEventPlanPage /> },
                ],
              },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, element: <UsersPage /> },
              { path: "add", element: <AddUserPage /> },
              { path: "edit/:userId", element: <EditUserPage /> },
              { path: "details/:userId", element: <UserDetailsPage /> },
            ],
          },
          {
            path: "admins",
            children: [
              { index: true, element: <AdminsPage /> },
              { path: "add", element: <AddAdminPage /> },
              { path: "edit/:adminId", element: <EditAdminPage /> },
              { path: "details/:adminId", element: <AdminDetailsPage /> },
            ],
          },
          {
            path: "roles",
            children: [
              { index: true, element: <RolesPage /> },
              { path: "add", element: <AddRolePage /> },
              { path: "edit/:roleId", element: <EditRolePage /> },
            ],
          },
          {
            path: "permissions",
            children: [{ index: true, element: <PermissionsPage /> }],
          },
          {
            path: "ui",
            children: [
              { path: "heroes", children: [
                { index: true, element: <HeroesPage /> },
                { path: ":heroId", element: <HeroDetailsPage /> },
                { path: "add", element: <AddHeroPage /> },
                { path: "edit/:heroId", element: <EditHeroPage /> },
              ] },
            ]
          }
        ]
      },

      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/otp", element: <Otp /> },
      { path: "auth/logout", element: <LogoutPage /> },
      { path: "auth/pending", element: <PendingAccountPage /> },
      { path: "auth/rejected", element: <RejectedAccountPage /> },
      { path: "auth/unauthenticated", element: <UnauthenticatedAccountPage /> },
      { path: "auth/unauthorized", element: <UnauthorizedAccountPage /> },
    ],
  },
]);

export default function MainRouterProvider() {
  return <RouterProvider router={router} />;
}
