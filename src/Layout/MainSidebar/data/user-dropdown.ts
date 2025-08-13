import type { DropDownItem } from "@/types/dropdown-Item.type";
import {IconCheckbox, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
const userDropDownMenu: DropDownItem[] = [
  { icon: IconUser,
    label: "Profile",
    notifications: 3,
},
  { 
    icon: IconCheckbox, 
    label: "Tasks", 
    notifications: 4, 
    links: [
        {
            link: '/',
            label: 'Recent'
        },
        {
            link: '/',
            label: 'One month ago'
        },
        {
            link: '/',
            label: 'One year ago'
        }
    ]},
  { icon: IconUser, label: "Contacts" },
  { icon: IconSettings, label: "Settings" },
  { icon: IconLogout, label: "Logout", link: '/auth/logout' },
];

export default userDropDownMenu;