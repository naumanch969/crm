import React, { useEffect, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, updateProject } from "../../redux/action/project";
import { getProjectReducer, archiveProjectReducer, unarchiveProjectReducer } from "../../redux/reducer/project";
import { Avatar, AvatarGroup, Tooltip, styled } from "@mui/material";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import UpdateStatusModal from './UpdateStatus'
import Project from "./Project";
import Filter from './Filter'
import Kanban from './Kanban/Kanban'

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

function Projects({ scroll, setScroll }) {
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
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <span className="">Rs.{params.row.price}</span>,
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => <span className="capitalize text-[#20aee3]">{params.row.city}</span>,
    },
    {
      field: "region",
      headerName: "Location Area",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
    {
      field: "priority",
      headerName: "Priority",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "area",
      headerName: "Area",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span className="capitalize">
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
            <div onClick={handleCreateopen("body")}>
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
                onClick={() => {
                  params.row.isArchived ? handleUnArchive(params.row) : handleArchive(params.row)
                }}>
                {params.row.isArchived ? 'Un Archive' : 'Archive'}
              </StyledMenuItem>
            </Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState("table");
  const [open, setOpen] = useState(false);
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
    dispatch(archiveProjectReducer(project))
    dispatch(updateProject(project._id, { isArchived: true }, { loading: false }))
  }
  const handleUnArchive = (project) => {
    dispatch(unarchiveProjectReducer(project))
    dispatch(updateProject(project._id, { isArchived: false }, { loading: false }))
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenEditModal = (project) => {
    setOpenEditModal(true);
    dispatch(getProjectReducer(project));
  };
  const handleOpenDeleteModal = (projectId) => {
    setOpenDeleteModal(true);
    setSelectedProjectId(projectId);
  };
  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={selectedProjectId} />
      <UpdateStatusModal open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={selectedProjectId} />
      <Filter open={openFilters} setOpen={setOpenFilters} />
      <Project scroll={scroll} open={open} setOpen={setOpen} />

      <Topbar options={options} setOptions={setOptions} openFilters={openFilters} setOpenFilters={setOpenFilters} />
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
