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
        project: '',
        region: '',
        // Add more fields from lead model here
    });



    const handleInputChange = (field, value) => {
      const inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, '');
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: inputValue,
      }));
    };

  const handleApplyFilters = () => {
    dispatch(filterLead(filters));
    setOpen(false);
  };

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
            options={["Married", "Unmarried"]}
            onSelect={(e) => handleInputChange("status", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Martial Status"
                value={filters.city}
               />
            )}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["Online", "Cash", "Cheque", "Bank Transfer"]}
            onSelect={(e) => handleInputChange("salaryType", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Salary Type"
                value={filters.city}
               />
            )}
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
