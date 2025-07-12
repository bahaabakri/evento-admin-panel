import type { Icon, IconProps } from "@tabler/icons-react";

export interface DropDownItem {
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  links?: {
    icon?: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<Icon>
    >;
    label: string;
    link: string;
  }[];
  notifications?: number;
}
