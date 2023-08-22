import { Add, KeyboardArrowRight, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../Components";
import { getVouchers } from "../../redux/action/voucher";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, } from "@mui/material";
import { DeleteOutline, OpenInNewOutlined } from "@mui/icons-material";
import View from "./View";
import Topbar from "./Topbar";
import DeleteModal from "./DeleteModal";


function Vouchers() {

  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch()
  const { vouchers, isFetching, error } = useSelector(state => state.voucher)

  const columns = [
    { field: "id", headerName: "Voucher No.", width: 150 },
    { field: "issuingDate", headerName: "Issue Date", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    { field: "cnic", headerName: "CNIC", width: 150 },
    { field: "type", headerName: "Payment Type", width: 200 },
    { field: "total", headerName: "Total Amount", width: 150 },
    { field: "paid", headerName: "Amount Paid", width: 150 },
    { field: "remained", headerName: "Amount Remaining", width: 200 },
    {
      headerName: "Status", width: 150, renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Chip
            label="Approved"
            style={{ backgroundColor: vouchers.id % 2 == 0 ? "red" : "green", color: "white" }}
          />
        </div>
      ),
    },
    {
      field: "action", headerName: "Action", width: 120, renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Tooltip placement="top" title="Delete">
            <IconButton onClick={() => { setOpenDeleteModal(true); setSelectedVoucherId(params.row._id) }} className="hover:text-red-500">
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="View">
            <IconButton onClick={() => setOpenViewModal(true)} className="hover:text-red-500">
              <OpenInNewOutlined />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];


  //////////////////////////////////////// STATES ///////////////////////////////////////
  const [openViewModal, setOpenViewModal] = useState(false)
  const [selectedVoucherId, setSelectedVoucherId] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  //////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getVouchers())
  }, [])

  //////////////////////////////////////// FUNCTIONS ////////////////////////////////////

  return (
    <div className="h-full w-full float-left pb-28">

      <View open={openViewModal} setOpen={setOpenViewModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} voucherId={selectedVoucherId} />

      <Topbar />
      <Table
        rows={vouchers}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />

    </div>
  );
}

export default Vouchers;
