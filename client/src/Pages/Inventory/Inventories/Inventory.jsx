import React, { useEffect, useState } from "react";
import { Table } from "../../../Components";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeInventories, getInventories, updateInventory } from "../../../redux/action/inventory";
import { getInventoriesReducer, getInventoryReducer, } from "../../../redux/reducer/inventory";
import { Avatar, AvatarGroup, Tooltip, styled } from "@mui/material";
import { Dropdown, Menu, MenuButton, MenuItem, menuItemClasses } from "@mui/base";
import { PiArchiveBoxLight, PiArchiveLight, PiDotsThreeOutlineThin, PiTrashLight } from "react-icons/pi";
import { IoOpenOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import UpdateStatusModal from "./UpdateStatus";
import ViewInventory from "./ViewInventory";
import Filter from "./Filter";
import Kanban from "./Kanban/Kanban";
import DeleteInventory from "./DeleteInventory";
import EditInventory from "./EditInventory";
import { format } from "timeago.js";
import { Loader } from "../../../utils";
import { Archive, Unarchive } from "@mui/icons-material";

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

function Inventory() {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  const { inventories, allInventories, isFetching, error } = useSelector((state) => state.inventory);
  const { loggedUser } = useSelector(state => state.user)
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
      field: "sellerName",
      headerName: "Seller Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.sellerName}</span>
        </Tooltip>
      ),
    },
    {
      field: "sellerPhone",
      headerName: "Seller Phone No.",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.sellerPhone}</span>
        </Tooltip>
      ),
    },
    {
      field: "sellerCity",
      headerName: "Seller City",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.sellerCity}</span>
        </Tooltip>
      ),
    },
    {
      field: "project",
      headerName: "Project",
      headerClassName: "super-app-theme--header",
      width: 180,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.project?.title}</span>
        </Tooltip>
      ),
    },
    {
      field: "propertyNumber",
      headerName: "Property Number",
      headerClassName: "super-app-theme--header",
      width: 180,
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.propertyNumber}</span>
        </Tooltip>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.price}</span>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
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
      width: 150,
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

  const unarchivedInventories = inventories.filter(inventory => !inventory.isArchived)
  const archivedInventories = inventories.filter(inventory => inventory.isArchived)

  ////////////////////////////////////// STATES //////////////////////////////
  const [scroll, setScroll] = useState("paper");
  const [openViewModel, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [options, setOptions] = useState({
    isKanbanView: false,
    showArchivedInventories: false,
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    loggedUser?.role == 'employee'
      ?
      dispatch(getInventories())
      :
      dispatch(getEmployeeInventories());
  }, [options.showArchivedInventories]);

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
      dispatch(getInventoriesReducer(allInventories))
    }
  }, [isFiltered])
  ////////////////////////////////////// FUNCTION //////////////////////////////\
  const handleOpenStatusModal = (inventory) => {
    setOpenStatusModal(true);
    dispatch(getInventoryReducer(inventory));
  };
  const handleArchive = (inventory) => {
    dispatch(updateInventory(inventory._id, { isArchived: true }, { loading: false }));
  };
  const handleUnArchive = (inventory) => {
    dispatch(updateInventory(inventory._id, { isArchived: false }, { loading: false }));
  };
  const handleOpenViewModal = (leadId) => {
    setOpenViewModal(true);
    setSelectedInventoryId(leadId);
  };
  const handleOpenEditModal = (inventory) => {
    setOpenEditModal(true);
    dispatch(getInventoryReducer(inventory));
  };
  const handleOpenDeleteModal = (inventoryId) => {
    setOpenDeleteModal(true);
    setSelectedInventoryId(inventoryId);
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col">

      <EditInventory scroll={scroll} open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteInventory open={openDeleteModal} setOpen={setOpenDeleteModal} inventoryId={selectedInventoryId} />
      <UpdateStatusModal open={openStatusModal} setOpen={setOpenStatusModal} inventoryId={selectedInventoryId} />
      <Filter open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
      <ViewInventory scroll={scroll} open={openViewModel} setOpen={setOpenViewModal} inventoryId={selectedInventoryId} />
      <Topbar options={options} setOptions={setOptions} openFilters={openFilters} setOpenFilters={setOpenFilters} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      {
        options.isKanbanView
          ?
          <Kanban options={options} setOptions={setOptions} />
          :
          <div className="flex justify-center items-center " >
            <Table
              rows={options.showArchivedInventories ? archivedInventories : unarchivedInventories}
              columns={columns}
              rowsPerPage={10}
              isFetching={isFetching}
              error={error}
            />
          </div>
      }
    </div>
  );
}

export default Inventory;
