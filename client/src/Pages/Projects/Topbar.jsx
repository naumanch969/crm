import React, { useEffect, useState } from "react";
import { Box, CardContent, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass, PiTrendUp } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Add, Archive, Person2 } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { useDispatch } from "react-redux";
import { getArchivedProjects, getProjects, searchProject } from "../../redux/action/project";
import CreateProject from "./CreateProject";

const Topbar = ({ options, setOptions, openFilters, setOpenFilters }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item !== "");
  const showOptionButtons = !pathArr.includes("create");
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  // Count occurrences of each status
  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});
  const allStatusOptions = ["notStarted", "onHold", "completed", "inProgress"];
  // Transform the status counts into the desired format
  const statusArray = allStatusOptions.map((status) => ({
    name: status,
    counts: statusCounts[status] || 0,
  }));

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [showStatBar, setShowStatBar] = useState(true);
  const [open, setOpen] = useState(false);

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    options?.showArchivedProjects && dispatch(getArchivedProjects());
    options?.showEmployeeProjects && dispatch(getProjects());
    !options?.showArchivedProjects && !options?.showEmployeeProjects && dispatch(getProjects());
  }, [options]);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchProject(searchTerm));
  };
  const handleToggleShowArchivedProjects = () => {
    setOptions((pre) => ({
      ...pre,
      showArchivedProjects: !options?.showArchivedProjects,
      showEmployeeProjects: false,
    }));
  };
  const handleToggleShowEmployeeProjects = () => {
    setOptions((pre) => ({
      ...pre,
      showEmployeeProjects: !options?.showEmployeeProjects,
      showArchivedProjects: false,
    }));
  };
  const handleToggleIsKanbanView = () => {
    setOptions((pre) => ({
      ...pre,
      isKanbanView: !options?.isKanbanView,
    }));
  };
  const handleToggleFilters = () => {
    setOpenFilters((pre) => !pre);
  };
  const handleToggleIsStatOpen = () => {
    setShowStatBar(!showStatBar);
  };
  const handleCreateopen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col tracking-wide">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="md:flex justify-between items-center flex-none">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        {showOptionButtons && (
          <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
              <FormControl>
                <Input
                  name="search"
                  placeholder="Search Projects"
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
                onClick={handleToggleShowArchivedProjects}
                className={` p-2 rounded-md cursor-pointer ${
                  options?.showArchivedProjects
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                }`}>
                <PiArchive className="text-[25px]" />
              </div>
            </Tooltip>
            <Tooltip title="My Projects" arrow placement="top">
              <div
                onClick={handleToggleShowEmployeeProjects}
                className={` p-2 rounded-md cursor-pointer ${
                  options?.showEmployeeProjects
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
            <Tooltip title="Quick Stats" arrow placement="top">
              <div
                onClick={handleToggleIsStatOpen}
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <PiTrendUp className="text-[25px] " />
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
            <div>
              <Tooltip title="Add New Project" placement="top" arrow>
                <div onClick={handleCreateopen}>
                  <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                    <Add />
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      {showStatBar && (
        <div className="mt-5 mb-10">
          <Box className="w-auto md:columns-4 sm:columns-2 font-primary">
            {statusArray.map((status, index) => (
              <div
                key={index}
                className={`bg-white border-b-[3px]  sm:mt-0 mt-4 shadow-none rounded-md
                    ${status.name == "completed" ? "border-b-green-400" : ""}
                    ${status.name == "notStarted" ? "border-b-sky-400" : ""} 
                    ${status.name == "onHold" ? "border-b-red-400" : ""} 
                    ${status.name == "inProgress" ? "border-b-yellow-400" : ""}
                  `}>
                <CardContent className="flex-grow-[1] flex justify-between items-center">
                  <div>
                    <p className="text-2xl text-[#455a64]">{status.counts}</p>
                    <p className="text-md font-Mulish text-slate-500 text-opacity-70 capitalize ">
                      {status.name == "completed" ? "Completed" : ""}
                      {status.name == "notStarted" ? "New" : ""}
                      {status.name == "onHold" ? "Over Due" : ""}
                      {status.name == "inProgress" ? "In Progress" : ""}
                    </p>
                  </div>
                </CardContent>
              </div>
            ))}
          </Box>
        </div>
      )}

      <CreateProject open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
