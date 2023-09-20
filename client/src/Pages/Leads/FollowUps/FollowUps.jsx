import React from "react";
import Topbar from "./Topbar";
import { Table } from "../../../Components";
import { getFollowUps } from "../../../redux/action/followUp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "timeago.js";

const FollowUps = () => {

  /////////////////////////////////////////// VARIABLES //////////////////////////////////////////// 
  const { followUps, error, isFetching } = useSelector(state => state.followUp)
  const { leadId } = useParams()
  const dispatch = useDispatch()

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => <div className="font-primary font-light">{params.row._id}</div>,
    },
    {
      field: "status",
      headerName: "Current Status",
      headerClassName: "super-app-theme--header",
      width: 300,
      renderCell: (params) => <div className="font-primary font-light">{params.row.status}</div>,
    },
    {
      field: "followUpDate",
      headerName: "Next Follow Up Date",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{params.row.followUpDate}</div>,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 450,
      renderCell: (params) => <div className="font-primary font-light">{params.row.remarks}</div>,
    },
    {
      field: "createdat",
      headerName: "Created At",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">{format(params.row.createdAt)}</div>,
    },
  ];


  /////////////////////////////////////////// STATES //////////////////////////////////////////// 


  /////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////// 
  useEffect(() => {
    dispatch(getFollowUps(leadId))
  }, [])

  /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////// 


  return (
    <div>
      <Topbar />
      <Table
        rows={followUps}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
};

export default FollowUps;
