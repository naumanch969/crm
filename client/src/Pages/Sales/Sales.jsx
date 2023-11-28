import React, { useEffect, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getSales, getEmployeeSales } from "../../redux/action/sale";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import FilterDrawer from "./Filter";
import { getSaleReducer, getSalesReducer } from "../../redux/reducer/sale";
import moment from "moment";

function Sales() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { sales, allSales, isFetching, error } = useSelector((state) => state.sale);
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
      headerClassName: "super-app-theme--header",
      headerName: "Client Name",
      width: 150,
      renderCell: (params) => (
        <div className="font-primary capitalize">{params.row.clientName}</div>
      ),
    },
    {
      field: "profit",
      headerClassName: "super-app-theme--header",
      headerName: "Profit",
      width: 150,
      renderCell: (params) => <div className="font-primary">{params.row.net - params.row.received}</div>,
    },
    {
      field: "createdAt",
      headerClassName: "super-app-theme--header",
      headerName: "Created At",
      width: 150,
      renderCell: (params) => (
        <div className="font-primary">{moment(params.row?.createdAt).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      field: "net",
      headerClassName: "super-app-theme--header",
      headerName: "Net Worth",
      width: 140,
      renderCell: (params) => <div className="font-primary">{(params.row.net).toLocaleString()}</div>,
    },
    {
      field: "received",
      headerClassName: "super-app-theme--header",
      headerName: "Amount Received",
      width: 200,
      renderCell: (params) => <div className="font-primary">{params.row.received}</div>,
    },

    {
      field: "top",
      headerClassName: "super-app-theme--header",
      headerName: "Type of Payment",
      width: 200,
      renderCell: (params) => <div className="font-primary">{params.row.top}</div>,
    },
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
              <PiTrashLight
                onClick={() => handleOpenDeleteModal(params.row._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          </div>
          <Tooltip placement="top" title="Edit">
            {" "}
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
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
  const [openFilters, setOpenFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeSales())
      :
      dispatch(getSales())
  }, []);
  useEffect(() => {
    if (!isFiltered) {
      dispatch(getSalesReducer(allSales))
    }
  }, [isFiltered])

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
      <FilterDrawer open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
      <Topbar view={view} setView={setView} open={openFilters} setOpen={setOpenFilters} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />

      <Table rows={sales} columns={columns} rowsPerPage={10} isFetching={isFetching} error={error} />
    </div>
  );
}

export default Sales;
