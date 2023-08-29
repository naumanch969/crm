import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { Add } from "@mui/icons-material";
import { Box, CardContent, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass, PiTrendUp } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import CreateProject from "./CreateProject";

const Topbar = ({ setOpenFilters }) => {
  const [showStatBar, setShowStatBar] = useState(true);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");


  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const descriptionElementRef = React.useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item !== "");
  const showAddButton = !pathArr.includes("create");

  const handleToggleShowArchivedLeads = () => {};
  const handleToggleShowEmployeeLeads = () => {};
  const handleToggleIsKanbanView = () => {};
  const handleToggleIsStatOpen = () => {
    setShowStatBar(!showStatBar);
  };
  const handleToggleFilters = () => {
    setOpenFilters((pre) => !pre);
  };

  const handleCreateopen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className="md:flex justify-between items-center mb-5">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        {showAddButton && (
          <div className="flex items-center gap-2 justify-end md:mt-0 mt-4">
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
              <FormControl>
                <Input
                  name="search"
                  placeholder="Search Tasks"
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
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <PiArchive className="text-[25px]" />
              </div>
            </Tooltip>
            <Tooltip title="My Leads" arrow placement="top">
              <div
                onClick={handleToggleShowEmployeeLeads}
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <FiUser className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="Quick Stats" arrow placement="top">
              <div
                onClick={handleToggleIsStatOpen}
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <PiTrendUp className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="View" arrow placement="top">
              <div
                onClick={handleToggleIsKanbanView}
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <FiList className="text-[25px] " />
              </div>
            </Tooltip>
            <Tooltip title="Filter" arrow placement="top">
              <div
                onClick={handleToggleFilters}
                className=" p-2 rounded-md cursor-pointer bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]">
                <FiFilter className="text-[25px] " />
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

      {showStatBar && showAddButton && (
        <div className="mt-5 mb-5">
          <Box className="w-auto md:columns-4 sm:columns-2 font-primary">
            <div className="bg-white border-b-[3px] border-b-sky-300 sm:mt-0 mt-4 shadow-none rounded-md">
              <CardContent className="flex-grow-[1] flex justify-between items-center">
                <div>
                  <p className="text-2xl font-extralight text-[#455a64]">9</p>
                  <p className="text-md font-Mulish text-slate-500 text-opacity-70">New</p>
                </div>
              </CardContent>
            </div>

            <div className="bg-white border-b-[3px] border-b-amber-400 sm:mt-0 mt-4 shadow-none rounded-md">
              <CardContent className="flex-grow-[1] flex justify-between items-center">
                <div>
                  <p className="text-2xl text-[#455a64]">6</p>
                  <p className="text-md font-Mulish text-slate-500 text-opacity-70">In Progress</p>
                </div>
              </CardContent>
            </div>

            <div className="bg-white border-b-[3px] border-b-red-400 sm:mt-0 mt-4 shadow-none rounded-md">
              <CardContent className="flex-grow-[1] flex justify-between items-center">
                <div>
                  <p className="text-2xl text-[#455a64]">3</p>
                  <p className="text-md font-Mulish text-slate-500 text-opacity-70">
                    Not Completed
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="bg-white border-b-[3px] border-b-green-400 sm:mt-0 mt-4 shadow-none rounded-md">
              <CardContent className="flex-grow-[1] flex justify-between items-center">
                <div>
                  <p className="text-2xl text-[#455a64]">10</p>
                  <p className="text-md font-Mulish text-slate-500 text-opacity-70">Completed</p>
                </div>
              </CardContent>
            </div>
          </Box>
        </div>
      )}

      <CreateProject scroll={scroll} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Topbar;
