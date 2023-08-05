import React from "react";
import { Tooltip } from "@mui/material";
import {
  Add,
  FilterAltOutlined,
  KeyboardArrowRight,
  Search,
  TrendingUp,
} from "@mui/icons-material";
import Cards from "./Cards";

function CashBook() {
  return (
    <div className="h-auto">
      <div className="flex justify-between items-center">

        <div className="flex flex-col justify-start gap-[4px] ">
          <h1 className="text-primary-blue text-[24px] ">Cashbook</h1>
          <div className="flex justify-start items-center gap-[8px] ">
            <span className="capitalize text-[15px] text-primary-gray ">App</span>
            <KeyboardArrowRight className="text-primary-gray " />
            <span className="capitalize text-black ">Cashbook</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-[6px] ">
          <div className="h-[32px] bg-secondary-gray rounded-[4px] flex ">
            <div className="w-[2rem] text-primary-gray h-full flex justify-center items-center ">
              <Search />
            </div>
            <input
              className="w-[7rem] text-primary-gray outline-none border-none bg-inherit h-full "
              type="text"
              placeholder="Search"
            />
          </div>

          <div className="flex justify-start items-center gap-[6px]">
            <Tooltip arrow placement="top" title="Import Users">
              <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
                <TrendingUp className="text-primary-gray " />
              </div>
            </Tooltip>
            <Tooltip arrow placement="top" title="Filter">
              <div className="w-[32px] h-[32px] flex justify-center items-center cursor-pointer bg-secondary-gray rounded-[4px] ">
                <FilterAltOutlined className="text-primary-gray " />
              </div>
            </Tooltip>
          </div>

          <button className="bg-red-500 text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg hover:bg-red-600">
            <Add />
          </button>
        </div>

      </div>

      <div className="mt-10">
        <Cards />
      </div>
    </div>
  );
}

export default CashBook;
