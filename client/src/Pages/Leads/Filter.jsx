import React, { useState } from "react";
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

  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    city: '',
    status: '',
    startingDate: '',
    endingDate: '',
    minBudget: '',
    maxBudget: '',
    propertyType: '',
    homeType: '',
    beds: '',
    minArea: '',
    maxArea: '',
  });



  const handleInputChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    dispatch(filterLead(filters));
    setOpen(false);
  };

  const demoStatus = ["Successful", "Unsuccessful", "Under Process", "Remaining", "Declined"];
  const demoPropertyType = ["Residential", "Commercial", "Agricultural", "Industrial"];
  const demoHomeType = ["Apartment", "House", "Farm House", "Plot", "Shop", "Office"];

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div style={{ minWidth: "50vh", maxWidth: "60vh" }}>
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
              <TextField
                {...params}
                fullWidth
                label="City"
                value={filters.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            )}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoStatus}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Status"
                value={filters.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
            )}
          />

          <div className="flex flex-col">
            <div>Date : </div>
            <div className="flex gap-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DesktopDatePicker']}>
                    <DesktopDatePicker
                      slotProps={{ textField: { size: "small", maxWidth: 200 } }}
                      label="Starting Date"
                      value={filters.startingDate}
                      onChange={(date) => handleInputChange('startingDate', date.$d)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      className="w-3/6"
                      label="Ending Date"
                      value={filters.endingDate}
                      onChange={(date) => handleInputChange('endingDate', date.$d)}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>Budget : </div>
            <div className="flex gap-3">
              <div>
                <TextField value={filters.minBudget} onChange={(e) => handleInputChange('minBudget', e.target.value)} label="Minimum" type="number" size="small" />
              </div>
              <div>
                <TextField value={filters.maxBudget} onChange={(e) => handleInputChange('maxBudget', e.target.value)} label="Maximum" type="number" size="small" />
              </div>
            </div>
          </div>

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoPropertyType}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Propery Type"
                value={filters.propertyType}
                onChange={(e) => handleInputChange("propertyType", e.target.value)}
              />
            )}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoHomeType}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Home Type"
                value={filters.homeType}
                onChange={(e) => handleInputChange("homeType", e.target.value)}
              />
            )}
          />

          <TextField
            size="small"
            type="number"
            fullWidth
            label="Number of Beds"
            value={filters.beds}
            onChange={(e) => handleInputChange("beds", e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <div>Area : </div>
            <div className="flex gap-3">
              <div>
                <TextField value={filters.minArea} onChange={(e) => handleInputChange('minArea', e.target.value)} label="Minimum" type="number" size="small" />
              </div>
              <div>
                <TextField value={filters.maxArea} onChange={(e) => handleInputChange('maxArea', e.target.value)} label="Maximum" type="number" size="small" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              variant="contained"
              className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
              Reset
            </button>
            <button
              variant="contained"
              className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;