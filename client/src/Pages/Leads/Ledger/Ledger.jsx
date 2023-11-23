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
  const location = useLocation();
  const dispatch = useDispatch();
  const { leadId } = useParams();
  const { currentLead: lead } = useSelector((state) => state.lead);
  const {
    sales,
    isFetching: salesFetching,
    error: salesError,
  } = useSelector((state) => state.sale);
  const {
    cashbooks,
    isFetching: cashbookFetching,
    error: cashbookError,
  } = useSelector((state) => state.cashbook);

  const SalesColumns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (params) => {
        <div className="font-primary">{params.row.uid}</div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <Tooltip >
          <div className="font-primary capitalize">{params.row.staff}</div>
        </Tooltip>;
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
        <div className="font-primary">{params.row.top}</div>;
      },
    },
  ];

  const LedgerColumns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (params) => {
        <div className="font-primary">{params.row.uid}</div>;
      },
    },
    {
      field: "staff",
      headerName: "Staff",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => {
        <div className="font-primary capitalize">{params.row.staff}</div>;
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
        <div className="font-primary">{params.row.remarks}</div>;
      },
    },
    {
      field: "top",
      headerName: "Type of Payment",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => {
        <div style={{ fontFamily: "'Montserrat', sans-serif", textTransform: "capitalize" }}>{params.row.top}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => {
        <div style={{ fontFamily: "'Montserrat', sans-serif", textTransform: "capitalize" }}>{params.row.amount}</div>;
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
    lead?._id && dispatch(getLeadSales(lead?._id));
    lead?._id && dispatch(getLeadCashbooks(lead?._id));
  }, [lead]);
  useEffect(() => {
    dispatch(getLead(leadId));
  }, [leadId]);

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////

  return (
    <div className="w-full font-primary">
      <LedgerTopbar />
      <Table
        rows={cashbooks}
        isFetching={cashbookFetching}
        columns={LedgerColumns}
        rowsPerPage={10}
      />

      <LedgerSalesTopbar />
      <Table rows={sales} isFetching={salesFetching} columns={SalesColumns} rowsPerPage={10} />
    </div>
  );
};

export default Ledger;
