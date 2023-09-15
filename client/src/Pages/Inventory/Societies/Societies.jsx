import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, updateProject } from "../../../redux/action/project";
import {
  getProjectReducer,
  archiveProjectReducer,
  unarchiveProjectReducer,
} from "../../../redux/reducer/project";
import { Tooltip } from "@mui/material";
import { PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import DeleteSociety from "./DeleteSociety";
import EditSociety from "./EditSociety";

function Societies() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { projects, archived, isFetching, error } = useSelector((state) => state.project);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize"></span>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
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
      width: 200,
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
            <PiTrashLight
              onClick={() => handleOpenDeleteModal(params.row._id)}
              className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
            />
          </Tooltip>
          <Tooltip arrow placement="top" title="Edit">
            {" "}
            <CiEdit onClick={() => handleOpenEditModal(params.row)} className="cursor-pointer text-green-500 text-[23px] hover:text-green-600" />
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
      <EditSociety scroll={scroll} openEdit={openEditModal} setOpenEdit={setOpenEditModal} />

      <DeleteSociety
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        projectId={selectedProjectId}
      />
      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
      />
      <Table
        rows={options.showArchivedProjects ? archived : projects}
        columns={columns}
        rowsPerPage={10}
        error={error}
      />
    </div>
  );
}

export default Societies;
