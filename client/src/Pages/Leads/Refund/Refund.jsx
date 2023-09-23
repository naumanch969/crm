import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLead } from "../../../redux/action/lead";
import { createRefundApproval, getApprovals } from "../../../redux/action/approval";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../utils";
import Topbar from "./Topbar";
import { Table } from "../../../Components";

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
      width: 100,
      renderCell: (params) => <div className="font-primary font-light">{params.row.uid}</div>,
    },
    {
      field: "data.issuingDate",
      headerName: "Issuing Date",
      headerClassName: "super-app-theme--header",
      width: 300,
      renderCell: (params) => <div className="font-primary font-light">{params.row.data?.issuingDate}</div>,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.amount}</div>,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.customerName}</div>,
    },
    {
      field: "cnic",
      headerName: "CNIC",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.cnic}</div>,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.phone}</div>,
    },
    {
      field: "reason",
      headerName: "Reason",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => <div className="font-primary font-light">{params.row.reason}</div>,
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
