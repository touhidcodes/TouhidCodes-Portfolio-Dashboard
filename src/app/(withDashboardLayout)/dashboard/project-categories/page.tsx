"use client";

import CreateProjectCategoryModal from "@/components/Modal/CreateProjectCategoryModal/CreateProjectCategoryModal";
import ProjectCategoriesTable from "@/components/Table/ProjectCategoriesTable/ProjectCategoriesTable";
import {
  useCreateProjectCategoryMutation,
  useDeleteProjectCategoryMutation,
  useGetAllProjectCategoriesQuery,
} from "@/redux/api/projectCategoriesApi";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ProjectCategoriesPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { data: projectCategories, isLoading } =
    useGetAllProjectCategoriesQuery({});
  const [createProjectCategory] = useCreateProjectCategoryMutation();
  const [deleteProjectCategory] = useDeleteProjectCategoryMutation();

  const handleCreateProjectCategory = async (categoryData: FieldValues) => {
    try {
      const res = await createProjectCategory(categoryData);
      if (res?.data?.id) {
        toast.success("Project Category Added Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setCreateModalOpen(false);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      const res = await deleteProjectCategory(categoryId);
      if (res?.data?.id) {
        toast.success("Project Category Deleted Successfully!");
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
            marginTop: "20px",
          }}
        >
          Project Categories
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
          Add Project Category
        </Button>
        <ProjectCategoriesTable
          projectCategories={projectCategories}
          handleDelete={handleDelete}
        />
      </Container>
      <CreateProjectCategoryModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleCreateProjectCategory}
      />
    </>
  );
};

export default ProjectCategoriesPage;
