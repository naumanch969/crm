import React, { useState } from "react";
import { Drawer, TextField, Autocomplete } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterProject } from "../../../redux/action/project";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SocietyFilter = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const initialState = {
    city: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    homeType: "",
    beds: "",
    minArea: "",
    maxArea: "",
  };

  const [filters, setFilters] = useState({
    initialState,
  });

  const handleInputChange = (field, value) => {
    const inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, "");
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };

  const handleApplyFilters = () => {
    console.log("filters", filters);
    dispatch(filterProject(filters));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const demoPropertyType = ["Residential", "Commercial", "Agricultural", "Industrial"];
  const demoHomeType = ["Apartment", "House", "Farm House", "Plot", "Shop", "Office"];

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="font-primary" style={{ minWidth: "50vh", maxWidth: "60vh" }}>
        <div className="flex justify-between items-center h-[10vh] bg-[#20aee3] p-5 text-white">
          <div className="flex items-center text-[25px] gap-2 font-light">
            <PiFunnelLight className="text-[25px]" />
            <div> Filter Items </div>
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <div>Creation Date : </div>
            <div className="flex gap-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      slotProps={{ textField: { size: "small", maxWidth: 200 } }}
                      label="Starting"
                      value={filters.startingDate}
                      onChange={(date) => handleInputChange("startingDate", date.$d)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      className="w-3/6"
                      label="Ending"
                      slotProps={{ textField: { size: "small" } }}
                      value={filters.endingDate}
                      onChange={(date) => handleInputChange("endingDate", date.$d)}
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
            options={["Active", "Not Active"]}
            onSelect={(e) => handleInputChange("city", e.target.value)}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Status" />}
          />

          <div className="flex gap-4 justify-end">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
              onClick={handleClose}>
              Cancel
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
              onClick={handleApplyFilters}
              autoFocus>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SocietyFilter;
