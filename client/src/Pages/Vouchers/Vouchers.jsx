import { Add, KeyboardArrowRight, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "../../Components";
import { getVouchers,getEmployeeVouchers } from "../../redux/action/voucher";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Tooltip,
} from "@mui/material";
import { DeleteOutline, OpenInNewOutlined } from "@mui/icons-material";
import View from "./View";
import Topbar from "./Topbar";
import DeleteModal from "./DeleteModal";
import { PiDownloadSimpleLight, PiTrashLight } from "react-icons/pi";

function Vouchers() {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vouchers, isFetching, error } = useSelector((state) => state.voucher);
  const { loggedUser } = useSelector((state) => state.user);

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
      field: "clientName",
      headerName: "Customer Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="capitalize font-primary">
          <p>{params.row.clientName}</p>
        </div>
      ),
    },
    {
      field: "CNIC",
      headerName: "CNIC",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.CNIC}</div>,
    },
    {
      field: "issuingDate",
      headerName: "Issue Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.issuingDate}</div>,
    },
    {
      field: "type",
      headerName: "Payment Type",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary capitalize">{params.row.type}</div>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary capitalize">{params.row?.status}</div>,
    },
    {
      field: "paid",
      headerName: "Amount Paid",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.paid}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          {loggedUser?.role != "employee" && (
            <Tooltip placement="top" title="Delete">
              <IconButton
                onClick={() => {
                  setOpenDeleteModal(true);
                  setSelectedVoucherId(params.row._id);
                }}
                className="hover:text-red-500">
                <PiTrashLight className="text-red-500" />
              </IconButton>
            </Tooltip>
          )}
          {params.row.status == "accepted" && (
            <Tooltip placement="top" title="Download">
              <IconButton onClick={() => handleDownload(params.row)} className="hover:text-red-500">
                <PiDownloadSimpleLight className="text-green-500" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  //////////////////////////////////////// STATES ///////////////////////////////////////
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee' ? dispatch(getEmployeeVouchers()) : dispatch(getVouchers())
  }, []);

  //////////////////////////////////////// FUNCTIONS ////////////////////////////////////
  const handleDownload = (voucher) => {
    navigate("/download/voucher", { 
      state: { voucher },
    });
  };

  return (
    <div className="h-full w-full float-left pb-28">
      <View open={openViewModal} setOpen={setOpenViewModal} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        voucherId={selectedVoucherId}
      />

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
