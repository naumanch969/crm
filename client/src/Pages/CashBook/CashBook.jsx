import React from "react";
import { Button, Tooltip } from "@mui/material";
import {
  Add,
  FilterAltOutlined,
  KeyboardArrowRight,
  Search,
  TrendingUp,
} from "@mui/icons-material";
import Cards from "./Cards";
import Table from "./Table";

function CashBook() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let CompleteDate = `${date} / ${month} / ${year}`;

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
          <div className="flex justify-start items-center gap-[6px] text-2xl">
            <span className="font-bold">Today's Date : </span>
            {CompleteDate}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Cards />
      </div>

      <div className="mt-6">
        <Table />
      </div>

      <div className="flex justify-center mt-5">
        <Button variant="contained" color="error">
          Close Today's Cashbook
        </Button>
      </div>
    </div>
  );
}

export default CashBook;
