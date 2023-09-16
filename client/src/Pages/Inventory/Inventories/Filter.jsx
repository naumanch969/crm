import React, { useState } from "react";
import { Drawer, Button, TextField, Autocomplete } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { filterInventory } from "../../../redux/action/inventory";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FilterDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleInputChange = (field, value) => {
    const inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, "");
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };

  const handleApplyFilters = () => {
    dispatch(filterInventory(filters));
    setOpen(false);
  };

  const handleClose = () => {
    setFilters({
      city: "",
      minPrice: "",
      maxPrice: "",
    });
    setOpen(false);
  };

  const ProjectOptions = [
    "Blue World City (Blue World City - Blue World City)",
    "Kingdom Valley (Kingdom Valley - Kingdom Valley)",
    "Ruden Enclave (Ruden Enclave - Ruden Enclave)",
    "Smart City (Smart City - Smart City Canal Road Lahore)",
    "Blue Town (Blue Town - Blue Town Sapphire)",
    "Alnoor Orchard (Alnoor Orchard - Alnoor Orchard)",
    "Lahore Ent City (Lahore Ent City - Lahore Ent City)",
    "Soul City Lahore (Blue World City - Blue World City)",
    "Mid City (Mid City Lahore - Mid City Lahore)",
    "Urban City (Urban City Lahore - Urban City Lahore)",
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
            onSelect={(e) => handleInputChange("city", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Seller City" value={filters.city} />
            )}
          />

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

          <div className="flex flex-col gap-2">
            <div>Price : </div>
            <div className="flex gap-3">
              <div>
                <TextField
                  value={filters.minPrice}
                  onChange={(e) => handleInputChange("minPrice", e.target.value)}
                  label="Minimum"
                  type="number"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  value={filters.maxPrice}
                  onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                  label="Maximum"
                  type="number"
                  size="small"
                />
              </div>
            </div>
          </div>

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={ProjectOptions}
            onSelect={(e) => handleInputChange("city", e.target.value)}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Projects" />}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["Sold", "Unsold", "Under Process"]}
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

export default FilterDrawer;
