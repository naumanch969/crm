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
import Project from "./Project";
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

function Projects() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { projects, archived, isFetching, error } = useSelector((state) => state.project);
  const columns = [
    {
      field: "images",
      headerName: "Images",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <AvatarGroup max={3}>
          {params.row.images.map((img, index) => (
            <Avatar alt="img" src={img} key={index} />
          ))}
        </AvatarGroup>
      ),
    },

    {
      field: "price",
      headerName: "Price",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <span className="font-primary">Rs.{params.row.price}</span>,
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <span className="capitalize text-[#20aee3] font-primary">{params.row.city}</span>
      ),
    },
    {
      field: "region",
      headerName: "Location Area",
      headerClassName: "super-app-theme--header",
      width: 170,
      renderCell: (params) => <span className="capitalize font-primary">{params.row.region}</span>,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <span
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize font-primary font-medium ${
            params.row.status == "completed" ? "border-green-500 text-green-500" : ""
          } ${params.row.status == "notStarted" ? "border-sky-400 text-sky-400" : ""} ${
            params.row.status == "overDue" ? "border-red-400 text-red-400" : ""
          } ${
            params.row.status == "inProgress" ? "border-yellow-500 text-yellow-500" : ""
          } `}>
          {params.row.status == "notStarted" && <span>Not Started</span>}
          {params.row.status == "overDue" && <span>Over Due</span>}
          {params.row.status == "inProgress" && <span>In Progress</span>}
          {params.row.status == "completed" && <span>Completed</span>}
          </span>
      ),
    },
    {
      field: "area",
      headerName: "Area",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="capitalize font-primary">
          {params.row.area} {params.row.areaUnit == "square feet" ? "Sq. foot" : "Marla"}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      headerClassName: "super-app-theme--header",
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
            <div onClick={() => handleOpenViewModal(params.row._id)}>
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
                onClick={() => {
                  params.row.isArchived ? handleUnArchive(params.row) : handleArchive(params.row);
                }}>
                {params.row.isArchived ? "Un Archive" : "Archive"}
              </StyledMenuItem>
            </Menu>
          </Dropdown>
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
          isFetching={isFetching}
          error={error}
        />
      )}
    </div>
  );
}

export default Projects;
