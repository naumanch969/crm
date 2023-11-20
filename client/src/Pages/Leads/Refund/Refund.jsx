import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLead } from "../../../redux/action/lead";
import { createRefundApproval } from "../../../redux/action/approval";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../utils";
import Topbar from "./Topbar";
import { Table } from "../../../Components";
import { Tooltip } from "@mui/material";
import { format } from "timeago.js";
import { getLeadRefunds } from "../../../redux/action/refund";
import { PiTrashLight } from "react-icons/pi";
import DeleteModal from "./DeleteModal";

const Refund = () => {

  /////////////////////////////////////////// VARIABLES //////////////////////////////////////////// 
  const { refunds, error, isFetching } = useSelector(state => state.refund)
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
      field: "actions",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          <Tooltip placement="top" title="Delete">
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row?._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  /////////////////////////////////////////// STATES //////////////////////////////////////////// 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRefundId, setSelectedRefundId] = useState(null);


  /////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////// 
  useEffect(() => {
    dispatch(getLeadRefunds(leadId))
    dispatch(getLead(leadId))
  }, [leadId])

  /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////// 
  const handleOpenDeleteModal = (refundId) => {
    setOpenDeleteModal(true);
    setSelectedRefundId(refundId);
  };

  return (
    <div className="w-full " >
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} refundId={selectedRefundId} />
      <Topbar />
      <Table
        rows={refunds}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Refund;
