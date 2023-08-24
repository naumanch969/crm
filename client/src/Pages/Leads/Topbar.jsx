import React from "react";
import { Add } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../utils";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass } from "react-icons/pi";

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item !== "");

  const handleAddClick = () => {
    navigate(`${pathname}/create`);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className="flex justify-between items-center ">
        <h1 className="text-primary-blue text-[32px] capitalize">{title}</h1>

        <div className="flex items-center gap-2">
          <div className="bg-[#ebf2f5] p-2 rounded-md">
            <FormControl>
              <Input
                startAdornment={
                  <InputAdornment position="start">
                    <PiMagnifyingGlass className="text-[25px]" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Tooltip title="Archived" arrow placement="bottom">
            <div className="bg-[#e4f1ff] p-2 rounded-md cursor-pointer">
              <PiArchive className="text-[25px] text-[#20aee3]" />
            </div>
          </Tooltip>
          <Tooltip title="My Leads" arrow placement="top">
            <div className="bg-[#ebf2f5] p-2 rounded-md cursor-pointer">
              <FiUser className="text-[25px] text-[#a6b5bd]" />
            </div>
          </Tooltip>
          <Tooltip title="Kanban View" arrow placement="bottom">
            <div className="bg-[#ebf2f5] p-2 rounded-md cursor-pointer">
              <FiList className="text-[25px] text-[#a6b5bd]" />
            </div>
          </Tooltip>
          <Tooltip title="Filter" arrow placement="top">
            <div className="bg-[#ebf2f5] p-2 rounded-md cursor-pointer">
              <FiFilter className="text-[25px] text-[#a6b5bd]" />
            </div>
          </Tooltip>
          <div>
            <Tooltip title="Add New Lead" placement="bottom" arrow>
              <Link to="/leads/create">
                <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                  <Add />
                </button>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
