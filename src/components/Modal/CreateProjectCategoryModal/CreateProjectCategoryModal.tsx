import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";

interface TCreateProjectCategoryModalProps {
  open: boolean;
  onSave: (projectCategory: FieldValues) => void;
  onClose: () => void;
}

const CreateProjectCategoryModal = ({
  open,
  onSave,
  onClose,
}: TCreateProjectCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>("");

  const handleCreateProjectCategory = async (values: FieldValues) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Box
          m={5}
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#F0F3F4",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Project Category
          </Typography>
          <TCForm
            onSubmit={handleCreateProjectCategory}
            defaultValues={{
              name: "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <TCInput
                name="name"
                label="Project Category Name"
                type="text"
                fullWidth={true}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
              spacing={5}
            >
              <Button fullWidth={true} type="submit">
                Submit
              </Button>
              <Button fullWidth={true} onClick={() => onClose()}>
                Cancel
              </Button>
            </Stack>
          </TCForm>
        </Box>
      </Stack>
    </Modal>
  );
};

export default CreateProjectCategoryModal;
