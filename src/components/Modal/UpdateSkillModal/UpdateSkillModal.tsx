import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Stack, TextField, MenuItem } from "@mui/material";
import { FieldValues } from "react-hook-form";
import TCInput from "@/components/Forms/TCInput";
import TCForm from "@/components/Forms/TCForm";
import { SkillLevel, TSkill } from "@/types/Skills";

interface TUpdateSkillModalProps {
  open: boolean;
  skill: TSkill | null;
  onClose: () => void;
  onSave: (updatedSkill: FieldValues, skillId: string) => void;
}

const UpdateSkillModal = ({
  open,
  skill,
  onClose,
  onSave,
}: TUpdateSkillModalProps) => {
  const [updatedSkill, setUpdatedSkill] = useState<TSkill | null>(skill);

  // Set skill data which is going to be updated
  useEffect(() => {
    setUpdatedSkill(skill);
  }, [skill]);

  // Pass the updated data to parent component for update
  const handleUpdateSkill = async (values: FieldValues) => {
    if (skill && skill.id) {
      const updatedValue = {
        ...values,
        skillCategoryId: updatedSkill?.skillCategoryId,
      };
      onSave(updatedValue, skill.id);
    }
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
            onSubmit={handleUpdateSkill}
            defaultValues={{
              name: updatedSkill?.name || "",
              icon: updatedSkill?.icon || "",
              level: updatedSkill?.level || "",
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
              <TCInput
                name="level"
                label="Skill Level"
                type="text"
                fullWidth={true}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                  select
                  label="Skill Level"
                  name="level"
                  value={updatedSkill?.level || ""}
                  onChange={(e) =>
                    setUpdatedSkill((prevSkill) => ({
                      ...prevSkill!,
                      level: e.target.value,
                    }))
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
                  value={updatedSkill?.skillCategoryId || ""}
                  onChange={(e) =>
                    setUpdatedSkill((prevSkill) => ({
                      ...prevSkill!,
                      skillCategoryId: e.target.value,
                    }))
                  }
                  fullWidth
                >
                  {updatedSkill?.skillCategory && (
                    <MenuItem value={updatedSkill.skillCategory.id}>
                      {updatedSkill.skillCategory.name}
                    </MenuItem>
                  )}
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

export default UpdateSkillModal;
