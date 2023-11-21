import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, updateProject } from "../../../redux/action/project";
import { Loader } from "../../../utils";
import { getProjectReducer, getProjectsReducer } from "../../../redux/reducer/project";
import { Tooltip } from "@mui/material";
import { PiArchiveBoxLight, PiArchiveLight, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import ProjectFilter from "./ProjectFilter";
import { format } from "timeago.js";
import { Archive, Unarchive } from "@mui/icons-material";

function Projects() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { projects, allProjects, isFetching, error } = useSelector((state) => state.project);
  const { loggedUser } = useSelector((state) => state.user);
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.uid}</span>
        </Tooltip>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.title}</span>
        </Tooltip>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 280,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.description}</span>
        </Tooltip>
      ),
    },
    {
      field: "society",
      headerName: "Society",
      headerClassName: "super-app-theme--header",
      width: 140,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.society?.title}</span>
        </Tooltip>
      ),
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.city}</span>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row?.status}</span>
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
          <span className="font-primary capitalize">{format(params.row?.createdAt)}</span>
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
          {
            loggedUser?.role != 'employee' &&
            <Tooltip arrow placement="top" title="Delete">
              {" "}
              <PiTrashLight
                onClick={() => handleOpenDeleteModal(params.row?._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          }
          <Tooltip arrow placement="top" title="Edit">
            {" "}
            <CiEdit
              onClick={() => handleOpenEditModal(params.row)}
              className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
            />
          </Tooltip>
          <Tooltip arrow placement="top" title={params.row.isArchived ? "Un Archive" : "Archive"}>
            {" "}
            {params.row.isArchived ? (
              <PiArchiveLight
                onClick={() => handleUnArchive(params.row)}
                className="cursor-pointer text-amber-500 text-[23px] hover:text-amber-600"
              />
            ) : (
              <PiArchiveBoxLight
                onClick={() => handleArchive(params.row)}
                className="cursor-pointer text-amber-500 text-[23px] hover:text-amber-600"
              />
            )}
          </Tooltip>
        </div>
      ),
    },
  ];

  const unarchivedProjects = projects.filter((project) => !project.isArchived);
  const archivedProjects = projects.filter((project) => project.isArchived);

  ////////////////////////////////////// STATES //////////////////////////////
  const [scroll, setScroll] = useState("paper");
  const [openViewModel, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showArchivedProjects: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getProjects());
  }, [options.showArchivedProjects]);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  useEffect(() => {
    if (!isFiltered) {
      dispatch(getProjectsReducer(allProjects))
    }
  }, [isFiltered])
  ////////////////////////////////////// FUNCTION //////////////////////////////\
  const handleOpenStatusModal = (project) => {
    setOpenStatusModal(true);
    dispatch(getProjectReducer(project));
  };
  const handleArchive = (project) => {
    dispatch(updateProject(project._id, { isArchived: true }, { loading: false }));
  };
  const handleUnArchive = (project) => {
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
      <EditProject scroll={scroll} openEdit={openEditModal} setOpenEdit={setOpenEditModal} />
      <EditProject scroll={scroll} open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteProject open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={selectedProjectId} />
      <Topbar options={options} setOptions={setOptions} openFilters={openFilters} setOpenFilters={setOpenFilters} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      <ProjectFilter open={openFilters} setOpen={setOpenFilters} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />

      <div className="flex justify-center items-center ">
          <Table
            rows={options.showArchivedProjects ? archivedProjects : unarchivedProjects}
            columns={columns}
            rowsPerPage={10}
            isFetching={isFetching}
            error={error}
          />
      </div>
    </div>
  );
}

export default Projects;
