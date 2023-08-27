import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../Components";
import Topbar from "./Topbar";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Tooltip } from "@mui/material";
import { getTasks } from "../../redux/action/task";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { getTaskReducer } from "../../redux/reducer/task";
import { PiArchiveThin, PiTrashLight } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { format } from "timeago.js";
import { styled } from '@mui/material/styles';

const VerticalProgressBarWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'flex-end',
});

const RotatedLinearProgress = styled(LinearProgress)({
  transform: 'rotate(180deg)',
  marginBottom: '8px', // Add some margin to the bottom for spacing
});

function Tasks() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch();
  const { tasks, isFetching, error } = useSelector((state) => state.task);
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span
          className="cursor-pointer text-[#20aee3] hover:text-[#007bff] capitalize"
          onClick={() => handleOpenTask(params.row)}>
          {params.row.title}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <VerticalProgressBarWrapper>
          <RotatedLinearProgress variant="determinate" value={params.row.priority == "moderate" ? 50 : 100} />
        </VerticalProgressBarWrapper>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <>{format(params.row.createdAt)}</>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <span
          className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize ${
            params.row.status == "successful" ? "border-green-500 text-green-500" : ""
          } ${params.row.status == "remaining" ? "border-sky-400 text-sky-400" : ""} ${
            params.row.status == "declined" ? "border-red-400 text-red-400" : ""
          } ${params.row.status == "to do" ? "border-yellow-500 text-yellow-500" : ""} ${
            params.row.status == "unsuccessful" ? "border-orange-500 text-orange-500" : ""
          }`}>
          {params.row.status}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
          <Tooltip placement="top" title="Edit">
            {" "}
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
          </Tooltip>
          <Tooltip placement="top" title="Archive">
            {" "}
            <PiArchiveThin
              onClick={() => handleOpenArchive()}
              className="cursor-pointer text-blue-500 text-[23px] hover:text-blue-600"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenTask = (task) => {
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
  const handleOpenArchive = () => {};

  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[12px]  ">
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} taskId={selectedTaskId} />
      <Task open={openTask} setOpen={setOpenTask} />

      <Topbar />
      <Table rows={tasks} columns={columns} rowsPerPage={5} isFetching={isFetching} error={error} />
    </div>
  );
}

export default Tasks;
