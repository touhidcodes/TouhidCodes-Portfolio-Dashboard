"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard/welcome");
  };

  return (
    <Box
      sx={{
        background: "#FFF8F4",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Image
              src={"/assets/notFound/not-found.png"}
              width={500}
              height={500}
              alt="not-found"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              color="secondary.main"
              mb={2}
            >
              Oops! Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={4}>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRedirect}
            >
              Go to Dashboard
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
