import React, { useEffect, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, updateProject } from "../../redux/action/project";
import {
  getProjectReducer,
  archiveProjectReducer,
  unarchiveProjectReducer,
} from "../../redux/reducer/project";
import { Avatar, AvatarGroup, Tooltip, styled } from "@mui/material";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import UpdateStatusModal from "./UpdateStatus";
import Project from "./ViewInventory";
import Filter from "./Filter";
import Kanban from "./Kanban/Kanban";

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

function Inventory() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { projects, archived, isFetching, error } = useSelector((state) => state.project);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "sellerName",
      headerName: "Seller Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "sellerPhone",
      headerName: "Seller Phone No.",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "project",
      headerName: "Project",
      headerClassName: "super-app-theme--header",
      width: 190,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "property",
      headerName: "Property",
      headerClassName: "super-app-theme--header",
      width: 190,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "propertyPrice",
      headerName: "Property Price",
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex gap-[10px] items-center transition-all">
          <Tooltip arrow placement="top" title="Delete">
            {" "}
            <PiTrashLight onClick={() => handleOpenDeleteModal(params.row._id)} className="cursor-pointer text-red-500 text-[23px] hover:text-red-400" />
          </Tooltip>
          <Tooltip arrow placement="top" title="View">
            <div>
              <IoOpenOutline className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400" />
            </div>
          </Tooltip>
          <Tooltip arrow placement="top" title="Edit">
            {" "}
            <CiEdit className="cursor-pointer text-green-500 text-[23px] hover:text-green-600" />
          </Tooltip>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [scroll, setScroll] = useState("paper");
  const [openViewModel, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showEmployeeProjects: false,
    showArchivedProjects: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  ////////////////////////////////////// FUNCTION //////////////////////////////\
  const handleOpenStatusModal = (project) => {
    setOpenStatusModal(true);
    dispatch(getProjectReducer(project));
  };
  const handleArchive = (project) => {
    dispatch(archiveProjectReducer(project));
    dispatch(updateProject(project._id, { isArchived: true }, { loading: false }));
  };
  const handleUnArchive = (project) => {
    dispatch(unarchiveProjectReducer(project));
    dispatch(updateProject(project._id, { isArchived: false }, { loading: false }));
  };
  const handleOpenViewModal = (leadId) => {
    setOpenViewModal(true);
    setSelectedProjectId(leadId);
  };
  const handleOpenEditModal = (project) => {
    setOpenEditModal(true);
    dispatch(getProjectReducer(project));
  };
  const handleOpenDeleteModal = (projectId) => {
    setOpenDeleteModal(true);
    setSelectedProjectId(projectId);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal scroll={scroll} openEdit={openEditModal} setOpenEdit={setOpenEditModal} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        projectId={selectedProjectId}
      />
      <UpdateStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        projectId={selectedProjectId}
      />
      <Filter open={openFilters} setOpen={setOpenFilters} />
      <Project
        scroll={scroll}
        open={openViewModel}
        setOpen={setOpenViewModal}
        projectId={selectedProjectId}
      />

      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
      />
      {options.isKanbanView ? (
        <Kanban options={options} setOptions={setOptions} />
      ) : (
        <Table
          rows={options.showArchivedProjects ? archived : projects}
          columns={columns}
          rowsPerPage={10}
          error={error}
        />
      )}
    </div>
  );
}

export default Inventory;
