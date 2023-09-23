import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLead } from "../../../redux/action/lead";
import { createRefundApproval, getApprovals } from "../../../redux/action/approval";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../utils";
import Topbar from "./Topbar";
import { Table } from "../../../Components";
import { Tooltip } from "@mui/material";

const Refund = () => {

  /////////////////////////////////////////// VARIABLES //////////////////////////////////////////// 
  const { refundApprovals, error, isFetching } = useSelector(state => state.approval)
  const { leadId } = useParams()
  const dispatch = useDispatch()

  const columns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 80,
      renderCell: (params) => <div className="font-primary font-light">{params.row.uid}</div>,
    },
    {
      field: "data.issuingDate",
      headerName: "Issuing Date",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary font-light">{params.row.data?.issuingDate}</div>,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary font-light">{params.row.amount}</div>,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => <div className="font-primary font-light">{params.row.customerName}</div>,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => <div className="font-primary font-light">{params.row.cnic}</div>,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => <div className="font-primary font-light">{params.row.phone}</div>,
    },
    {
      field: "reason",
      headerName: "Reason",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => <Tooltip title={params.row.reason}><div className="font-primary font-light">{params.row.reason}</div></Tooltip>,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => <div className="font-primary font-light border-[1px] border-amber-400 text-amber-400 p-2">Pending</div>,
    },
  ];

  /////////////////////////////////////////// STATES //////////////////////////////////////////// 


  /////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////// 
  useEffect(() => {
    dispatch(getApprovals('refund', leadId))
  }, [])

  /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////// 


  return (
    <div className="w-full " >
      <Topbar />
      <Table
        rows={refundApprovals}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Refund;
