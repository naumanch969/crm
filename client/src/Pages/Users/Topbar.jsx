import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Add, Close } from "@mui/icons-material";
import { Path } from "../../utils";
import { Chip, FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";
import CreateUser from "./CreateEmployee";
import Filter from "./Filter";
import { searchUserReducer } from "../../redux/reducer/user";

const Topbar = ({ view, setView, setIsFiltered, isFiltered }) => {

  ///////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const { pathname } = useLocation();
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showClientTopBar = !pathArr.includes("employees");
  const showEmployeeTopBar = !pathArr.includes("clients");
  const showCreatePageTopBar = !pathArr.includes("create");
  const title = pathArr.includes("create")
    ? `Create ${pathname.split("/")[1].slice(0, -1)}`
    : pathname.split("/")[1];
  const descriptionElementRef = useRef(null);

  ///////////////////////////////////////// STATES ///////////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [scroll, setScroll] = useState("paper");

  ///////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  ///////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const handleSearch = (searchTerm) => {
    dispatch(searchUserReducer(searchTerm));
  }
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

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-primary-blue text-[32px] capitalize font-light">{title}</h1>

        {showEmployeeTopBar && (
          <div className="flex items-center gap-2">
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
                  placeholder="Search Employees"
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
                onClick={handleToggleFilters}
                className={` p-2 rounded-md cursor-pointer ${openFilters
                  ? "text-[#20aee3] bg-[#e4f1ff]"
                  : "bg-[#ebf2f5] hover:bg-[#dfe6e8] text-[#a6b5bd]"
                  }`}>
                <FiFilter className="text-[25px] " />
              </div>
            </Tooltip>
            <div>
              <Tooltip title="Add New Employee" placement="top" arrow>
                <div onClick={handleCreateopen("body")}>
                  <button className="bg-primary-red hover:bg-red-400 transition-all text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-xl">
                    <Add />
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        )}

        {showClientTopBar && showCreatePageTopBar && (
          <div className="flex items-center gap-2">
            <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-auto">
              <FormControl>
                <Input
                  name="search"
                  fullWidth="true"
                  placeholder="Search Clients"
                  startAdornment={
                    <InputAdornment position="start">
                      <PiMagnifyingGlass className="text-[25px]" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        )}
      </div>
      <CreateUser open={open} scroll={scroll} setOpen={setOpen} />
      <Filter open={openFilters} setOpen={setOpenFilters} setIsFiltered={setIsFiltered} />
    </div>
  );
};

export default Topbar;
