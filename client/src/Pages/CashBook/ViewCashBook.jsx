import { KeyboardArrowRight } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Table from './Table'

const ViewCashBook = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let CompleteDate = `${date} / ${month} / ${year}`;

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start gap-[4px] ">
          <h1 className="text-primary-blue text-[24px] ">Cashbook</h1>
          <div className="flex justify-start items-center gap-[8px] ">
            <span className="capitalize text-[15px] text-primary-gray ">App</span>
            <KeyboardArrowRight className="text-primary-gray " />
            <span className="capitalize text-black ">View Cashbook</span>
          </div>
        </div>

        <div className="flex justify-end items-center gap-[6px] ">
          <div className="flex justify-start items-center gap-[6px] text-2xl">
            <span className="font-bold">Today's Date : </span>
            {CompleteDate}
          </div>
        </div>
      </div>

      <div className="w-full h-44 bg-white rounded-md mt-10 pt-px shadow-md">
        <div className="m-5">
          <div className="flex justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Select Date" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="w-80" variant="contained" color="primary">
              View This Date's CashBook
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <Table />
      </div>
    </div>
  );
};

export default ViewCashBook;
