import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Add, DeleteOutline, FilterAltOutlined, KeyboardArrowRight, Search, TrendingUp, } from "@mui/icons-material";
import Cards from "./Cards";
import { Table } from "../../Components";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from 'react-redux'
import { getCashbooks } from '../../redux/action/cashbook'
import DeleteModal from "./DeleteModal";
import { format } from "timeago.js";

function CashBook() {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch()
  const { cashbooksIn, cashbooksOut, isFetching, error } = useSelector(state => state.cashbook)
  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "customerName", headerName: "Customer Name", width: 140 },
    {
      field: "createdAt", headerName: "Time", width: 120, renderCell: (params) => (
        <>{format(params.row.createdAt)}</>
      )
    },
    { field: "paymentType", headerName: "Type", width: 120 },
    { field: "paymentDetail", headerName: "Payment details", width: 250 },
    { field: "amountPaid", headerName: "Amount In", width: 140 },
    { field: "branchNumber", headerName: "Branch", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: () => (
        <div className="flex gap-[4px] ">
          <Tooltip placement="top" title="Delete">
            <IconButton onClick={handleOpenDeleteModal} className="hover:text-red-500">
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  ///////////////////////////////////// STATES //////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [cashbookId, setCashbookId] = useState('')

  ///////////////////////////////////// USE EFFECTS //////////////////////////////////////
  useEffect(() => {
    dispatch(getCashbooks('out'))
    dispatch(getCashbooks('in'))
  }, [])

  ///////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleOpenDeleteModal = (cId) => {
    setOpenDeleteModal(true);
    setCashbookId(cId)
  }



  return (
    <div className="h-auto">

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
            rowsPerPage={5}
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
            rowsPerPage={5}
            isFetching={isFetching}
            error={error}
          />
        </div>
      </div>


      <div className="flex justify-center mt-5 pb-5">
        <Button variant="contained" color="error">
          Close Today's Cashbook
        </Button>
      </div>



    </div>
  );
}

export default CashBook;
