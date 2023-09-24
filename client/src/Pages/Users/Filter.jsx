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
import { filterEmployeeReducer } from "../../redux/reducer/user";

const FilterDrawer = ({ open, setOpen, setIsFiltered }) => {

  //////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const dispatch = useDispatch()
  const initialFilterState = { city: '', salaryType: '', martialStatus: '', gender: '' }
  //////////////////////////////// STATES ///////////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState)

  //////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////

  //////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const handleFilter = () => {
    dispatch(filterEmployeeReducer(filters))
    setIsFiltered(true)
    setFilters(initialFilterState)
    setOpen(false)
  }
  const handleChange = (field, value) => {
    setFilters(pre => ({ ...pre, [field]: value }))
  }


  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div style={{ minWidth: "50vh", maxWidth: "60vh" }}>
        <div className="flex justify-between items-center h-[10vh] bg-[#20aee3] p-5 text-white font-thin">
          <div className="flex items-center text-[25px] gap-2">
            <PiFunnelLight className="text-[25px]" />
            Filter Employees
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
            renderInput={(params) => <TextField {...params} fullWidth label="City" />}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["Online", "Cash", "Cheque", "Bank Transfer"]}
            onSelect={(e) => handleChange('salaryType', e.target.value)}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Salary Type" />}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["male", "female"]}
            onSelect={(e) => handleChange('gender', e.target.value)}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Gender" className="capitalize" />}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            onSelect={(e) => handleChange('martialStatus', e.target.value)}
            options={["married", "single"]}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Martial Status"  className="capitalize"/>}
          />
          <div className="flex gap-4 justify-end">
            <button
              variant="contained"
              className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
              Reset
            </button>
            <button
              variant="contained"
              className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              onClick={handleFilter}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
