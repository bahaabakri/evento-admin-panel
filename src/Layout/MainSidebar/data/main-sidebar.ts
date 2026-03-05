import { PermissionsEnum } from "@/pages/Permissions/permissions.enum";
import type { DropDownItem } from "@/types/dropdown-Item.type";
import {
  IconBrowser,
  IconBulb,
  IconCalendarEvent,
  IconCheckbox,
  IconClearAll,
  IconClock,
  IconClockX,
  IconTableHeart,
  IconList,
  IconSettingsCog,
  IconUser,
  IconUserCog,
  IconKey,
} from "@tabler/icons-react";
const mainSidebarMenu: DropDownItem[] = [
  {
    icon: IconUser,
    label: "Users Management",
    link: "/users",
    permissions: [PermissionsEnum.VIEW_USERS],
  },
  {
    icon: IconUserCog,
    label: "Admins Management",
    links: [
      {
        label: "All Admins",
        link: "/admins",
        icon: IconList,
        permissions: [PermissionsEnum.VIEW_ADMINS],
      },
      {
        label: "Roles",
        link: "/roles",
        icon: IconSettingsCog,
        permissions: [PermissionsEnum.VIEW_ROLES],
      },
      {
        label: "Permissions",
        link: "/permissions",
        icon: IconKey,
        permissions: [PermissionsEnum.VIEW_PERMISSIONS],
      },
    ],
  },
  {
    icon: IconBulb,
    label: "Activity",
    notifications: 3,
    links: [
      {
        label: "Recent",
        link: "/",
      },
      {
        label: "One year ago",
        link: "/",
      },
    ],
  },
  {
    icon: IconBrowser,
    label: "UI Management",
    notifications: 3,
    links: [
      {
        icon: IconTableHeart,
        label: "Hero Section",
        link: "/ui/heroes",
      },
    ],
  },
  {
    icon: IconCalendarEvent,
    label: "Events",
    permissions: [PermissionsEnum.VIEW_EVENTS],
    links: [
      {
        icon: IconClearAll,
        label: "All Events",
        link: "/events",
      },
      {
        icon: IconClock,
        label: "Upcoming Events",
        link: "/",
      },
      {
        icon: IconClockX,
        label: "Missed Events",
        link: "/",
      },
    ],
  },
  {
    icon: IconCheckbox,
    label: "Tasks",
    notifications: 4,
  },
  {
    icon: IconCheckbox,
    label: "Tasks",
    notifications: 4,
  },
  {
    icon: IconUser,
    label: "Contacts",
  },
];

export default mainSidebarMenu;
