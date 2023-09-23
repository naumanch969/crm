import React, { useEffect, useState } from "react";
import { Drawer, Button, TextField, Autocomplete } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { filterLead } from "../../redux/action/lead";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FilterDrawer = ({ open, setOpen }) => {
  const priorities = ["Very Cold", "Cold", "Moderate", "Hot", "Very Hot"];
  const statuses = [
    "New",
    "Closed(Won)",
    "Closed(Lost)",
    "Followed Up(Call)",
    "Followed Up(Email)",
    "Contacted Client(Call)",
    "Contacted Client(Call Attempt)",
    "Contacted Client(Email)",
    "Meeting(Done)",
    "Meeting(Attempt)",
  ];
  const sources = [
    "Facebook",
    "Instagram",
    "Google",
    "Facebook Comments",
    "Friend and Family",
    "Direct Call",
    "Referral",
  ];

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="font-primary" style={{ minWidth: "50vh", maxWidth: "60vh" }}>
        <div className="flex justify-between items-center h-[10vh] bg-[#20aee3] p-5 text-white font-thin">
          <div className="flex items-center text-[25px] gap-2">
            <PiFunnelLight className="text-[25px]" />
            Filter Items
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={pakistanCities}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="City" />
            )}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={priorities}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Priority" />
            )}
          />
          <div className="flex flex-col">
            <div>Date : </div>
            <div className="flex gap-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      slotProps={{ textField: { size: "small", maxWidth: 200 } }}
                      label="From"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      className="w-3/6"
                      label="To"
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={"All Projects"}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Projects" />
            )}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={statuses}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Status" />
            )}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={sources}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Source" />
            )}
          />

          <div className="flex gap-4 justify-end">
            <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary">
              Cancel
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
              autoFocus>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
