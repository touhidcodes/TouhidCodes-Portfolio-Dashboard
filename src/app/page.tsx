"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginValidationSchema } from "@/constants/schema";
import { useRouter } from "next/navigation";
import TCForm from "@/components/Forms/TCForm";
import TCInput from "@/components/Forms/TCInput";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res?.data?.token) {
        toast.success(res?.message);
        router.push("/dashboard/welcome"), router.refresh();
      } else {
        setError(res.message);
        console.log(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Typography
            variant="h3"
            fontWeight={600}
            style={{ color: "#0B1134CC", marginTop: "20px" }}
          >
            Welcome Back!
          </Typography>
        </Stack>

        {error && (
          <Box>
            <Typography
              sx={{
                borderRadius: "2px",
                color: "#ff793f",
                marginTop: "5px",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        <Box m={5}>
          <TCForm
            onSubmit={handleLogin}
            resolver={zodResolver(loginValidationSchema)}
            defaultValues={{
              identifier: "",
              password: "",
            }}
          >
            <Stack spacing={3} my={1}>
              <Box
                fontWeight={400}
                style={{ color: "#0B1134CC", textAlign: "start" }}
              >
                <Typography style={{ marginBottom: "10px" }}>
                  Username or Email*
                </Typography>
                <TCInput
                  name="identifier"
                  label="Username or Email"
                  type="text"
                  fullWidth={true}
                />
              </Box>
              <Box
                fontWeight={400}
                style={{ color: "#0B1134CC", textAlign: "start" }}
              >
                <Typography style={{ marginBottom: "10px" }}>
                  Password*
                </Typography>
                <TCInput
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth={true}
                />
              </Box>
            </Stack>

            {/* <Link href={"/"}>
              <Typography
                mb={1}
                textAlign="end"
                component="p"
                fontWeight={300}
                sx={{
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </Typography>
            </Link> */}

            <Button
              sx={{
                margin: "10px 0px",
              }}
              fullWidth={true}
              type="submit"
            >
              Login
            </Button>
          </TCForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
