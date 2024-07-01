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
import { FieldValues } from "react-hook-form";
import { TProjectCategory } from "@/types/Projects";

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
  projectCategories: TProjectCategory[];
  handleDelete: (projectId: string) => void;
};

const ProjectCategoriesTable = ({
  projectCategories,
  handleDelete,
}: TProjectsTableProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );

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
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectCategories.map((category: TProjectCategory) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell align="center">
                  {category?.name}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button onClick={() => handleDeleteClick(category?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ProjectCategoriesTable;
