import type { DropDownItem } from "@/types/dropdown-Item.type";
import {
  IconBulb,
  IconCalendarEvent,
  IconCheckbox,
  IconClearAll,
  IconClock,
  IconClockX,
  IconKey,
  IconList,
  IconSettingsCog,
  IconUser,
  IconUserCog,
} from "@tabler/icons-react";
const mainSidebarMenu: DropDownItem[] = [
  {
    icon: IconUser,
    label: "Users Management",
    link: "/users",
  },
  {
    icon: IconUserCog,
    label: "Admins Management",
    links: [
      {
        label: "All Admins",
        link: "/admins",
        icon: IconList
      },
      {
        label: "Roles",
        link: "/roles",
        icon: IconSettingsCog
      },
      {
        label: "Permissions",
        link: "/permissions",
        icon: IconKey
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
    icon: IconCalendarEvent,
    label: "Events",
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
