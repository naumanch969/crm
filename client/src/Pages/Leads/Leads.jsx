import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeads, getLead, getLeads } from "../../redux/action/lead";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Table } from "../../Components";
import { format } from "timeago.js";
import { getLeadReducer, getLeadsReducer } from "../../redux/reducer/lead";
import UpateStatusModal from "./UpdateStatus";
import ShiftLeadModal from "./ShiftLead";
import ShareLeadModal from "./ShareLead";
import Filter from "./Filter";
import Kanban from "./Kanban/Kanban";
import { CCallout } from "@coreui/react";
import { CiEdit } from "react-icons/ci";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import Lead from "./Lead";
import { Link, useNavigate } from "react-router-dom";
import Attachments from "./Attachments/Attachments";
import moment from "moment";
import { getProjectReducer } from "../../redux/reducer/project";
import { getProject } from "../../redux/action/project";

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
  const navigate = useNavigate();
  const { leads, allLeads, isFetching, error } = useSelector((state) => state.lead);
  console.log('leads', leads)
  const { currentProject } = useSelector((state) => state.project);
  const archivedLeads = leads.filter((lead) => lead.isArchived);
  const unarchivedLeads = leads.filter((lead) => !lead.isArchived);
  const { loggedUser } = useSelector((state) => state.user);
  const role = loggedUser.role;
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 70,
      renderCell: (params) => <div className="font-primary font-light">{params.row?.uid}</div>,
    },
    {
      field: "allocatedTo",
      headerName: "Allocated To",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => (
        <div
          className={`capitalize font-primary font-light`}
          onClick={() => handleOpenViewModal(params.row?._id)}>
          {
            params.row?.allocatedTo?.length > 0
              ?
              params.row?.allocatedTo?.map((user) => <span className="text-[#20aee3] hover:text-[#007bff] cursor-pointer " >{user?.username} </span>)
              :
              <span >Not Allocated</span>
          }
        </div>
      ),
    },
    {
      field: "clientName",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => (
        <div
          className={`text-[#20aee3] hover:text-[#007bff] capitalize cursor-pointer font-primary font-light`}
          onClick={() => handleOpenViewModal(params.row?._id)}>
          {params.row?.clientName}
        </div>
      ),
    },
    {
      field: "clientPhone",
      headerName: "Client Phone",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <div className={`font-primary font-light`}>{params.row?.client?.phone || params.row?.clientPhone}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 110,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="font-primary font-light">{moment(params.row?.createdAt).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      field: "priority",
      headerClassName: "super-app-theme--header",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => (
        <div className="capitalize font-primary font-light">{params.row?.priority}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <span
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize font-primary font-medium 
          ${params.row?.status == "closedWon" ? "border-green-500 text-green-500" : ""} 
          ${params.row?.status == "closedLost" ? "border-red-400 text-red-400" : ""} 
          ${params.row?.status == "followedUpCall" ? "border-sky-400 text-sky-400" : ""}
          ${params.row?.status == "contactedCallAttempt" ? "border-orange-400 text-orange-400" : ""} 
          ${params.row?.status == "contactedCall" ? "border-yellow-500 text-yellow-500" : ""}
          ${params.row?.status == "followedUpEmail" ? "border-lime-400 text-lime-500" : ""} 
          ${params.row?.status == "contactedEmail" ? "border-teal-400 text-teal-500" : ""} 
          ${params.row?.status == "meetingDone" ? "border-indigo-400 text-indigo-500" : ""}
          ${params.row?.status == "meetingAttempt" ? "border-pink-400 text-pink-500" : ""}
          ${params.row?.status == "new" ? "border-rose-700 text-rose-700" : ""}`}>
          <span>
            {params.row?.status == "closedWon" ? <div>Closed Won</div> : <div></div>}
            {params.row?.status == "closedLost" ? <div>Closed Lost</div> : <div></div>}
            {params.row?.status == "followedUpCall" ? <div>Followed Up Call</div> : <div></div>}
            {params.row?.status == "contactedCallAttempt" ? <div>Contacted Call Attempt</div> : <div></div>}
            {params.row?.status == "contactedCall" ? <div>Contacted Call</div> : <div></div>}
            {params.row?.status == "followedUpEmail" ? <div>Followed Up Email</div> : <div></div>}
            {params.row?.status == "contactedEmail" ? <div>Contacted Email</div> : <div></div>}
            {params.row?.status == "meetingDone" ? <div>Meeting Done</div> : <div></div>}
            {params.row?.status == "meetingAttempt" ? <div>Meeting Attempt</div> : <div></div>}
            {params.row?.status == "new" ? <div>New</div> : <div></div>}
          </span>
        </span>
      ),
    },
    {
      field: "property",
      headerName: "Property",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary font-light capitalize">{params.row?.project?.title || params.row?.property?.title}</div>,
    },
    {
      field: "actions",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          {loggedUser?.role != "employee" && (
            <Tooltip placement="top" title="Delete">
              {" "}
              <PiTrashLight
                onClick={() => handleOpenDeleteModal(params.row?._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          )}
          <Tooltip placement="top" title="View">
            <div className="cursor-pointer" onClick={() => handleOpenViewModal(params.row?._id)}>
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
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenStatusModal(params.row)}>
                Update Status
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenShiftLeadModal(params.row)}>
                Shift Lead
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => handleOpenShareLeadModal(params.row)}>
                {params.row?.allocatedTo?.length > 0 ? 'Share Lead' : 'Allocate Lead'}
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-600 flex font-primary"
                onClick={() => navigateToRefund(params.row)}>
                Refunds
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => handleOpenAttachmentModal(params.row._id)}
                className="text-gray-600 flex font-primary">
                Attachments
              </StyledMenuItem>
            </Menu>
          </Dropdown>
        </div>
      ),
    },
  ];
  const filteredColumns = () => { }
  let modifiedColumns = columns;
  if (role == "employee" && type == "all") {
    modifiedColumns = modifiedColumns.filter((column) => column.field != "allocatedTo");
  }

  ////////////////////////////////////// STATES //////////////////////////////
  const [openAttachmentModal, setOpenAttachmentModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openShiftLeadModal, setOpenShiftLeadModal] = useState(false);
  const [openShareLeadModal, setOpenShareLeadModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showEmployeeLeads: false,
    showArchivedLeads: false,
  });
  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeLeads())
      :
      dispatch(getLeads());
  }, []);

  useEffect(() => {
    if (!isFiltered) {
      dispatch(getLeadsReducer(allLeads));
    }
  }, [isFiltered]);


  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenAttachmentModal = (leadId) => {
    setSelectedLeadId(leadId);
    setOpenAttachmentModal(true);
  };
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
  const handleOpenShareLeadModal = (lead) => {
    setOpenShareLeadModal(true);
    dispatch(getLeadReducer(lead));
  };
  const handleOpenDeleteModal = (leadId) => {
    setOpenDeleteModal(true);
    setSelectedLeadId(leadId);
  };
  const handleOpenViewModal = (leadId) => {
    dispatch(getLeadReducer(leadId));
    navigate(`/leads/${leadId}`);
  };
  const navigateToRefund = (lead) => {
    if (lead.isAppliedForRefund) {
      return;
    } else {
      navigate(`/leads/refund/${lead._id}`);
    }
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} leadId={selectedLeadId} />
      <UpateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} />
      <ShiftLeadModal open={openShiftLeadModal} setOpen={setOpenShiftLeadModal} />
      <ShareLeadModal open={openShareLeadModal} setOpen={setOpenShareLeadModal} />
      <Filter open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
      <Attachments
        open={openAttachmentModal}
        setOpen={setOpenAttachmentModal}
        leadId={selectedLeadId}
      />

      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        setIsFiltered={setIsFiltered}
        isFiltered={isFiltered}
      />
      {options.isKanbanView ? (
        <Kanban options={options} setOptions={setOptions} />
      ) : (
        <CCallout color="primary">
          <Table
            rows={options.showArchivedLeads ? archivedLeads : unarchivedLeads}
            columns={modifiedColumns}
            rowsPerPage={10}
            isFetching={isFetching}
            showSidebar={showSidebar}
          />
        </CCallout>
      )}
    </div>
  );
}

export default Leads;
