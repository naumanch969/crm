import React, { useState, useEffect } from "react";
import { Drawer, Button, TextField, Autocomplete } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { filterTask } from "../../redux/action/task";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FilterDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const initialState = {
    status: "",
    priority: "",
    startingDate: "",
    endingDate: "",
  };

  const [filters, setFilters] = useState(initialState);

  const handleInputChange = (field, value) => {
    let inputValue;
    if (field == "startingDate" || field == "endingDate") inputValue = value;
    else inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, "");
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };
  const handleApplyFilters = () => {
    dispatch(filterTask(filters));
    setOpen(false);
  };

  const demoTasks = [
    "New",
    "Sent Availablity List",
    "Site Visit",
    "Token Received",
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
  const demoNextTasks = [
    "Do Nothing",
    "Send Availablity List",
    "Contact Client",
    "Follow Up",
    "Arrange Meeting",
    "Push Meeting",
    "Meet Client",
    "Sign Agreement",
    "Receive Token",
  ];
  const demoStatus = ["Successfull", "Unsuccessfull"];

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
            options={demoTasks}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Task" />}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoStatus}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Status" />}
          />

          <div className="flex flex-col">
            <div>Completed Task Date : </div>
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
            options={demoNextTasks}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Next Task" />}
          />

          <div className="flex flex-col">
            <div>Deadline Date for New Task : </div>
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
