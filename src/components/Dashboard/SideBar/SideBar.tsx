import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
// import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const items = drawerItems();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <Box style={{ height: "100vh" }}>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/dashboard/welcome"
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            cursor: "pointer",
            fontWeight: "600",
            fontFamily: "chillax",
          }}
          className="gradient-text"
        >
          TouhidCodes
        </Typography>
      </Stack>
      <List
        sx={{
          paddingLeft: "20px",
          paddingRight: "40px",
        }}
      >
        {items.map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
