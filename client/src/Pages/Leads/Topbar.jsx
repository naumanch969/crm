import React, { useEffect, useState } from "react";
import { Add, Archive, Person2 } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { FormControl, IconButton, Input, InputAdornment, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { getArchivedLeads, getEmployeeLeads, getLeads } from "../../redux/action/lead";
import { PiArchive, PiMagnifyingGlass } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";

const Topbar = ({ options, setOptions }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item !== "");
  const showOptionButtons = !pathArr.includes("create");
  const dispatch = useDispatch();

  ////////////////////////////////////////// STATES //////////////////////////////////////

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    options?.showArchivedLeads && dispatch(getArchivedLeads());
    options?.showEmployeeLeads && dispatch(getEmployeeLeads());
    !options?.showArchivedLeads && !options?.showEmployeeLeads && dispatch(getLeads());
  }, [options]);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
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

  return (
    <div className="flex flex-col tracking-wide">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="flex justify-between items-center ">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        {showOptionButtons && (
          <div className="flex items-center gap-2">
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
              <FormControl>
                <Input
                  name="search"
                  placeholder="Search Leads"
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
                className={` p-2 rounded-md cursor-pointer ${
                  options?.showArchivedLeads
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                }`}>
                <PiArchive className="text-[25px]" />
              </div>
            </Tooltip>
            <Tooltip title="My Leads" arrow placement="top">
              <div
                onClick={handleToggleShowEmployeeLeads}
                className={` p-2 rounded-md cursor-pointer ${
                  options?.showEmployeeLeads
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                }`}>
                <FiUser className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="View" arrow placement="top">
              <div
                onClick={handleToggleIsKanbanView}
                className={` p-2 rounded-md cursor-pointer ${
                  options?.isKanbanView
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                }`}>
                <FiList className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="Filter" arrow placement="top">
              <div className="bg-[#ebf2f5] p-2 rounded-md cursor-pointer hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <FiFilter className="text-[25px] " />
              </div>
            </Tooltip>
            <div>
              <Tooltip title="Add New Lead" placement="top" arrow>
                <Link to="/leads/create">
                <button
                  className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
                </Link>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
