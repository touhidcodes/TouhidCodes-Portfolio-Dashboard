import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import TCFileUploader from "@/components/Forms/TCFileUploader";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";
import { TBlog, TBlogCategory } from "@/types/Blogs";
import { useGetAllBlogCategoriesQuery } from "@/redux/api/blogCategoryApi";

interface TUpdateBlogModalProps {
  open: boolean;
  blog: TBlog | null;
  onClose: () => void;
  onSave: (updatedBlog: FieldValues, blogId: string) => void;
}

const UpdateBlogModal = ({
  open,
  blog,
  onClose,
  onSave,
}: TUpdateBlogModalProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [updatedBlog, setUpdatedBlog] = useState<TBlog | null>(blog);
  const [published, setPublished] = useState<boolean>(blog?.published || false);

  const { data: blogCategories, isLoading } = useGetAllBlogCategoriesQuery({});

  // Set project data which going to be update
  useEffect(() => {
    setUpdatedBlog(blog);
    setPublished(blog?.published || false);
  }, [blog]);

  // Pass the updated data to parent component for update
  const handleUpdatePost = async (values: FieldValues) => {
    if (blog && blog?.id) {
      const updatedValue = {
        ...values,
        ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
        published: published,
        categoryId: updatedBlog?.categoryId,
      };
      onSave(updatedValue, blog?.id);
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
              title: updatedBlog?.title || "",
              published: published ? "Yes" : "No",
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
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Category"
                  value={updatedBlog?.categoryId || ""}
                  onChange={(e) =>
                    setUpdatedBlog((prevBlog) => ({
                      ...prevBlog!,
                      categoryId: e.target.value,
                    }))
                  }
                  fullWidth
                >
                  {blogCategories?.map((category: TBlogCategory) => (
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
                  value={published ? "Yes" : "No"}
                  onChange={(e) => setPublished(e.target.value === "Yes")}
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

export default UpdateBlogModal;
