import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

const Progress = () => {
  const rows = [
    {
      id: 1,
      date: "Date",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      purpose: "Sell",
    },
    {
      id: 2,
      date: "Date",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      purpose: "Sell",
    },
    {
      id: 3,
      date: "Date",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      purpose: "Sell",
    },
    {
      id: 4,
      date: "Date",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      purpose: "Sell",
    },
  ];

  const columns = [
    { field: "id", headerName: "Project ID", width: 150 },
    { field: "date", headerName: "Starting Date", width: 200 },
    { field: "purpose", headerName: "Purpose", width: 200 },
    { field: "amountin", headerName: "Amount In", width: 200 },
    { field: "amountrem", headerName: "Amount Remaining", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Chip
            label="Under Process"
            style={{ backgroundColor: rows.status == "Pending" ? "red" : "red", color: "white" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="pl-[10%] pr-[10%] pt-10">
      <div className="w-full h-auto bg-white rounded-lg">
        <div className="w-full h-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;