import React, { useEffect, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/action/project";
import { Avatar, AvatarGroup, Tooltip, styled } from "@mui/material";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { getProjectReducer } from "../../redux/reducer/project";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import Project from "./Project";

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
  const dispatch = useDispatch();
  const { projects, isFetching, error } = useSelector((state) => state.project);
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
            <div onClick={handleClickOpen}>
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
                onClick={() => handleOpenArchive(params.row)}>
                Archive
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
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  ////////////////////////////////////// FUNCTION //////////////////////////////\
  const handleOpenStatusModal = (task) => {
    //
    //
  };
  const handleOpenArchive = () => {
    //
    //
  };
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

  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[2rem]  ">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        projectId={selectedProjectId}
      />

      <Project open={open} setOpen={setOpen} />

      <Topbar view={view} setView={setView} />
      <Table
        rows={projects}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />
    </div>
  );
}

export default Projects;
