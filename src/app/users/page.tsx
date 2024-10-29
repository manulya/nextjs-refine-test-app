"use client";

import React from "react";
import { EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "@interfaces/interfaces";

function UsersPage() {
  const { dataGridProps } = useDataGrid<IUser>(
    {resource: "users"},
  );

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
        flex: 1,
      },
      {
        field: "seniority_level",
        headerName: "Seniority Level",
        flex: 1,
      },
      {
        field: "skills",
        headerName: "Skills",
        flex: 1,
        renderCell: (params) => params.value.join(", "), // Отображаем навыки через запятую
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
      />
    </List>
  );
}

export default UsersPage;
