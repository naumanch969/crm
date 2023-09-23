import { useEffect } from "react";
import LedgerTopbar from "./LedgerTopbar";
import { Table } from "../../../Components";
import { format } from "timeago.js";
import LedgerSalesTopbar from "./LedgerSalesTopbar";
import { Tooltip } from "@mui/material";
import { PiDownloadSimpleLight, PiTrashLight } from "react-icons/pi";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLeadSales } from "../../../redux/action/sale";
import { getLeadCashbooks } from "../../../redux/action/cashbook";
import { getLead } from "../../../redux/action/lead";

const Ledger = () => {
  /////////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const location = useLocation()
  const dispatch = useDispatch()
  const { leadId } = useParams()
  const { currentLead: lead } = useSelector(state => state.lead)
  const { sales, isFetching: salesFetching, error: salesError } = useSelector(state => state.sale)
  const { cashbooks, isFetching: cashbookFetching, error: cashbookError } = useSelector(state => state.cashbook)

  const SalesColumns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 65,
      renderCell: (params) => {
        <div className="font-primary">{params.row._id}</div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <div className="font-primary">{params.row.staff}</div>;
      },
    },
    {
      field: "clientName",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary">{params.row.clientName}</div>;
      },
    },

    {
      field: "net",
      headerName: "Net Worth",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary">{params.row.net}</div>;
      },
    },
    {
      field: "received",
      headerName: "Amount Recieved",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => {
        <div className="font-primary">{params.row.received}</div>;
      },
    },
    {
      field: "net",
      headerName: "Profit",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary">{params.row.net - params.row.received}</div>;
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
  ];

  const LedgerColumns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 65,
      renderCell: (params) => {
        <div className="font-primary">{params.row._id}</div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <div className="font-primary">{params.row.staff}</div>;
      },
    },
    {
      field: "clientName",
      headerName: "Customer Name",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary">{params.row.clientName}</div>;
      },
    },

    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 300,
      renderCell: (params) => {
        <Tooltip title="">
          <div className="font-primary">{params.row.remarks}</div>;
        </Tooltip>;
      },
    },
    {
      field: "top",
      headerName: "Type of Payment",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div className="font-primary">{params.row.top}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div className="font-primary">{params.row.amount}</div>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => {
        <div className="font-primary">{params.row.type}</div>;
      },
    },
  ];
  /////////////////////////////////////////// STATES ////////////////////////////////////////////

  /////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////
  useEffect(() => {
    lead._id && dispatch(getLeadSales(lead?._id))
    lead._id && dispatch(getLeadCashbooks(lead?._id))
  }, [lead])
  useEffect(() => {
    dispatch(getLead(leadId))
  }, [leadId])

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////

  return (
    <div className="w-full">
      <LedgerTopbar />
      <Table
        rows={cashbooks}
        columns={LedgerColumns}
        rowsPerPage={5}
        isFetching={cashbookFetching}
        error={cashbookError}
      />

      <LedgerSalesTopbar />
      <Table
        rows={sales}
        columns={SalesColumns}
        rowsPerPage={5}
        isFetching={salesFetching}
        error={salesError}
      />
    </div>
  );
};

export default Ledger;
