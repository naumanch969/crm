import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../redux/action/task";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { getTaskReducer } from "../../redux/reducer/task";
import { PiArchiveThin, PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { format } from "timeago.js";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { IoOpenOutline } from "react-icons/io5";
import { Tooltip, styled } from "@mui/material";
import UpateStatusModal from "./UpdateStatus";
import Kanban from "./Kanban/Kanban";
import Filter from "./Filter";

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

function Tasks() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { tasks, isFetching, error } = useSelector((state) => state.task);
  const archivedTasks = tasks.filter(task => task.isArchived)
  const unarchivedTasks = tasks.filter(task => !task.isArchived)
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 270,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span
          className="cursor-pointer text-[#20aee3] hover:text-[#007bff] capitalize font-primary font-light"
          onClick={() => handleClickOpen(params.row)}>
          {params.row.title}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip arrow title={params.row.description}>
          <div className="capitalize font-primary">{params.row.description}</div>
        </Tooltip>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{format(params.row.dueDate)}</div>,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip
          className="capitalize font-primary"
          placeholder="bottom"
          arrow
          title={params.row.priority}>
          {params.row.priority}
        </Tooltip>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{format(params.row.createdAt)}</div>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize  font-primary font-medium
          ${params.row.status == "completed" ? "border-green-500 text-green-500" : ""}
          ${params.row.status == "new" ? "border-sky-400 text-sky-400" : ""} 
          ${params.row.status == "overDue" ? "border-red-400 text-red-400" : ""} 
          ${params.row.status == "inProgress" ? "border-yellow-500 text-yellow-500" : ""}
          `}>
          {params.row.status == "completed" ? "Completed" : ""}
          {params.row.status == "new" ? "New" : ""}
          {params.row.status == "overDue" ? "Over Due" : ""}
          {params.row.status == "inProgress" ? "In Progress" : ""}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex gap-[10px] ">
          <Tooltip placement="top" title="Delete">
            {" "}
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
          <Tooltip placement="top" title="View">
            {" "}
            <IoOpenOutline
              onClick={() => handleClickOpen(params.row)}
              className="cursor-pointer text-orange-500 text-[23px] hover:text-orange-400"
            />
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
                className="text-gray-500 flex font-primary"
                onClick={() => handleOpenStatusModal(params.row)}>
                Update Status
              </StyledMenuItem>
              <StyledMenuItem
                className="text-gray-500 flex font-primary"
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showEmployeeTasks: false,
    showArchivedTasks: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenStatusModal = (task) => {
    setOpenStatusModal(true);
    dispatch(getTaskReducer(task));
  };
  const handleOpenArchive = () => {
    //
    //
  };
  const handleClickOpen = (task) => {
    dispatch(getTaskReducer(task));
    setOpenTask(true);
  };
  const handleOpenEditModal = (task) => {
    dispatch(getTaskReducer(task));
    setOpenEditModal(true);
  };
  const handleOpenDeleteModal = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenDeleteModal(true);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} taskId={selectedTaskId} />
      <Task open={openTask} setOpen={setOpenTask} />
      <UpateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} />
      <Filter open={openFilters} setOpen={setOpenFilters} />

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
          rows={options.showArchivedTasks ? archivedTasks : unarchivedTasks}
          columns={columns}
          rowsPerPage={10}
          isFetching={isFetching}
          error={error}
        />
      )}
    </div>
  );
}

export default Tasks;
