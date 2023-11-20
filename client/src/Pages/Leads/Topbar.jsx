import React, { useEffect, useState } from "react";
import { Add, Close, Delete } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { Chip, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeads, getLeads, searchLead } from "../../redux/action/lead";
import { PiArchive, PiChartBar, PiMagnifyingGlass, PiNote } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import CreateLead from "./CreateLead";
import EditModal from "./EditModal";
import { searchLeadReducer } from "../../redux/reducer/lead";

const Topbar = ({ options, setOptions, isFiltered, setIsFiltered, openFilters, setOpenFilters }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { leads } = useSelector(state => state.lead);
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showOptionButtons = !pathArr.includes("create");
  const dispatch = useDispatch();

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchLeadReducer(searchTerm));
  }


  const handleToggleShowArchivedLeads = () => {
    setOptions((pre) => ({
      ...pre,
      showArchivedLeads: !options?.showArchivedLeads,
      showEmployeeLeads: false,
    }));
  };
  const handleToggleShowEmployeeLeads = () => {
    setOptions((pre) => ({
      ...pre,
      showEmployeeLeads: !options?.showEmployeeLeads,
      showArchivedLeads: false,
    }));
  };
  const handleToggleIsKanbanView = () => {
    setOptions((pre) => ({ ...pre, isKanbanView: !options?.isKanbanView }));
  };
  const handleToggleFilters = () => {
    setOpenFilters((pre) => !pre);
  };

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleOpenFollowUps = () => {
    navigate('/leads/followups/all')
  }

  return (
    <div className="flex flex-col tracking-wide pb-8 font-primary">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="md:flex justify-between items-center flex-none">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        {showOptionButtons && (
          <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
            {
              isFiltered &&
              <Chip
                label="Filtered"
                onDelete={() => setIsFiltered(false)}
                deleteIcon={<Close />}
              />
            }
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
              <FormControl>
                <Input
                  name="search"
                  placeholder="Search Leads"
                  onChange={(e) => handleSearch(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PiMagnifyingGlass className="text-[25px]" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <Tooltip title="Archived" arrow placement="top">
              <div
                onClick={handleToggleShowArchivedLeads}
                className={` p-2 rounded-md cursor-pointer ${options?.showArchivedLeads
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <PiArchive className="text-[25px]" />
              </div>
            </Tooltip>
            <Tooltip title="My Leads" arrow placement="top">
              <div
                onClick={handleToggleShowEmployeeLeads}
                className={` p-2 rounded-md cursor-pointer ${options?.showEmployeeLeads
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <FiUser className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="View" arrow placement="top">
              <div
                onClick={handleToggleIsKanbanView}
                className={` p-2 rounded-md cursor-pointer ${options?.isKanbanView
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <FiList className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="Filter" arrow placement="top">
              <div
                onClick={handleToggleFilters}
                className={` p-2 rounded-md cursor-pointer ${openFilters
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <FiFilter className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="Call Reminders" arrow placement="top">
              <div
                onClick={()=>navigate('/leads/call-reminders')}
                className={` p-2 rounded-md cursor-pointer ${openFilters
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <PiNote className="text-[25px] " />
              </div>
            </Tooltip>
            <div>
              <Tooltip title="Add New Lead" placement="top" arrow>
                <div onClick={handleCreateopen("body")}>
                  <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                    <Add />
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      <CreateLead scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
