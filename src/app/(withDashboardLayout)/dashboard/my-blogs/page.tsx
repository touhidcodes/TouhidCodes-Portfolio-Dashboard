"use client";

import BlogsTable from "@/components/Table/BlogsTable/BlogsTable";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import { Box, Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const MyBlogsPage = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery({});
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleUpdate = async (blogData: FieldValues, blogId: string) => {
    try {
      const res = await updateBlog({ blogId, blogData });
      if (res?.data?.id) {
        toast.success("Project Updated Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      const res = await deleteBlog(blogId);
      if (res?.data?.id) {
        toast.success("Project Deleted Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
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
          }}
        >
          Create Blog
        </Typography>
        <BlogsTable
          blogs={blogs?.data}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </Container>
    </>
  );
};

export default MyBlogsPage;
