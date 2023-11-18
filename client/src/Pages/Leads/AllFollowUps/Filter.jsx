import React, { useState } from "react";
import { Drawer, TextField, Autocomplete, Select, MenuItem } from "@mui/material";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { countries } from "../../../constant";

const Filter = ({ open, setOpen }) => {

  //////////////////////////////// VARIABLES ///////////////////////////////////////////////////

  const initialFilterState = { city: '', startingDate: '', endingDate: '', status: '', priority: '', country: '', degree: '', visa: ''}
  //////////////////////////////// STATES ///////////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState)

  //////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////

  //////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////


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
            onSelect={(e) => handleChange('city', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="City" />
            )}
          />
          {/* <Autocomplete
            size="small"
            disablePortal
            options={priorities}
            getOptionLabel={(option) => option.name} // Customize the displayed option
            getOptionSelected={(option, value) => option.value === value} // Compare by the 'value' property
            onChange={(e, input) => handleChange('priority', input.value)} // Handle the selected value
            className="w-full"
            renderInput={(params) => <TextField   {...params} autoComplete="false" label="Priority" fullWidth />}
          /> */}

          <div className="flex flex-col">
            <div>Date : </div>
            <div className="flex gap-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      onChange={(date) => handleChange("startingDate", date.$d)}
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
                      onChange={(date) => handleChange("endingDate", date.$d)}
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
            options={countries.map((country) => country.name)}
            onSelect={(e) => handleChange('country', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Country" />
            )}
          />
          {/* <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={degrees}
            onSelect={(e) => handleChange('degree', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Degree" />
            )}
          /> */}
          {/* <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={visa}
            onSelect={(e) => handleChange('visa', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Visa" />
            )}
          /> */}
          {/* <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={statuses}
            onSelect={(e) => handleChange('status', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Status" />
            )}
          /> */}
{/* 
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={sources}
            onSelect={(e) => handleChange('source', e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} autoComplete="false" fullWidth label="Source" />
            )}
          /> */}

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

export default Filter;
