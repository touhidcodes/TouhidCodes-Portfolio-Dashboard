import { DrawerItem } from "@/types";

import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";

export const drawerItems = (): DrawerItem[] => {
  const defaultMenus = [
    {
      title: "Welcome",
      path: `welcome`,
      icon: HomeIcon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  return [...defaultMenus];
};
