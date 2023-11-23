import React, { memo, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { Table } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees } from "../../redux/action/user";
import DeleteEmployee from "./Delete";
import EditEmployee from "./Edit";
import { getEmployeesReducer, getUserReducer } from "../../redux/reducer/user";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Filter from "./Filter";
import User from "./User";

const Employees = memo(() => {
  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { employees, allEmployees, isFetching, error } = useSelector((state) => state.user);
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.uid}</span>
        </Tooltip>
      ),
    },
    {
      field: "Employee Name",
      headerName: "Employee Name",
      headerClassName: "super-app-theme--header",
      width: 220,
      renderCell: (params) => (
        <div className="text-[#20aee3] capitalize font-primary font-light">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <div className="font-primary capitalize">
          {params.row.username}
        </div>
      ),
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => (
        <div className="text-[#20aee3] font-primary font-light">{params.row.email}</div>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => <div className="font-primary">{params.row.phone}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex gap-[10px]">
          <Tooltip placement="top" title="Delete" arrow>
            {" "}
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
          <Tooltip placement="top" title="Edit" arrow>
            {" "}
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  /////////////////////////////////////// STATES ////////////////////////////////////////
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [openFilters, setOpenFilters] = useState("");
  const [openView, setOpenViewk] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  /////////////////////////////////////// USE EFFECTS ////////////////////////////////////
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
  }, []);
  useEffect(() => {
    if (!isFiltered) {
      dispatch(getEmployeesReducer(allEmployees));
    }
  }, [isFiltered]);

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const hanldeOpenViewModal = (taskId) => {
    setSelectedUserId(taskId);
    setOpenViewk(true);
  };
  const handleOpenEditModal = (employee) => {
    dispatch(getUserReducer(employee));
    setOpenEditModal(true);
  };
  const handleOpenDeleteModal = (taskId) => {
    setSelectedUserId(taskId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="w-full">
      <EditEmployee open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteEmployee open={openDeleteModal} setOpen={setOpenDeleteModal} userId={selectedUserId} />
      <User open={openView} setOpen={setOpenViewk} />

      <Topbar
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
      />

      <Table
        rows={employees}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
});

export default Employees;
