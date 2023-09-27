import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Add, TableBar, ViewKanban } from "@mui/icons-material";
import { Path } from "../../utils";
import { IconButton } from "@mui/material";
import CreateVoucher from "./CreateVoucher";
import { searchVoucherReducer } from "../../redux/reducer/voucher";

const Topbar = (view, setView) => {

  //////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split("/")[1];
  const pathArr = pathname.split("/").filter((item) => item != "");
  const showAddButton = !pathArr.includes("create");

  //////////////////////////////////// STATES ///////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  //////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////

  //////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
  const handleSearch = (searchTerm) => {
    // dispatch(searchVoucherReducer(searchTerm));
  }
  const handleAddClick = () => {
    navigate(`${pathname}/create`);
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

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-primary-blue text-[32px] capitalize">{title}</h1>

        {showAddButton && (
          <button
            onClick={handleCreateopen("body")}
            className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg">
            <Add />
          </button>
        )}
      </div>
      <CreateVoucher open={open} setOpen={setOpen} scroll={scroll} />
    </div>
  );
};

export default Topbar;
