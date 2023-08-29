<<<<<<< HEAD
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
    city: "",
    project: "",
    region: "",
    // Add more fields from your lead model here
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

  const demoStatus = ["Completed", "Overdue", "Pending", "In Progress"];
  const demoPriority = ["High", "Medium", "Low"];

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
            options={demoStatus}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Status"
                value={filters.city}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
            )}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoPriority}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Priority"
                value={filters.city}
                onChange={(e) => handleInputChange("priority", e.target.value)}
              />
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
                      label="Starting Date"
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
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
=======
import React, { useState } from 'react';
import { Drawer, Button, TextField, IconButton, } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { filterLead } from '../../redux/action/lead'

const FilterDrawer = ({ open, setOpen }) => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        city: '',
        project: '',
        region: '',
        // Add more fields from lead model here
    });



    const handleInputChange = (field, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const handleApplyFilters = () => {
        dispatch(filterLead(filters));
        setOpen(false)
    };

    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <div style={{ padding: '16px', minWidth: '300px', maxWidth: '90vw' }}>
                <IconButton style={{ float: 'right', marginBottom: '8px' }} onClick={() => setOpen(false)}>
                    <Close />
                </IconButton>
                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={filters.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </Button>
            </div>
        </Drawer>
    );
>>>>>>> 98990283f8e9652ca1e4e89746537586ca8b3576
};

export default FilterDrawer;
