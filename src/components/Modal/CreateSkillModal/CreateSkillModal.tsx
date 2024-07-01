import React, { useState } from "react";
import { Modal, Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { FieldValues } from "react-hook-form";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";
import { SkillLevel, TSkillCategory } from "@/types/Skills";
import { useGetAllSkillCategoriesQuery } from "@/redux/api/skillCategoryApi";

interface TCreateSkillModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: FieldValues) => void;
}

const CreateSkillModal = ({
  open,
  onClose,
  onSave,
}: TCreateSkillModalProps) => {
  const { data: skillCategories } = useGetAllSkillCategoriesQuery({});
  const [newSkill, setNewSkill] = useState<FieldValues>({
    level: "",
    skillCategoryId: "",
  });

  const handleCreateSkill = async (values: FieldValues) => {
    const newValues = {
      ...values,
      level: newSkill.level,
      skillCategoryId: newSkill.skillCategoryId,
    };
    onSave(newValues);
    onClose();
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
            onSubmit={handleCreateSkill}
            defaultValues={{
              name: newSkill.name || "",
              icon: newSkill.icon || "",
              level: newSkill.level || "",
              skillCategoryId: newSkill.skillCategoryId || "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <TCInput
                name="name"
                label="Skill Name"
                type="text"
                fullWidth={true}
              />
              <TCInput
                name="icon"
                label="Skill Icon"
                type="text"
                fullWidth={true}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  label="Skill Level"
                  name="level"
                  value={newSkill.level}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, level: e.target.value })
                  }
                  fullWidth
                  size="small"
                >
                  {Object.values(SkillLevel).map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  size="small"
                  label="Skill Category"
                  name="skillCategoryId"
                  value={newSkill.skillCategoryId}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      skillCategoryId: e.target.value,
                    })
                  }
                  fullWidth
                >
                  {skillCategories?.map((category: TSkillCategory) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
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
              <Button fullWidth={true} onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </TCForm>
        </Box>
      </Stack>
    </Modal>
  );
};

export default CreateSkillModal;
