import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteApproval, getApprovals } from "../../../redux/action/approval";
import { getApprovalReducer } from "../../../redux/reducer/approval";
import { rejectRefundApproval } from "../../../redux/action/approval";
import { createCashbook } from "../../../redux/action/cashbook";
import { register } from "../../../redux/action/user";
import { format } from "timeago.js";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import EnterPassword from "./EnterPassword";

function RequestApprovals() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { refundApprovals: approvals, isFetching, error } = useSelector((state) => state.approval);
  const { error: cashbookError, isFetching: cashbookIsFetching } = useSelector((state) => state.cashbook);
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.uid}</span>
        </Tooltip>
      ),
    },
    {
      field: "data.amount",
      headerName: "Amount",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{params.row.data.amount}</span>
      ),
    },
    {
      field: "data.branch",
      headerName: "Branch",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{params.row.data.branch}</span>
      ),
    },
    {
      field: "data.reason",
      headerName: "Reason",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{params.row.data.reason}</span>
      ),
    },
    {
      field: "data.clientName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 180,
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">
          {params.row.data.clientName}
        </span>
      ),
    },
    {
      field: "data.cnic",
      headerName: "cnic",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{params.row.data.cnic}</span>
      ),
    },
    {
      field: "data.phone",
      headerName: "Phone",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{params.row.data.phone}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="cursor-pointer text-gray-600 font-primary">{format(params.row.createdAt)}</span>
      ),
    },
    {
      field: "approve/reject",
      headerName: "Approve/Reject",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <button
            onClick={() => { setSelectedRefund(params.row); setOpenEnterPassword(true); setRefundType('approve') }}
            className="cursor-pointer bg-green-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ">
            Approve
          </button>
          <button
            onClick={() => { setSelectedRefund(params.row); setOpenEnterPassword(true); setRefundType('reject') }}
            className="cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ">
            Reject
          </button>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [selectedRefund, setSelectedRefund] = useState('')
  const [openEnterPassword, setOpenEnterPassword] = useState(false)
  const [refundType, setRefundType] = useState('') // approve/reject

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getApprovals("refund"));
  }, []);

  ////////////////////////////////////// FUNCTION //////////////////////////////





  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[2rem] font-primary">
      <EnterPassword open={openEnterPassword} setOpen={setOpenEnterPassword} approval={selectedRefund} type={refundType} />

      {error && <></>}
      <Topbar />
      <Table
        rows={approvals}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching || cashbookIsFetching}
        error={error || cashbookError}
      />
    </div>
  );
}

export default RequestApprovals;
