"use client";

import TipTap from "@/components/TextEditor/TipTap/TipTap";
import { Box, Container, Typography } from "@mui/material";

const CreateBlogPage = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "secondary.main",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <>
      <Container
        sx={{
          paddingTop: "50px",
          paddingBottom: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          my={3}
          sx={{
            fontFamily: "Chillax",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Create Blog
        </Typography>
        <TipTap />
      </Container>
    </>
  );
};

export default CreateBlogPage;
