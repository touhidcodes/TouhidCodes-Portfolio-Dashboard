"use client";

import CreateProjectModal from "@/components/Modal/CreateProjectModal/CreateProjectModal";
import CreateSkillModal from "@/components/Modal/CreateSkillModal/CreateSkillModal";
import ProjectsTable from "@/components/Table/ProjectsTable/ProjectsTable";
import SkillsTable from "@/components/Table/SkillsTable/SkillsTable";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectApi";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillsQuery,
  useUpdateSkillMutation,
} from "@/redux/api/skillApi";
import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const SkillsPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { data: skills, isLoading } = useGetAllSkillsQuery({});

  const [updateSkill] = useUpdateSkillMutation();
  const [createSkill] = useCreateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const handleCreateSkill = async (skillData: FieldValues) => {
    try {
      const res = await createSkill(skillData);
      if (res?.data?.id) {
        toast.success("Skill Added Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    setCreateModalOpen(false);
  };

  const handleUpdate = async (skillData: FieldValues, skillId: string) => {
    console.log(skillData);
    try {
      const res = await updateSkill({ skillId, skillData });
      console.log(res);
      if (res?.data?.id) {
        toast.success("Skill Updated Successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (skillId: string) => {
    try {
      const res = await deleteSkill(skillId);
      if (res?.data?.id) {
        toast.success("Skill Deleted Successfully!");
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
          My Skills
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
          Add Skill
        </Button>

        <SkillsTable
          skills={skills}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </Container>
      {/* <CreateProjectModal
      /> */}
      <CreateSkillModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleCreateSkill}
      />
    </>
  );
};

export default SkillsPage;
