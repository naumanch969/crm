import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import { Table } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClients, getEmployeeClients } from "../../redux/action/user";
import { getClientsReducer, getUserReducer } from "../../redux/reducer/user";
import { Tooltip, styled } from "@mui/material";
import { PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import Filter from "./Filter";
import User from "./User";
import DeleteClient from "./Delete";

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

const Clients = () => {
  ////////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { clients, isFetching, error, loggedUser } = useSelector((state) => state.user);
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.uid}</span>
        </Tooltip>
      ),
    },
    {
      headerClassName: "super-app-theme--header",
      field: "Client Name",
      headerName: "Client Name",
      width: "200",
      renderCell: (params) => (
        <div className="capitalize text-[#20aee3] font-primary hover:text-[#007bff] cursor-pointer font-light">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "username",
      headerName: "Client Username",
      headerClassName: "super-app-theme--header",
      width: "200",
      renderCell: (params) => <div className="capitalize font-primary">{params.row.username}</div>,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: "150",
      renderCell: (params) => <div className="font-primary">{params.row.phone}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: "220",
      renderCell: (params) => <div className="font-primary">{params.row?.email}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex gap-[10px]">
          {
            loggedUser?.role != 'employee' &&
            <Tooltip placement="top" title="Delete" arrow>
              {" "}
              <PiTrashLight
                onClick={() => handleOpenDeleteModal(params.row._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          }
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES ////////////////////////////////////////
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [openFilters, setOpenFilters] = useState("");
  const [openUser, setOpenUser] = useState(false);

  ////////////////////////////////////// USE EFFECTS ////////////////////////////////////
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeClients())
      :
      dispatch(getClients());
  }, []);

  ////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
  const handleClickOpen = () => {
    setOpenUser(true);
  };
  const handleOpenEditModal = (employee) => {
    dispatch(getUserReducer(employee));
    setOpenEditModal(true);
  };
  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="w-full">

      <DeleteClient open={openDeleteModal} setOpen={setOpenDeleteModal} userId={selectedUserId} />
      <Filter open={openFilters} setOpen={setOpenFilters} />
      <User open={openUser} setOpen={setOpenUser} />

      <Topbar />
      <Table
        rows={clients}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Clients;
