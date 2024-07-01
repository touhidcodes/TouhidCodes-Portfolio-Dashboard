import React, { useState, useEffect } from "react";
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
import { TProject, TProjectCategory } from "@/types/Projects";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import TCFileUploader from "@/components/Forms/TCFileUploader";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllProjectCategoriesQuery } from "@/redux/api/projectCategoryApi";

interface TUpdateProjectModalProps {
  open: boolean;
  project: TProject | null;
  onClose: () => void;
  onSave: (updatedProject: FieldValues, projectId: string) => void;
}

const UpdateProjectModal = ({
  open,
  project,
  onClose,
  onSave,
}: TUpdateProjectModalProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [updatedProject, setUpdatedProject] = useState<TProject | null>(
    project
  );
  const [newTechnology, setNewTechnology] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(project?.featured || false);

  const { data: projectCategories, isLoading } =
    useGetAllProjectCategoriesQuery({});

  // Set project data which going to be update
  useEffect(() => {
    setUpdatedProject(project);
    setFeatured(project?.featured || false);
  }, [project]);

  // Pass the updated data to parent component for update
  const handleUpdatePost = async (values: FieldValues) => {
    if (project && project?.id) {
      const updatedValue = {
        ...values,
        ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
        technologies: updatedProject?.technologies || [],
        featured: featured,
        categoryId: updatedProject?.categoryId,
      };
      console.log(updatedValue);
      onSave(updatedValue, project?.id);
    }
    onClose();
    setThumbnailUrl("");
  };

  // Image upload for thumbnail
  const handleThumbnailUpload = async (files: File[]) => {
    if (files.length > 0) {
      setImageUploadLoading(true);
      try {
        const url = await uploadImageToImageBB(files[0]);
        if (url) {
          setThumbnailUrl(url);
          toast.success("Thumbnail image uploaded successfully!");
        }
      } catch (error) {
        console.error("Error uploading thumbnail image:", error);
        toast.error("Please upload the thumbnail image again");
      } finally {
        setImageUploadLoading(false);
      }
    }
  };

  // Handle add new technology
  const handleAddTechnology = () => {
    if (newTechnology && updatedProject) {
      setUpdatedProject({
        ...updatedProject,
        technologies: [...updatedProject.technologies, newTechnology],
      });
      setNewTechnology("");
    }
  };

  // Handle delete technology
  const handleDeleteTechnology = (tech: string) => {
    if (updatedProject) {
      setUpdatedProject((prevProject) => ({
        ...prevProject!,
        technologies: prevProject!.technologies.filter((t) => t !== tech),
      }));
    }
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
            onSubmit={handleUpdatePost}
            defaultValues={{
              title: updatedProject?.title || "",
              description: updatedProject?.description || "",
              technologies: updatedProject?.technologies || [],
              frontEndGithubLink: updatedProject?.frontEndGithubLink || "",
              backEndGithubLink: updatedProject?.backEndGithubLink || "",
              frontEndLiveLink: updatedProject?.frontEndLiveLink || "",
              backEndLiveLink: updatedProject?.backEndLiveLink || "",
              details: updatedProject?.details || "",
              thumbnail: updatedProject?.thumbnail || "",
              fullImage: updatedProject?.fullImage || "",
              category: updatedProject?.category?.name || "",
              featured: featured ? "Yes" : "No",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                    Uploading image...
                  </Typography>
                </Box>
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
                {updatedProject?.technologies?.map((tech, index) => (
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
                ))}
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
                  value={updatedProject?.categoryId || ""}
                  onChange={(e) =>
                    setUpdatedProject((prevProject) => ({
                      ...prevProject!,
                      categoryId: e.target.value,
                    }))
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

export default UpdateProjectModal;
