import React, { memo, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { Table } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployees } from "../../redux/action/user";
import DeleteEmployee from "./DeleteEmployee";
import EditEmployee from "./EditEmployee";
import { getUserReducer } from "../../redux/reducer/user";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Filter from "./Filter";

const Employees = memo(() => {
  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { employees, isFetching, error } = useSelector((state) => state.user);
  const columns = [
    {
      field: "Employee Name",
      headerName: "Employee Name",
      headerClassName: "super-app-theme--header",
      width: "200",
      renderCell: (params) => (
        <Link className="text-[#20aee3] capitalize" to={`/users/${params.row._id}`}>
          {params.row.firstName} {params.row.lastName}
        </Link>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "super-app-theme--header",
      width: "170",
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: "220",
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: "170",
    },
    { field: "cnic", headerName: "CNIC", headerClassName: "super-app-theme--header", width: 200 },
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
          <Tooltip placement="top" title="View" arrow>
            {" "}
            <IoOpenOutline
              onClick={() => handleOpenViewModel()}
              className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400"
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

  /////////////////////////////////////// USE EFFECTS ////////////////////////////////////
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
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
      <Filter open={openFilters} setOpen={setOpenFilters} />

      <Topbar openFilters={openFilters} setOpenFilters={setOpenFilters} />

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
