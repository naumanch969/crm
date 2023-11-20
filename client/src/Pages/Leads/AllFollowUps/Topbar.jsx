import React, { useEffect, useState } from "react";

import { Add, Close, Delete } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../../utils";
import { Chip, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLeads, getLeads, searchLead } from "../../../redux/action/lead";
import { PiArchive, PiChartBar, PiMagnifyingGlass } from "react-icons/pi";
import { FiFilter, FiList, FiUser } from "react-icons/fi";
import { searchLeadReducer } from "../../../redux/reducer/lead";
import Filter from "./Filter";
const Topbar = () => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { leads } = useSelector((state) => state.lead);
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showOptionButtons = !pathArr.includes("create");
  const dispatch = useDispatch();

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);
  const [openFilter, setOpenFilter] = useState(false);

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
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  return (
    <div>
      <div className="flex flex-col w-full tracking-wide pb-8 font-primary">
        <div className="w-full text-[14px]">
          <Path />
        </div>

        <div className="md:flex justify-between items-center flex-none">
          <h1 className="text-primary-blue text-[32px] capitalize font-light">Call Reminders</h1>

          {showOptionButtons && (
            <div className="flex items-center justify-end gap-2 md:mt-0 mt-4">
              <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
                <FormControl>
                  <Input
                    name="search"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <PiMagnifyingGlass className="text-[25px]" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <Tooltip title="Filter" arrow placement="top">
                <div
                  onClick={handleOpenFilter}
                  className={` p-2 rounded-md cursor-pointer ${openFilter
                    ? "text-[#20aee3] bg-[#e4f1ff]"
                    : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                    }`}>
                  <FiFilter className="text-[25px] " />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <Filter open={openFilter} setOpen={setOpenFilter} />
    </div>
  );
};

export default Topbar;
