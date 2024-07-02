import { DrawerItem } from "@/types";

import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ArticleIcon from "@mui/icons-material/Article";

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
      title: "Skills",
      path: `skills`,
      icon: ManageAccountsIcon,
    },
    {
      title: "Skill Categories",
      path: `skill-categories`,
      icon: CategoryIcon,
    },
    {
      title: "Create Blog",
      path: `create-blog`,
      icon: PostAddIcon,
    },
    {
      title: "My Blogs",
      path: `my-blogs`,
      icon: ArticleIcon,
    },
    {
      title: "Blog Category",
      path: `blog-categories`,
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
