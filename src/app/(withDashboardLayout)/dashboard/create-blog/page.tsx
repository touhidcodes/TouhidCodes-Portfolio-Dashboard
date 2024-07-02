"use client";

import TCFileUploader from "@/components/Forms/TCFileUploader";
import TCForm from "@/components/Forms/TCForm";
import TCInput from "@/components/Forms/TCInput";
import TipTap from "@/components/TextEditor/TipTap/TipTap";
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { useGetAllBlogCategoriesQuery } from "@/redux/api/blogCategoryApi";
import { TBlogCategory } from "@/types/Blogs";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import parse from "html-react-parser";

const CreateBlogPage = () => {
  const [blogContent, setBlogContent] = useState<string>("");
  const [newBlog, setNewBlog] = useState<FieldValues>({
    categoryId: "",
  });
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const { data: blogCategories, isLoading } = useGetAllBlogCategoriesQuery({});
  const [createBlog] = useCreateBlogMutation();

  const handleCreateBlog = async (values: FieldValues) => {
    const newBlogData = {
      ...values,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
      content: blogContent,
      categoryId: newBlog.categoryId,
    };
    try {
      const res = await createBlog(newBlogData);
      console.log(res);
      if (res?.data?.id) {
        toast.success("Blog Published Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setBtnDisabled(true);
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
        <TipTap postContent={setBlogContent} />
        <Box
          m={5}
          sx={{
            maxWidth: 600,
            width: "100%",
            height: "100%",

            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#F0F3F4",
            overflowY: "auto",
          }}
        >
          <TCForm
            onSubmit={handleCreateBlog}
            defaultValues={{
              title: "",
              category: "",
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
                label="Blog Title"
                type="text"
                fullWidth={true}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Category"
                  value={newBlog.categoryId}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, categoryId: e.target.value })
                  }
                  fullWidth
                  sx={{ maxWidth: 600 }}
                >
                  {blogCategories?.map((category: TBlogCategory) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
            <Button fullWidth={true} type="submit" disabled={isBtnDisabled}>
              Publish Blog
            </Button>
          </TCForm>
        </Box>
        {/* <div className="tiptap">{parse(blogContent)}</div> */}
      </Container>
    </>
  );
};

export default CreateBlogPage;
