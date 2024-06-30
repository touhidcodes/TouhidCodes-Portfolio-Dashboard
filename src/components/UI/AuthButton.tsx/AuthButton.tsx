import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";

const AuthButton = () => {
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
    router.refresh();
  };

  return (
    <>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
};

export default AuthButton;
