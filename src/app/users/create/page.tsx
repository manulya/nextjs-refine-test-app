"use client";

import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IUser } from "@interfaces/interfaces";

const seniorityLevels = ["Junior", "Mid-level", "Senior", "Lead"]; // Уровни старшинства
const skillsOptions = [
  "C#",
  "React",
  "NuxtJS",
  "Spring",
  "JavaScript",
  "Python",
  "Next",
  "MUI",
  "Refine",
];

function UserCreate() {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >

        <TextField
          id="first_name"
          {...register("first_name", {
            required: "This field is required",
          })}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          margin="normal"
          fullWidth
          label="First Name"
        />

        <TextField
          id="last_name"
          {...register("last_name", {
            required: "This field is required",
          })}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          margin="normal"
          fullWidth
          label="Last Name"
        />

        <TextField
          id="job_title"
          {...register("job_title", {
            required: "This field is required",
          })}
          error={!!errors.job_title}
          helperText={errors.job_title?.message}
          margin="normal"
          fullWidth
          label="Job Title"
        />

        <Controller
          name="seniority_level"
          control={control}
          defaultValue=""
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={seniorityLevels}
              getOptionLabel={(option) => option}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seniority Level"
                  error={!!errors.seniority_level}
                  helperText={errors.seniority_level?.message}
                  margin="normal"
                  fullWidth
                />
              )}
            />
          )}
        />

        <Controller
          name="skills"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={skillsOptions}
              getOptionLabel={(option) => option}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  error={!!errors.skills}
                  helperText={errors.skills ? "This field is required" : ""}
                  margin="normal"
                  fullWidth
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
}

export default UserCreate;
