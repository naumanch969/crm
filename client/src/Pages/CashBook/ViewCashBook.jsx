import { DeleteOutline, FormatAlignCenter, KeyboardArrowRight } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Table } from '../../Components'
import { getSpecificDateCashbook } from '../../redux/action/cashbook'
import DeleteModal from "./DeleteModal";
import Topbar from "./Topbar";
import { format } from 'timeago.js'

const ViewCashBook = () => {

  ////////////////////////////////////// VARIABLES /////////////////////////////////////
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

  ////////////////////////////////////// STATES ///////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [cashbookId, setCashbookId] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())

  ////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getSpecificDateCashbook(selectedDate))
  }, [])

  ////////////////////////////////////// FUCNTIONS ///////////////////////////////////////
  const handleOpenDeleteModal = (cId) => {
    setOpenDeleteModal(true);
    setCashbookId(cId)
  }
  const handleGetCashbook = () => {
    dispatch(getSpecificDateCashbook(selectedDate))
  }


  return (
    <div className="w-full h-full">

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} cashbookId={cashbookId} />



      <Topbar />

      <div className="w-full h-44 bg-white rounded-md mt-10 pt-px shadow-md">
        <div className="m-5">
          <div className="flex justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select Date" onChange={(date) => setSelectedDate(date.$d)} />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="mt-6 flex justify-center">
            <Button onClick={handleGetCashbook} className="w-80" variant="contained" color="primary">
              View This Date's CashBook
            </Button>
          </div>
        </div>
      </div>


      {/* Cashbook Tables */}
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


    </div>
  );
};

export default ViewCashBook;
