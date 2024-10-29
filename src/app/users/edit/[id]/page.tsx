"use client";

import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { useConstants } from "@contexts/select-items";
import { IUser } from "@interfaces/interfaces";

function UserEdit() {
  const { seniorityLevels, skillsOptions } = useConstants();

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IUser, HttpError>();

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      wrapperProps={{
        sx: {
          maxHeight: "100vh",
          padding: "20px 5%",
          margin: "0 auto",
        },
      }}
    >
      <Box
        component="form"
        sx={{
          width: "80%",
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <TextField
          id="first_name"
          {...register("first_name", {
            required: "This field is required",
          })}
          error={!!errors.first_name}
          helperText={errors.first_name?.message?.toString()}
          margin="normal"
          fullWidth
          label="First Name"
          name="first_name"
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="last_name"
          {...register("last_name", {
            required: "This field is required",
          })}
          error={!!errors.last_name}
          helperText={errors.last_name?.message?.toString()}
          margin="normal"
          fullWidth
          label="Last Name"
          name="last_name"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="job_title"
          {...register("job_title", {
            required: "This field is required",
          })}
          error={!!errors.job_title}
          helperText={errors.job_title?.message?.toString()}
          margin="normal"
          fullWidth
          label="Job Title"
          name="job_title"
          InputLabelProps={{
            shrink: true,
          }}
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
              getOptionLabel={(option: string) => option}
              onChange={(_, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seniority Level"
                  error={!!errors.seniority_level}
                  helperText={errors.seniority_level?.message?.toString()}
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
              getOptionLabel={(option: string) => option}
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
    </Edit>
  );
}

export default UserEdit;
