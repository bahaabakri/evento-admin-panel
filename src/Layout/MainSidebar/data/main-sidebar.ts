import type { DropDownItem } from "../../../types/dropdown-Item.type";
import { IconBulb, IconCheckbox, IconUser } from "@tabler/icons-react";
const mainSidebarMenu: DropDownItem[] = [
  { icon: IconBulb,
    label: "Activity",
    notifications: 3,
    links: [
        {
            label: 'Recent',
            link: '/'
        },
        {
            label: 'One year ago',
            link: '/'
        }
    ]
},
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts" },
];

export default mainSidebarMenu;
