import React from "react";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiArchive, PiMagnifyingGlass } from "react-icons/pi";

const Topbar = () => {

  ////////////////////////////////////////// VARIABLES //////////////////////////////////////

  ////////////////////////////////////////// STATES //////////////////////////////////////

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////

  return (
    <div className="flex flex-col tracking-wide pb-8 font-primary">
      <div className="flex items-center justify-between gap-2 md:mt-0 mt-4 w-full ">
        <h1 className="text-3xl  text-primary-blue font-semibold">My Leads</h1>

        <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
          <FormControl>
            <Input
              name="search"
              placeholder="Search Leads"
              startAdornment={
                <InputAdornment position="start">
                  <PiMagnifyingGlass className="text-[25px]" />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
