import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Cards from "./Cards";
import { Table } from "../../Components";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getCashbooks } from "../../redux/action/cashbook";
import DeleteModal from "./DeleteModal";
import { format } from "timeago.js";
import { PiTrashLight, PiTrashThin } from "react-icons/pi";

function CashBook() {
  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { cashbooksIn, cashbooksOut, isFetching, error } = useSelector((state) => state.cashbook);
  const columns = [
    { field: "_id", headerName: "ID", headerClassName: "super-app-theme--header", width: 100, renderCell: (params) => <div className="font-primary">{params.row._id}</div> },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => <div className="font-primary capitalize px-8">{params.row.customerName}</div>,
    },
    {
      field: "createdAt",
      headerName: "Time",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{format(params.row.createdAt)}</div>,
    },
    {
      field: "paymentType",
      headerName: "Type",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => <div className="font-primary capitalize">{params.row.paymentType}</div>,
    },
    {
      field: "paymentDetail",
      headerName: "Payment details",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => <div className="font-primary">{params.row.paymentDetail}</div>,
    },
    {
      field: "amountPaid",
      headerName: "Amount In",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary">{params.row.amountPaid}</div>,
    },
    {
      field: "branch",
      headerName: "Branch",
      headerClassName: "super-app-theme--header",
      width: 190,
      renderCell: (params) => <div className="font-primary">{params.row.branch}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Tooltip arrow placement="top" title="Delete">
              <PiTrashThin onClick={()=>handleOpenDeleteModal(params.row._id)} className="text-red-500 text-[23px] cursor-pointer" />
          </Tooltip>
        </div>
      ),
    },
  ];

  ///////////////////////////////////// STATES //////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cashbookId, setCashbookId] = useState("");

  ///////////////////////////////////// USE EFFECTS //////////////////////////////////////
  useEffect(() => {
    dispatch(getCashbooks("out"));
    dispatch(getCashbooks("in"));
  }, []);

  ///////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleOpenDeleteModal = (cId) => {
    setCashbookId(cId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="h-auto w-full ">
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} cashbookId={cashbookId} />

      <Topbar />

      <div className="mt-10">
        <Cards />
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <div className="flex justify-center text-3xl mb-4 font-Mulish text-gray-600 mt-5">
            <h3>Amounts In</h3>
          </div>
          <Table
            rows={cashbooksIn}
            columns={columns}
            rowsPerPage={10}
            isFetching={isFetching}
            error={error}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center text-3xl mb-4 font-Mulish text-gray-600 mt-5">
            <h3>Amounts Out</h3>
          </div>
          <Table
            rows={cashbooksOut}
            columns={columns}
            rowsPerPage={10}
            isFetching={isFetching}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default CashBook;
