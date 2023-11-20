import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getSocieties, updateSociety } from "../../../redux/action/society";
import {
  getSocietiesReducer,
  getSocietyReducer,
} from "../../../redux/reducer/society";
import { Tooltip } from "@mui/material";
import { PiArchiveBoxLight, PiArchiveLight, PiTrashLight } from "react-icons/pi";
import { format } from "timeago.js";
import { CiEdit } from "react-icons/ci";
import DeleteSociety from "./DeleteSociety";
import EditSociety from "./EditSociety";
import SocietyFilter from "./SocietyFilter";
import { Loader } from "../../../utils";
import { Archive, Unarchive } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function Societies() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const { societies, allSocieties, isFetching, error } = useSelector((state) => state.society);
  const { loggedUser } = useSelector((state) => state.user);
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
      field: "title",
      headerName: "Title",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.title}</span>
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
          <span className="font-primary capitalize">{params.row.description}</span>
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
          <span className="font-primary capitalize">{params.row.status}</span>
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
          <span className="font-primary capitalize">{format(params.row.createdAt)}</span>
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
                onClick={() => handleOpenDeleteModal(params.row._id)}
                className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
              />
            </Tooltip>
          }
          <Tooltip arrow placement="top" title="Edit">
            {" "}
            <CiEdit onClick={() => handleOpenEditModal(params.row)} className="cursor-pointer text-green-500 text-[23px] hover:text-green-600" />
          </Tooltip>
          <Tooltip arrow placement="top" title={params.row.isArchived ? "Un Archive" : "Archive"}>
            {" "}
            {
              params.row.isArchived
                ?
                <PiArchiveLight onClick={() => handleUnArchive(params.row)} className="cursor-pointer text-amber-500 text-[23px] hover:text-amber-600" />
                :
                <PiArchiveBoxLight onClick={() => handleArchive(params.row)} className="cursor-pointer text-amber-500 text-[23px] hover:text-amber-600" />
            }
          </Tooltip>
        </div>
      ),
    },
  ];

  const unarchivedSocieties = societies.filter(society => !society.isArchived)
  const archivedSocieties = societies.filter(society => society.isArchived)

  ////////////////////////////////////// STATES //////////////////////////////
  const [scroll, setScroll] = useState("paper");
  const [openViewModel, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedSocietyId, setSelectedSocietyId] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false)
  const [options, setOptions] = useState({
    isKanbanView: false,
    showArchivedSocieties: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getSocieties());
  }, [options.showArchivedSocieties, pathname]);
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
      dispatch(getSocietiesReducer(allSocieties))
    }
  }, [isFiltered])

  ////////////////////////////////////// FUNCTION //////////////////////////////\
  const handleOpenStatusModal = (society) => {
    setOpenStatusModal(true);
    dispatch(getSocietyReducer(society));
  };
  const handleArchive = (society) => {
    dispatch(updateSociety(society._id, { isArchived: true }, { loading: false }));
  };
  const handleUnArchive = (society) => {
    dispatch(updateSociety(society._id, { isArchived: false }, { loading: false }));
  };
  const handleOpenViewModal = (leadId) => {
    setOpenViewModal(true);
    setSelectedSocietyId(leadId);
  };
  const handleOpenEditModal = (society) => {
    setOpenEditModal(true);
    dispatch(getSocietyReducer(society));
  };
  const handleOpenDeleteModal = (societyId) => {
    setOpenDeleteModal(true);
    setSelectedSocietyId(societyId);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">

      <EditSociety scroll={scroll} open={openEditModal} setOpen={setOpenEditModal} />
      <SocietyFilter open={openFilters} setOpen={setOpenFilters} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      <DeleteSociety
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        societyId={selectedSocietyId}
      />
      <Topbar
        options={options}
        setOptions={setOptions}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
      />

      <div className="flex justify-center items-center " >
        {
          isFetching
            ?
            <Loader />
            :
            <Table
              rows={options.showArchivedSocieties ? archivedSocieties : unarchivedSocieties}
              columns={columns}
              rowsPerPage={10}
              error={error}
            />
        }
      </div>

    </div>
  );
}

export default Societies;
