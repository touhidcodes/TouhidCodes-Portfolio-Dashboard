"use client";
import { useState } from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  Typography,
} from "@mui/material";

interface IFileUploadButton {
  label?: string;
  accept?: string;
  uploadType?: "single" | "multiple";
  onFileUpload: (files: File[]) => void;
}

const TCFileUploader = ({
  label,
  accept,
  uploadType = "single",
  onFileUpload,
}: IFileUploadButton) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleFileUpload = () => {
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
      setIsUploaded(true);
    }
  };

  return (
    <Container>
      <Typography sx={{ marginBottom: "15px" }}>
        Upload {label} Image
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "2px dashed #1F2544",
            padding: "5px",
            borderRadius: "10px",
            background: "#F0F3F4",
            color: "#1F2544",
          }}
        >
          <Button
            component="span"
            variant="text"
            startIcon={<CloudUploadIcon />}
            sx={{
              padding: "10px 20px",
            }}
          >
            <Input
              type="file"
              inputProps={{
                accept: accept,
                multiple: uploadType === "multiple",
              }}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">{label || "upload image"}</label>
          </Button>
        </Box>
        <Button onClick={handleFileUpload} disabled={isUploaded}>
          Upload
        </Button>
      </Stack>
    </Container>
  );
};

export default TCFileUploader;
