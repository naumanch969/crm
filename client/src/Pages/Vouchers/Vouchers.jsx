import { Add, KeyboardArrowRight, Search } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Table from "./Table";

function Vouchers() {
  return (
    <div className="h-full w-[86%] float-left pb-28">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start gap-[4px] ">
          <h1 className="text-primary-blue text-[24px] ">Vouchers</h1>
          <div className="flex justify-start items-center gap-[8px] ">
            <span className="capitalize text-[15px] text-primary-gray ">App</span>
            <KeyboardArrowRight className="text-primary-gray " />
            <span className="capitalize text-black ">Vouchers</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-[10px] ">
          <div className="h-[32px] bg-secondary-gray rounded-[4px] flex ">
            <div className="w-[2rem] text-primary-gray h-full flex justify-center items-center ">
              <Search />
            </div>
            <input
              className="w-[10rem] text-primary-gray outline-none border-none bg-inherit h-full "
              type="text"
              placeholder="Search"
            />
          </div>
          <Tooltip placement="bottom" title="Create New Voucher" arrow>
            <Link to="/voucher/create">
              <button className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg ">
                <Add />
              </button>
            </Link>
          </Tooltip>
        </div>
      </div>

      <div>
        <div className="text-2xl font-normal flex justify-center mt-10 text-gray-600">
          All Vouchers Created
        </div>

        <div className="mt-5">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Vouchers;
