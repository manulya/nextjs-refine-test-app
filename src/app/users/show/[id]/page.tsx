"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useShow } from "@refinedev/core";
import {
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

import { IUser } from "@interfaces/interfaces";

function UserShow() {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          First Name
        </Typography>
        <TextField value={record?.first_name} />

        <Typography variant="body1" fontWeight="bold">
          Last Name
        </Typography>
        <TextField value={record?.last_name} />

        <Typography variant="body1" fontWeight="bold">
          Job Title
        </Typography>
        <TextField value={record?.job_title} />

        <Typography variant="body1" fontWeight="bold">
          Seniority Level
        </Typography>
        <TextField value={record?.seniority_level} />

        <Typography variant="body1" fontWeight="bold">
          Skills
        </Typography>
        <MarkdownField value={record?.skills?.join(", ")} />
      </Stack>
    </Show>
  );
}

export default UserShow;
