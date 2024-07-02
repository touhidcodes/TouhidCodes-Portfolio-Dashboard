import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { TBlog } from "@/types/Blogs";
import UpdateBlogModal from "@/components/Modal/UpdateBlogModal/UpdateBlogModal";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1F2544",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TBlogsTableProps = {
  blogs: TBlog[];
  handleUpdate: (blog: FieldValues, blogId: string) => void;
  handleDelete: (blogId: string) => void;
};

const BlogsTable = ({
  blogs,
  handleUpdate,
  handleDelete,
}: TBlogsTableProps) => {
  const [selectedBlog, setSelectedBlog] = useState<TBlog | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState<string | null>(null);

  // edit button & set selected project data
  const handleEditClick = (blog: TBlog) => {
    setSelectedBlog(blog);
    setUpdateModalOpen(true);
  };

  //  modal close
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  //  pass values to the parent component
  const handleSaveUpdatedProject = (
    updatedBlog: FieldValues,
    blogId: string
  ) => {
    handleUpdate(updatedBlog, blogId);
    setUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  // open delete confirmation dialog
  const handleDeleteClick = (blogId: string) => {
    setBlogIdToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  // close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBlogIdToDelete(null);
  };

  // handle delete action
  const handleConfirmDelete = () => {
    if (blogIdToDelete) {
      handleDelete(blogIdToDelete);
      setDeleteDialogOpen(false);
      setBlogIdToDelete(null);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Thumbnail</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Featured</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog: TBlog) => (
              <StyledTableRow key={blog.id}>
                <StyledTableCell align="right">
                  {blog?.thumbnail && (
                    <Image
                      src={blog.thumbnail}
                      alt="project image"
                      width={100}
                      height={50}
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{blog?.title}</StyledTableCell>

                <StyledTableCell align="center">
                  {blog?.category?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {blog?.published ? "Yes" : "No"}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button onClick={() => handleEditClick(blog)}>Edit</Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleDeleteClick(blog?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* update blog modal */}
      <UpdateBlogModal
        open={isUpdateModalOpen}
        blog={selectedBlog}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedProject}
      />
      {/* delete blog modal */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogsTable;
