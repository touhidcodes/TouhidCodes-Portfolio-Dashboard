"use client";

import TCForm from "@/components/Forms/TCForm";
import TCInput from "@/components/Forms/TCInput";
import { useCreateOrUploadResumeMutation } from "@/redux/api/resumeApi";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const Resume = () => {
  const [uploadResumeURL] = useCreateOrUploadResumeMutation();

  const handleUploadResume = async (url: FieldValues) => {
    try {
      const res = await uploadResumeURL(url);
      if (res?.data?.id) {
        toast.success("Resume URL Uploaded Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          Update
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Upload your resume to Google Drive and upload customize link
        </Typography>
        <Box>
          <TCForm
            onSubmit={handleUploadResume}
            defaultValues={{
              url: "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <TCInput
                name="url"
                label="Resume URL"
                type="text"
                fullWidth={true}
              />
            </Stack>
            <Button fullWidth={true} type="submit">
              Upload Resume URL
            </Button>
          </TCForm>
        </Box>
      </Container>
    </>
  );
};

export default Resume;
