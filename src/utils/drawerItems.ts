import { DrawerItem } from "@/types";

import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CategoryIcon from "@mui/icons-material/Category";

export const drawerItems = (): DrawerItem[] => {
  const defaultMenus = [
    {
      title: "Welcome",
      path: `welcome`,
      icon: HomeIcon,
    },
    {
      title: "Projects",
      path: `projects`,
      icon: FileCopyIcon,
    },
    {
      title: "Project Categories",
      path: `project-categories`,
      icon: CategoryIcon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  return [...defaultMenus];
};
