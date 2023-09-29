import React, { useEffect, useState } from "react";
import { Box, CardContent, Chip, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass, PiTrendUp } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Add, Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { useDispatch } from "react-redux";
import {  getTasks } from "../../redux/action/task";
import CreateTask from "./CreateTask";
import Navbar from "../../Components/Navbar/Navbar";
import { searchTaskReducer } from "../../redux/reducer/task";

const Topbar = ({ options, setOptions, openFilters, setOpenFilters, isFiltered, setIsFiltered }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showOptionButtons = !pathArr.includes("create");
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  // Count occurrences of each status
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  const allStatusOptions = ["new", "overDue", "completed", "inProgress"];
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
    options?.showEmployeeTasks && dispatch(getTasks());
    !options?.showArchivedTasks && !options?.showEmployeeTasks && dispatch(getTasks());
  }, [options]);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchTaskReducer(searchTerm));
  }
  const handleToggleShowArchivedTasks = () => {
    setOptions((pre) => ({
      ...pre,
      showArchivedTasks: !options?.showArchivedTasks,
      showEmployeeTasks: false,
    }));
  };
  const handleToggleShowEmployeeTasks = () => {
    setOptions((pre) => ({
      ...pre,
      showEmployeeTasks: !options?.showEmployeeTasks,
      showArchivedTasks: false,
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

  <Navbar open={open} setOpen={setOpen} />;

  return (
    <div className="flex flex-col tracking-wide font-primary">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="md:flex justify-between items-center flex-none mb-4">
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
                  placeholder="Search Tasks"
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
                onClick={handleToggleShowArchivedTasks}
                className={` p-2 rounded-md cursor-pointer ${options?.showArchivedTasks
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <PiArchive className="text-[25px]" />
              </div>
            </Tooltip>
            <Tooltip title="My Tasks" arrow placement="top">
              <div
                onClick={handleToggleShowEmployeeTasks}
                className={` p-2 rounded-md cursor-pointer ${options?.showEmployeeTasks
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
            <div>
              <Tooltip title="Add New Task" placement="top" arrow>
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

      <CreateTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
