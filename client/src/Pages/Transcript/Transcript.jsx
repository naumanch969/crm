import React, { useEffect } from "react";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { getTranscripts } from "../../redux/action/transcript";
import Table from "../../Components/Table/Table";
import { PiDownloadSimpleLight, PiTrashLight } from "react-icons/pi";
import DeleteTranscript from "./DeleteTranscript";
import { useNavigate } from "react-router-dom";
import { getTranscriptReducer } from "../../redux/reducer/transcript";

const Transcript = () => {
  //////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transcripts, isFetching, error } = useSelector((state) => state.transcript);

  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.uid}</span>
        </Tooltip>
      ),
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.employeeName}</span>
        </Tooltip>
      ),
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.designation}</span>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.phone}</span>
        </Tooltip>
      ),
    },
    {
      field: "totalSalary",
      headerName: "Total Salary",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">Rs. {params.row?.totalSalary}</span>
        </Tooltip>
      ),
    },
    {
      field: "salaryMonth",
      headerName: "Salary Month",
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.salaryMonth}</span>
        </Tooltip>
      ),
    },
    {
      field: "netSalary",
      headerName: "Net Salary",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">Rs. {params.row?.netSalary}</span>
        </Tooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex items-center gap-4">
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row?._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
          <Tooltip placement="top" title="Download">
            <PiDownloadSimpleLight
              onClick={() => handleDownload(params.row)}
              className="hover:text-green-700 text-green-500 cursor-pointer text-[23px]"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  //////////////////////////////// USE STATE /////////////////////////////////
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  ///////////////////////////////// USE EFFECT ////////////////////////////////

  useEffect(() => {
    dispatch(getTranscripts());
  }, []);

  //////////////////////////////// FUNCTIONS /////////////////////////////////

  const handleOpenDeleteModal = (transcriptId) => {
    setSelectedRowId(transcriptId);
    setOpenDeleteModal(true);
  };

  const handleDownload = (transcript) => {
    dispatch(getTranscriptReducer(transcript))
    navigate("/download/transcript");
  };

  return (
    <div className="w-full">
      <DeleteTranscript
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        transcriptId={selectedRowId}
      />
      <Topbar />

      <Table
        rows={transcripts}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Transcript;
