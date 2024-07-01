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
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import UpdateFlatModal from "@/components/Modal/UpdateProjectModal/updateProjectModal";
import { FieldValues } from "react-hook-form";
import { TProject } from "@/types/Projects";
import UpdateProjectModal from "@/components/Modal/UpdateProjectModal/updateProjectModal";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1F2544",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TProjectsTableProps = {
  projects: TProject[];
  handleUpdate: (project: FieldValues, projectId: string) => void;
  handleDelete: (projectId: string) => void;
};

const ProjectsTable = ({
  projects,
  handleUpdate,
  handleDelete,
}: TProjectsTableProps) => {
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );

  // edit button & set selected flat data
  const handleEditClick = (project: TProject) => {
    setSelectedProject(project);
    setUpdateModalOpen(true);
  };

  //  modal close
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedProject(null);
  };

  //  pass values to the parent component
  const handleSaveUpdatedProject = (
    updatedProject: FieldValues,
    projectId: string
  ) => {
    handleUpdate(updatedProject, projectId);
    setUpdateModalOpen(false);
    setSelectedProject(null);
  };

  // open delete confirmation dialog
  const handleDeleteClick = (projectId: string) => {
    setProjectIdToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  // close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProjectIdToDelete(null);
  };

  // handle delete action
  const handleConfirmDelete = () => {
    if (projectIdToDelete) {
      handleDelete(projectIdToDelete);
      setDeleteDialogOpen(false);
      setProjectIdToDelete(null);
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
            {projects.map((project: TProject) => (
              <StyledTableRow key={project.id}>
                <StyledTableCell align="right">
                  <Image
                    src={project?.thumbnail}
                    alt="flat image"
                    width={100}
                    height={50}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project?.title}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {project?.category?.name}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {project?.featured ? "Yes" : "No"}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button onClick={() => handleEditClick(project)}>Edit</Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleDeleteClick(project?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* update project modal */}
      <UpdateProjectModal
        open={isUpdateModalOpen}
        project={selectedProject}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedProject}
      />
      {/* delete project modal */}
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

export default ProjectsTable;
