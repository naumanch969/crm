import React from "react";
import LedgerTopbar from "./LedgerTopbar";
import { Table } from "../../../Components";
import { format } from "timeago.js";
import LedgerSalesTopbar from "./LedgerSalesTopbar";
import { Tooltip } from "@mui/material";
import { PiDownloadSimpleLight, PiTrashLight } from "react-icons/pi";

const Ledger = () => {
  /////////////////////////////////////////// VARIABLES ////////////////////////////////////////////

  const SalesColumns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 65,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },

    {
      field: "netWorth",
      headerName: "Net Worth",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "amountRecieved",
      headerName: "Amount Recieved",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "profit",
      headerName: "Profit",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "top",
      headerName: "Type of Payment",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <>
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
          <Tooltip placement="top" title="Download">
            {" "}
            <PiDownloadSimpleLight className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
        </>;
      },
    },
  ];

  const LedgerColumns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 65,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },

    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 300,
      renderCell: (params) => {
        <Tooltip title="">
          <div className="font-primary"></div>;
        </Tooltip>;
      },
    },
    {
      field: "top",
      headerName: "Type of Payment",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "AmountIn",
      headerName: "Amount In",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "AmountOut",
      headerName: "Amount Out",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => {
        <div className="font-primary"></div>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 110,
      renderCell: (params) => {
        <>
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
          <Tooltip placement="top" title="Download">
            {" "}
            <PiDownloadSimpleLight className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
        </>;
      },
    },
  ];

  const SalesRows = [
    {
      _id: "1",
      staff: "User",
      CustomerName: "User1",
      netWorth: "1000",
      amountRecieved: "1000",
      profit: "0",
      top: "Cash",
      actions: "",
    }
  ];

  const LedgerRows = [
    {
      _id: "1",
      staff: "User",
      CustomerName: "User1",
      remarks: "No Remarks",
      top: "Cash",
      AmountIn: "1000",
      AmountOut: "0",
      actions: "",
    },
  ];

  /////////////////////////////////////////// STATES ////////////////////////////////////////////

  /////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////

  return (
    <div className="w-full">
      <LedgerTopbar />
      <Table rows={LedgerRows} columns={LedgerColumns} rowsPerPage={5} />

      <LedgerSalesTopbar />
      <Table rows={SalesRows} columns={SalesColumns} rowsPerPage={5} />
    </div>
  );
};

export default Ledger;
