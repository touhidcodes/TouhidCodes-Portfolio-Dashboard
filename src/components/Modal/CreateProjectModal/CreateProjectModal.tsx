import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import TCFileUploader from "@/components/Forms/TCFileUploader";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllProjectCategoriesQuery } from "@/redux/api/projectCategoriesApi";
import { TProjectCategory } from "@/types/Projects";

interface TCreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newProject: FieldValues) => void;
}

const CreateProjectModal = ({
  open,
  onClose,
  onSave,
}: TCreateProjectModalProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<FieldValues>({
    technologies: [],
    categoryId: "",
  });
  const [newTechnology, setNewTechnology] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(false);

  const { data: projectCategories, isLoading } =
    useGetAllProjectCategoriesQuery({});

  const handleCreateProject = async (values: FieldValues) => {
    const newProjectData = {
      ...values,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
      technologies: newProject.technologies || [],
      featured: featured,
      categoryId: newProject.categoryId,
    };
    onSave(newProjectData);
    onClose();
    resetForm();
    setNewProject({
      technologies: [],
    });
  };

  const handleThumbnailUpload = async (files: File[]) => {
    if (files.length > 0) {
      setImageUploadLoading(true);
      try {
        const url = await uploadImageToImageBB(files[0]);
        setThumbnailUrl(url);
        toast.success("Thumbnail image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading thumbnail image:", error);
        toast.error("Please upload the thumbnail image again");
      } finally {
        setImageUploadLoading(false);
      }
    }
  };

  const handleAddTechnology = () => {
    if (newTechnology) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTechnology],
      });
      setNewTechnology("");
    }
  };

  const handleDeleteTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((t: string) => t !== tech),
    });
  };

  const resetForm = () => {
    setThumbnailUrl("");
    setNewProject({});
    setNewTechnology("");
    setFeatured(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Box
          m={5}
          sx={{
            maxWidth: 600,
            width: "100%",
            height: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#F0F3F4",
            overflowY: "auto",
          }}
        >
          <TCForm
            onSubmit={handleCreateProject}
            defaultValues={{
              title: "",
              description: "",
              technologies: [],
              frontEndGithubLink: "",
              backEndGithubLink: "",
              frontEndLiveLink: "",
              backEndLiveLink: "",
              details: "",
              thumbnail: "",
              fullImage: "",
              category: "",
              featured: "No",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <TCFileUploader
                label="Thumbnail"
                accept="image/*"
                uploadType="single"
                onFileUpload={handleThumbnailUpload}
              />

              {imageUploadLoading && (
                <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                  Uploading image...
                </Typography>
              )}
              {thumbnailUrl && (
                <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                  Thumbnail image uploaded successfully!
                </Typography>
              )}
              <TCInput
                name="title"
                label="Project Title"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="description"
                label="Project Description"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="details"
                label="details"
                type="text"
                fullWidth={true}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  label="Technologies"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTechnology}
                >
                  Add
                </Button>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                sx={{ mt: 2, gap: 1 }}
              >
                {newProject?.technologies?.map(
                  (tech: string, index: number) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => handleDeleteTechnology(tech)}
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                      sx={{
                        border: "1px solid #1F2544",
                        color: "#1F2544",
                        padding: "5px",
                        fontWight: "bold",
                      }}
                    />
                  )
                )}
              </Stack>
              <TCInput
                name="frontEndGithubLink"
                label="Front End GitHub Link"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="backEndGithubLink"
                label="Back End GitHub Link"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="frontEndLiveLink"
                label="Front End Live Link"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="backEndLiveLink"
                label="Back End Live Link"
                type="text"
                fullWidth={true}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Category"
                  value={newProject.categoryId}
                  onChange={(e) =>
                    setNewProject({ ...newProject, categoryId: e.target.value })
                  }
                  fullWidth
                >
                  {projectCategories?.map((category: TProjectCategory) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  label="Featured"
                  value={featured ? "Yes" : "No"}
                  onChange={(e) => setFeatured(e.target.value === "Yes")}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                </TextField>
              </Stack>
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

export default CreateProjectModal;
