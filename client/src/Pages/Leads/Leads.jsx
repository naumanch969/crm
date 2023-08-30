import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeads, getLeads } from "../../redux/action/lead";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Table } from "../../Components";
import { format } from "timeago.js";
import { getLeadReducer } from "../../redux/reducer/lead";
import UpateStatusModal from "./UpdateStatus";
import ShiftLeadModal from "./ShiftLead";
import Filter from "./Filter";
import Kanban from "./Kanban/Kanban";
import { CCallout } from "@coreui/react";
import { CiEdit } from "react-icons/ci";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import Lead from "./Lead";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledListbox = styled("ul")(
  ({ theme }) => `
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      transition:all;
      padding: 10px;
      margin: 12px 0;
      width: auto;
      border-radius: 12px;
      overflow: auto;
      outline: 0px;
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      box-shadow: 0px 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
      z-index: 1;
      `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      &:last-of-type {
        border-bottom: none;
      }
    
      &.${menuItemClasses.focusVisible} {
        outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      }
    
      &.${menuItemClasses.disabled} {
        color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
      }
    
      &:hover:not(.${menuItemClasses.disabled}) {
        background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      }
      `
);

function Leads({ type, showSidebar }) {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { archived, leads, isFetching, error } = useSelector((state) => state.lead);
  const { loggedUser } = useSelector((state) => state.user);
  const role = loggedUser.role;
  const columns = [
    {
      field: "clientId.firstName",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      minWidth: 200,
      maxWidth: 250,
      renderCell: (params) => (
        <div
          className={`text-[#20aee3] hover:text-[#007bff] capitalize cursor-pointer`}
          onClick={() => handleOpenViewModal(params.row._id)}>
          {params.row.clientId?.firstName} {params.row.clientId?.lastName}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 200,
      maxWidth: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <>{format(params.row.createdAt)}</>,
    },
    {
      field: "priority",
      headerClassName: "super-app-theme--header",
      headerName: "Priority",
      width: 150,
      renderCell: (params) => <div className="capitalize">{params.row.priority}</div>,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <span
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize ${
            params.row.status == "successful" ? "border-green-500 text-green-500" : ""
          } ${params.row.status == "remaining" ? "border-sky-400 text-sky-400" : ""} ${
            params.row.status == "declined" ? "border-red-400 text-red-400" : ""
          } ${params.row.status == "underProcess" ? "border-yellow-500 text-yellow-500" : ""} ${
            params.row.status == "unsuccessful" ? "border-orange-500 text-orange-500" : ""
          }`}>
          {params.row.status == "underProcess" && <span>Under Process</span>}
          {params.row.status != "underProcess" && <span>{params.row.status}</span>}
        </span>
      ),
    },

    {
      field: "allocatedTo",
      headerName: "Allocated To",
      width: 230,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => params.row.allocatedTo?.email,
    },
    {
      field: "actions",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
          <Tooltip placement="top" title="View">
            <div className="cursor-pointer" onClick={() => handleOpenViewModal(params.row._id)}>
              <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Edit">
            {" "}
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
          </Tooltip>

          <Dropdown>
            <Tooltip title="More" arrow placement="top">
              <MenuButton>
                <PiDotsThreeOutlineThin className="cursor-pointer text-[23px] text-gray-500 hover:text-gray-700" />
              </MenuButton>
            </Tooltip>

            <Menu slots={{ listbox: StyledListbox }}>
              <StyledMenuItem
                className="text-gray-600 flex"
                onClick={() => handleOpenStatusModal(params.row)}>
                Update Status
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex"
                onClick={() => handleOpenShiftLeadModal(params.row)}>
                Shift Lead
              </StyledMenuItem>
              <StyledMenuItem className="text-gray-600 flex" onClick={() => {}}>
                Refund
              </StyledMenuItem>
              <StyledMenuItem className="text-gray-600 flex" onClick={() => {}}>
                Share Lead
              </StyledMenuItem>
            </Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  let modifiedColumns = columns;
  if (role == "employee" && type == "all") {
    modifiedColumns = modifiedColumns.filter((column) => column.field !== "allocatedTo");
  }

  ////////////////////////////////////// STATES //////////////////////////////
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openShiftLeadModal, setOpenShiftLeadModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showEmployeeLeads: false,
    showArchivedLeads: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    type == "all" ? dispatch(getLeads()) : dispatch(getEmployeeLeads());
  }, [type]);

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenEditModal = (lead) => {
    setOpenEditModal(true);
    dispatch(getLeadReducer(lead));
  };
  const handleOpenStatusModal = (lead) => {
    setOpenStatusModal(true);
    dispatch(getLeadReducer(lead));
  };
  const handleOpenShiftLeadModal = (lead) => {
    setOpenShiftLeadModal(true);
    dispatch(getLeadReducer(lead));
  };
  const handleOpenDeleteModal = (leadId) => {
    setOpenDeleteModal(true);
    setSelectedLeadId(leadId);
  };

  const handleOpenViewModal = (leadId) => {
    setSelectedLeadId(leadId);
    setOpenViewModal(true);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} leadId={selectedLeadId} />
      <UpateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} />
      <ShiftLeadModal open={openShiftLeadModal} setOpen={setOpenShiftLeadModal} />
      <Filter open={openFilters} setOpen={setOpenFilters} />
      <Lead open={openViewModal} setOpen={setOpenViewModal} leadId={selectedLeadId} />

      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
      />
      {options.isKanbanView ? (
        <Kanban options={options} setOptions={setOptions} />
      ) : (
        <CCallout color="primary">
          <Table
            rows={options.showArchivedLeads ? archived : leads}
            columns={modifiedColumns}
            rowsPerPage={10}
            isFetching={isFetching}
            error={error}
            showSidebar={showSidebar}
          />
        </CCallout>
      )}
    </div>
  );
}

export default Leads;
