"use client";

import CreateProjectModal from "@/components/Modal/CreateProjectModal/CreateProjectModal";
import ProjectsTable from "@/components/Table/ProjectsTable/ProjectsTable";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectApi";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ProjectsPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const { data: projects, isLoading } = useGetAllProjectsQuery({});
  const [updateProject] = useUpdateProjectMutation();
  const [createProject] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const handleCreateProject = async (projectData: FieldValues) => {
    try {
      const res = await createProject(projectData);
      if (res?.data?.id) {
        toast.success("Project Added Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setCreateModalOpen(false);
  };

  const handleUpdate = async (projectData: FieldValues, projectId: string) => {
    try {
      const res = await updateProject({ projectId, projectData });
      if (res?.data?.id) {
        toast.success("Project Updated Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const res = await deleteProject(projectId);
      if (res?.data?.id) {
        toast.success("Project Deleted Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  modal close
  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  //  for opening modal
  const handleOpenModal = () => {
    setCreateModalOpen(true);
  };

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
            paddingTop: "20px",
          }}
        >
          My Projects
        </Typography>
        <Button
          variant="outlined"
          sx={{
            fontFamily: "Chillax",
            fontWeight: "bold",
            marginBottom: "50px",
          }}
          onClick={handleOpenModal}
        >
          Add Project
        </Button>
        <ProjectsTable
          projects={projects?.data}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </Container>
      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleCreateProject}
      />
    </>
  );
};

export default ProjectsPage;
