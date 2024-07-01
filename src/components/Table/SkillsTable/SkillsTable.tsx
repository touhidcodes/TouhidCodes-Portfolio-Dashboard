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
import UpdateprojectModal from "@/components/Modal/UpdateProjectModal/updateProjectModal";
import { FieldValues } from "react-hook-form";
import { TProject } from "@/types/Projects";
import UpdateProjectModal from "@/components/Modal/UpdateProjectModal/updateProjectModal";
import { TSkill } from "@/types/Skills";
import UpdateSkillModal from "@/components/Modal/UpdateSkillModal/UpdateSkillModal";

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

type TProjectsTableProps = {
  skills: TSkill[];
  handleUpdate: (skills: FieldValues, skillId: string) => void;
  handleDelete: (skillId: string) => void;
};

const SkillsTable = ({
  skills,
  handleUpdate,
  handleDelete,
}: TProjectsTableProps) => {
  const [selectedSkill, setSelectedSkill] = useState<TSkill | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );

  // edit button & set selected project data
  const handleEditClick = (skill: TSkill) => {
    setSelectedSkill(skill);
    setUpdateModalOpen(true);
  };

  //  modal close
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedSkill(null);
  };

  //  pass values to the parent component
  const handleSaveUpdatedProject = (
    updatedProject: FieldValues,
    projectId: string
  ) => {
    handleUpdate(updatedProject, projectId);
    setUpdateModalOpen(false);
    setSelectedSkill(null);
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
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Level</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill: TSkill) => (
              <StyledTableRow key={skill.id}>
                <StyledTableCell align="center">{skill?.name}</StyledTableCell>
                <StyledTableCell align="center">{skill?.level}</StyledTableCell>

                <StyledTableCell align="center">
                  {skill?.skillCategory?.name}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button onClick={() => handleEditClick(skill)}>Edit</Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleDeleteClick(skill?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* update project modal */}
      <UpdateSkillModal
        open={isUpdateModalOpen}
        skill={selectedSkill}
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

export default SkillsTable;
