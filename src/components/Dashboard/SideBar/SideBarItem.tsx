import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SideBarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();

  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          margin: "10px",
          ...(pathname === linkPath
            ? {
                border: "1px solid #222831",
                background: "#F0F3F4",
                borderRadius: "10px",
                color: "#0D0C22",
                "& svg": {
                  color: "#0D0C22",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          {/* <ListItemText primary={item.title} sx={{ fontFamily: "Chillax" }} /> */}
          <Typography sx={{ fontFamily: "Chillax", fontWeight: "bold" }}>
            {item.title}
          </Typography>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItem;
