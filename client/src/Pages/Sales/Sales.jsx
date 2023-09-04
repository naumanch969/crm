import React, { useEffect, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/action/sale";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

function Sales() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { sales, isFetching, error } = useSelector((state) => state.sale);
  const columns = [
    {
      field: "invoiceNumber",
      headerClassName: "super-app-theme--header",
      headerName: "Inv No.",
      width: 150,
    },
    {
      field: "createdAt",
      headerClassName: "super-app-theme--header",
      headerName: "Created At",
      width: 180,
      renderCell: (params) => <div>{new Date(params.row.createdAt).toLocaleDateString()}</div>,
    },
    {
      field: "supplierName",
      headerClassName: "super-app-theme--header",
      headerName: "Supplier",
      width: 150,
    },
    {
      field: "net",
      headerClassName: "super-app-theme--header",
      headerName: "Net Worth",
      width: 120,
    },
    {
      field: "received",
      headerClassName: "super-app-theme--header",
      headerName: "Amount Received",
      width: 180,
    },
    { field: "psf", headerClassName: "super-app-theme--header", headerName: "PSF", width: 130 },
    { field: "fop", headerClassName: "super-app-theme--header", headerName: "FOP", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          <div>
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight onClick={() => handleOpenDeleteModal(params.row._id)} className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
          </div>
          <Tooltip placement="top" title="View">
            {" "}
            <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
          </Tooltip>
          <Tooltip placement="top" title="Edit">
            {" "}
            <CiEdit onClick={() => handleOpenEditModal(params.row)} className="cursor-pointer text-green-500 text-[23px] hover:text-green-600" />
          </Tooltip>
        </div>
      ),
    },
    
  ];
  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState("table");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getSales());
  }, []);

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenEditModal = (sale) => {
    setOpenEditModal(true);
    dispatch(getSaleReducer(sale));
  };
  const handleOpenDeleteModal = (saleId) => {
    setOpenDeleteModal(true);
    setSelectedSaleId(saleId);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} saleId={selectedSaleId} />

      <Topbar view={view} setView={setView} />
      <Table rows={sales} columns={columns} rowsPerPage={5} isFetching={isFetching} error={error} />
    </div>
  );
}

export default Sales;
