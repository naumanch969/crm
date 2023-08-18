import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DeleteOutline, OpenInNewOutlined } from "@mui/icons-material";

const Table = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = [
    {
      id: 1,
      date: "Date",
      Name: "Name",
      CNIC: "CNIC",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      status: "Approved",
    },
    {
      id: 2,
      date: "Date",
      Name: "Name",
      CNIC: "CNIC",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      status: "Pending",
    },
    {
      id: 3,
      date: "Date",
      Name: "Name",
      CNIC: "CNIC",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      status: "Pending",
    },
    {
      id: 4,
      date: "Date",
      Name: "Name",
      CNIC: "CNIC",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      status: "Pending",
    },
    {
      id: 5,
      date: "Date",
      Name: "Name",
      CNIC: "CNIC",
      paymenttype: "Type Of Payment",
      amountin: "Amount In",
      amountrem: "Amount Remaining",
      status: "Pending",
    },
  ];

  const columns = [
    { field: "id", headerName: "Voucher No.", width: 150 },
    { field: "date", headerName: "Issue Date", width: 150 },
    { field: "Name", headerName: "Name", width: 140 },
    { field: "CNIC", headerName: "CNIC", width: 120 },
    { field: "paymenttype", headerName: "Payment Type", width: 170 },
    { field: "amountin", headerName: "Amount In", width: 140 },
    { field: "amountrem", headerName: "Amount Remaining", width: 200 },
    {
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Chip
            label="Approved"
            style={{ backgroundColor: rows.id % 2 == 0 ? "red" : "green", color: "white" }}
          />
        </div>
      ),
    },
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
          <Tooltip placement="top" title="View">
            <IconButton onClick={handleClickOpen} className="hover:text-red-500">
              <OpenInNewOutlined />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full bg-white rounded-lg z-[1000]">
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
            disableRowSelectionOnClick
          />
        </div>
      </div>

      <Dialog className="z-[1000]" open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle className="border-b-2 border-b-black flex justify-center">
            Voucher Details
          </DialogTitle>
          <DialogContentText id="alert-dialog-description" className="p-10">
            <div className="font-bold">
              Voucher Number: <span className="font-thin ml-[30px]">000000</span>
            </div>
            <div className="font-bold">
              Issue date: <span className="font-thin ml-20">00/00/0000</span>
            </div>
            <div className="font-bold">
              Customer Name: <span className="font-thin ml-[35px]">###########</span>
            </div>
            <div className="font-bold">
              Customer CNIC: <span className="font-thin ml-[38px]">00000-00000000-0</span>
            </div>
            <div className="font-bold">
              Payment Type: <span className="font-thin ml-[50px]">######</span>
            </div>
            <div className="font-bold">
              Amount In: <span className="font-thin ml-[78px]">0000000</span>
            </div>
            <div className="font-bold">
              Amount Remaining: <span className="font-thin ml-[9px]">0000000</span>
            </div>
            <div className="font-bold">
              Status: <span className="font-thin ml-[108px]">##########</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Table;
