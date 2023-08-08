import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "Voucher No.", width: 150 },
  { field: "date", headerName: "Issue Date", width: 150 },
  { field: "Name", headerName: "Name", width: 140 },
  { field: "CNIC", headerName: "CNIC", width: 120 },
  { field: "paymenttype", headerName: "Payment Type", width: 170 },
  { field: "amountin", headerName: "Amount In", width: 140 },
  { field: "amountrem", headerName: "Amount Remaining", width: 200 },
  { field: "status", headerName: "Status", width: 120 },
  {
    field: "action",
    headerName: "Action",
    width: 120,
    renderCell: (params) => (
      <div className="flex gap-[4px] ">
        <Tooltip placement="top" title="Delete">
          <IconButton className="hover:text-red-500">
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    date: "Date",
    Name: "Name",
    CNIC: "CNIC",
    paymenttype: "Type Of Payment",
    amountin: "Amount In",
    amountrem: "Amount Remaining",
    status: "Status",
  },
  {
    id: 2,
    date: "Date",
    Name: "Name",
    CNIC: "CNIC",
    paymenttype: "Type Of Payment",
    amountin: "Amount In",
    amountrem: "Amount Remaining",
    status: "Status",
  },
];

const Table = () => {
  return (
    <div>
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
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
