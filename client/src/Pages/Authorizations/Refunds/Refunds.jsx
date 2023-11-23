import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteApproval } from "../../../redux/action/approval";
import { getApprovalReducer } from "../../../redux/reducer/approval";
import { rejectRefundApproval } from "../../../redux/action/approval";
import { createCashbook } from "../../../redux/action/cashbook";
import { register } from "../../../redux/action/user";
import { format } from "timeago.js";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import EnterPassword from "./EnterPassword";
import { getRefunds } from "../../../redux/action/refund";
import { getRefundsReducer } from "../../../redux/reducer/refund";

function RefundApprovals() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { refunds, allRefunds, isFetching, error } = useSelector(state => state.refund);
  const { error: cashbookError, isFetching: cashbookIsFetching } = useSelector(state => state.cashbook);
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 80,
      renderCell: (params) => <div className="font-primary font-light">{params.row.uid}</div>,
    },
    {
      field: "createdAt",
      headerName: "Issuing Date",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary font-light">{format(params.row.createdAt)}</div>,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary font-light">{params.row.amount}</div>,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => <div className="font-primary font-light">{params.row.clientName}</div>,
    },
    {
      field: "branch",
      headerName: "Branch",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => <div className="font-primary font-light">{params.row.branch}</div>,
    },
    {
      field: "CNIC",
      headerName: "CNIC",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => <div className="font-primary font-light">{params.row.CNIC}</div>,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => <div className="font-primary font-light">{params.row.phone}</div>,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => <div className={`font-primary font-light border-[1px] p-2 rounded-[3rem]
      ${params.row.status == 'accepted' && 'border-green-400 text-green-400'}
      ${params.row.status == 'rejected' && 'border-red-400 text-red-400'}
      ${params.row.status == 'underProcess' && 'border-amber-400 text-amber-400'}
      `}>{params.row.status}</div>,
    },
    {
      field: "reason",
      headerName: "Reason",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => <Tooltip title={params.row.reason}><div className="font-primary font-light">{params.row.reason}</div></Tooltip>,
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
  const [isFiltered, setIsFiltered] = useState(false)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getRefunds());
  }, []);
  useEffect(() => {
    if (!isFiltered) {
      dispatch(getRefundsReducer(allRefunds))
    }
  }, [isFiltered])

  ////////////////////////////////////// FUNCTION //////////////////////////////



  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[2rem] font-primary">
      <EnterPassword open={openEnterPassword} setOpen={setOpenEnterPassword} refund={selectedRefund} type={refundType} />

      <Topbar isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      <Table
        rows={refunds}
        columns={columns}
        rowsPerPage={10}
        isFetching={isFetching || cashbookIsFetching}
        error={error || cashbookError}
      />
    </div>
  );
}

export default RefundApprovals;
