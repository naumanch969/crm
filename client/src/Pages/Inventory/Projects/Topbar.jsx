import React, { useEffect, useState } from "react";
import { Box, CardContent, Chip, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass, PiTrendUp } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Add, Archive, Close, Person2 } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../../utils";
import { useDispatch } from "react-redux";
import { searchProject } from "../../../redux/action/project";
import CreateProject from "./CreateProject";

const Topbar = ({ options, setOptions, openFilters, setOpenFilters, isFiltered, setIsFiltered }) => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item != "");
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
  const descriptionElementRef = React.useRef(null);

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

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
    dispatch(searchProject(searchTerm, options.showArchivedSocieties));
  };
  const handleToggleShowArchivedProjects = () => {
    setOptions((pre) => ({
      ...pre,
      showArchivedProjects: !options?.showArchivedProjects,
      showEmployeeProjects: false,
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

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="flex flex-col tracking-wide font-primary pb-5">
      <div className="w-full text-[14px]">
        <Path />
      </div>

      <div className="md:flex justify-between items-center flex-none">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        <div>
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
                  className={` p-2 rounded-md cursor-pointer ${options?.showArchivedProjects
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                    }`}>
                  <PiArchive className="text-[25px]" />
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
                  <div onClick={handleCreateopen("body")}>
                    <button className="bg-sky-400 hover:bg-sky-500 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                      <Add />
                    </button>
                  </div>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreateProject scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
