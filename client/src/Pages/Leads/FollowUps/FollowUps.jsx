import React from "react";
import Topbar from "./Topbar";
import { Table } from "../../../Components";

const FollowUps = () => {
  const columns = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "super-app-theme--header",
        width: 100,
        renderCell: (params) => <div className="font-primary font-light">ID</div>,
      },
    {
      field: "currentStatus",
      headerName: "Current Status",
      headerClassName: "super-app-theme--header",
      width: 300,
      renderCell: (params) => <div className="font-primary font-light">Status</div>,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      width: 450,
      renderCell: (params) => <div className="font-primary font-light">Remarks</div>,
    },
    {
      field: "createdat",
      headerName: "Created At",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">Created At</div>,
    },
    {
      field: "NextFollowUpDate",
      headerName: "Next Follow Up Date",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary font-light">Next Follow Up Date</div>,
    },
  ];

  const rows = [
    {
      id: 1,
      currentStatus: "Status",
      remarks: "Remarks",
      createdat: "Created At",
      NextFollowUpDate: "Next Follow Up Date",
    },
    {
      id: 2,
      currentStatus: "Status",
      remarks: "Remarks",
      createdat: "Created At",
      NextFollowUpDate: "Next Follow Up Date",
    },
  ];

  return (
    <div>
      <Topbar />
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default FollowUps;
