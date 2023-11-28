import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Cards from "./Cards";
import { Table } from "../../Components";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getCashbooks,getEmployeeCashbooks } from "../../redux/action/cashbook";
import DeleteModal from "./DeleteModal";
import { format } from "timeago.js";
import { PiTrashLight, PiTrashThin } from "react-icons/pi";

function CashBook() {
  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { cashbooks, isFetching, error } = useSelector((state) => state.cashbook);
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
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => (
        <div className="font-primary capitalize px-8">{params.row.clientName}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{new Date(params.row.createdAt).toLocaleDateString()}</div>,
    },
    {
      field: "top",
      headerName: "Type",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="font-primary capitalize">{params.row.top}</div>
      ),
    },
    {
      field: "remarks",
      headerName: "Payment details",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => <div className="font-primary">{params.row.remarks}</div>,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => <div className="font-primary">{params.row.amount}</div>,
    },
    // {
    //   field: "branch",
    //   headerName: "Branch",
    //   headerClassName: "super-app-theme--header",
    //   width: 190,
    //   renderCell: (params) => <div className="font-primary">{params.row.branch}</div>,
    // },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          {
            loggedUser?.role != 'employee' &&
            <Tooltip arrow placement="top" title="Delete">
              <PiTrashThin onClick={() => handleOpenDeleteModal(params.row._id)} className="text-red-500 text-[23px] cursor-pointer" />
            </Tooltip>
          }
        </div>
      ),
    },
  ];
  const cashbooksIn = cashbooks.filter(cashbook => cashbook.type == 'in')
  const cashbooksOut = cashbooks.filter(cashbook => cashbook.type == 'out')

  ///////////////////////////////////// STATES //////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cashbookId, setCashbookId] = useState("");

  ///////////////////////////////////// USE EFFECTS //////////////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeCashbooks())
      :
      dispatch(getCashbooks());
  }, []);

  ///////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleOpenDeleteModal = (cId) => {
    setCashbookId(cId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="h-auto w-full font-primary">
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} cashbookId={cashbookId} />

      <Topbar />

      <div className="mt-10">
        <Cards />
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <div className="flex justify-center text-3xl mb-4 font-primary text-gray-600 mt-5">
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
          <div className="flex justify-center text-3xl mb-4 font-primary text-gray-600 mt-5">
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
