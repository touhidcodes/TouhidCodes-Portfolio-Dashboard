"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // if (!isLoggedIn()) {
  //   return router.push("/dashboard/welcome");
  //   // TODO: fix it to / route
  // }
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
