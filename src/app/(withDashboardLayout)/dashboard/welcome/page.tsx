"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const WelcomePage = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Your Dashboard!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Here you can manage your projects, update your profile, and much more.
        </Typography>
      </Box>
    </Container>
  );
};

export default WelcomePage;
