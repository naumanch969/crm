import React, { useEffect } from "react";
import { Box, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Loader } from "../utils";
import Snackbar from "@mui/material/Snackbar";
import { IoOpenOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getLeadByPhone } from "../redux/action/lead";
import { format } from "timeago.js";
import ViewAttachments from "./ViewAttachments";
import { Empty } from "../Components";

const ClientLeads = () => {
  /////////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const { leads, isFetching, error } = useSelector((state) => state.lead);

  const { loggedUser } = useSelector((state) => state.user);
  const phoneNumber = loggedUser?.phone;

  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.row?.uid}>
          <div className="font-primary font-light capitalize">{params.row?.uid}</div>
        </Tooltip>
      ),
    },
    {
      field: "allocatedTo?.firstName",
      headerName: "Employee Name",
      width: 190,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.row?.allocatedTo[0]?.firstName}>
          <div className="font-primary font-light capitalize">{params.row?.allocatedTo[0]?.firstName}</div>
        </Tooltip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={format(params.row?.createdAt)}>
          <div className="font-primary font-light capitalize">{format(params.row?.createdAt)}</div>
        </Tooltip>
      ),
    },
    {
      field: "leads?.degree",
      headerName: "Property City",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.row?.property?.city}>
          <div className="font-primary font-light capitalize">{params.row?.property?.city}</div>
        </Tooltip>
      ),
    },
    {
      field: "major",
      headerName: "Title",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow placement="bottom" title={params.row?.property?.title}>
          <div className="font-primary font-light capitalize">{params.row?.property?.title}</div>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize font-primary font-medium`}>
          {params.row?.status}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div>
          <Tooltip placement="bottom" arrow title="View Attachments">
            <div onClick={() => handleOpenAttachments(params.row?._id)} className="cursor-pointer">
              <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  /////////////////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////////////
  const [searchValue, setSearchValue] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  /////////////////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getLeadByPhone(phoneNumber));
  }, []);

  /////////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleOpenAttachments = (leadId) => {
    setSelectedLeadId(leadId);
    setOpenAttachments(true);
  };


  /////////////////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////////
  return (
    <div className="w-full">
      {isFetching && (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      )}
      {error && (
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={error ? handleClick({ vertical: "bottom", horizontal: "right" }) : error}
            onClose={handleClose}
            message={error == "Request failed with status code 400" ? "No Lead Found" : error}
            key={vertical + horizontal}
          />
        </Box>
      )}
      {
        isFetching
          ?
          <div className="w-full h-[11rem] flex justify-center items-center ">
            <Loader />
          </div>
          // :
          // leads?.length === 0 ? (
          //   <Empty title='No leads found.' />
          // )
          :
          (
            <div className="flex flex-col gap-[8px]">
              <Box
                sx={{
                  justifyContent: "center",
                  boxShadow: "none",
                  border: "1px solid #f6f9fa",
                  "& .super-app-theme--header": {
                    color: "#20aee3",
                    fontFamily: "Montserrat, sans-serif",
                  },
                }}>
                <DataGrid
                  className="bg-white rounded-[6px] p-[15px]"
                  rows={leads}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 }, }, }}
                  getRowId={(row) => row._id}
                  pageSizeOptions={[5, 10]}
                  disableRowSelectionOnClick
                  disableColumnMenu
                  disableSelectionOnClick
                />
              </Box>
            </div>
          )
      }

      <ViewAttachments
        open={openAttachments}
        setOpen={setOpenAttachments}
        leadId={selectedLeadId}
      />

    </div>
  );
};

export default ClientLeads;
