"use client";

import CreateCategoryModal from "@/components/Modal/CreateCategoryModal/CreateCategoryModal";
import CategoriesTable from "@/components/Table/CategoriesTable/CategoriesTable";
import { useDeleteBlogMutation } from "@/redux/api/blogApi";
import {
  useCreateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useGetAllBlogCategoriesQuery,
} from "@/redux/api/blogCategoryApi";
import {
  useCreateProjectCategoryMutation,
  useDeleteProjectCategoryMutation,
  useGetAllProjectCategoriesQuery,
} from "@/redux/api/projectCategoryApi";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const BlogCategoriesPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { data: blogCategories, isLoading } = useGetAllBlogCategoriesQuery({});
  const [createBlogCategory] = useCreateBlogCategoryMutation();
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation();

  const handleCreateCategory = async (categoryData: FieldValues) => {
    try {
      const res = await createBlogCategory(categoryData);
      if (res?.data?.id) {
        toast.success("Blog Category Added Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setCreateModalOpen(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const res = await deleteBlogCategory(categoryId);
      if (res?.data?.id) {
        toast.success("Blog Category Deleted Successfully!");
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
            marginTop: "20px",
          }}
        >
          Blog Categories
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
          Add Blog Category
        </Button>
        <CategoriesTable
          projectCategories={blogCategories}
          handleDelete={handleDeleteCategory}
        />
      </Container>
      <CreateCategoryModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleCreateCategory}
      />
    </>
  );
};

export default BlogCategoriesPage;
