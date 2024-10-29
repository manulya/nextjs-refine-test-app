"use client";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

import { IUser } from "@interfaces/interfaces";

function UsersPage() {
  const { dataGridProps } = useDataGrid<IUser>({ resource: "users" });

  const columns = React.useMemo<GridColDef<IUser>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 150,
      },
      {
        field: "first_name",
        headerName: "First Name",
        flex: 1,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        flex: 1,
      },
      {
        field: "job_title",
        headerName: "Job Title",
        flex: 2,
      },
      {
        field: "seniority_level",
        headerName: "Seniority Level",
        flex: 1,
      },
      {
        field: "skills",
        headerName: "Skills",
        flex: 2,
        renderCell: (params: GridRenderCellParams<IUser, "skills">) => {
          const skills = params.value;
          return Array.isArray(skills) && skills.length > 0
            ? skills.join(", ")
            : "No skills available";
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams<IUser, "actions">) => (
          <>
            <ShowButton hideText recordItemId={params.row.id.toString()} />
            <EditButton hideText recordItemId={params.row.id.toString()} />
            <DeleteButton hideText recordItemId={params.row.id.toString()} />
          </>
        ),
      },
    ],
    [],
  );

  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  return (
    <List>
      <DataGrid
        columns={columns}
        {...restDataGridProps}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        autoHeight
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #E0E0E0",
            "&:hover": {
              backgroundColor: "#03b0b03f",
            },
          },
        }}
      />
    </List>
  );
}

export default UsersPage;
