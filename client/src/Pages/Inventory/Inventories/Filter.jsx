import React, { useEffect, useState } from "react";
import { Drawer, Button, TextField, Autocomplete,  } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { filterInventory } from "../../../redux/action/inventory";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getProjects } from "../../../redux/action/project";
import { Loader } from "../../../utils";
import { filterInventoryReducer } from "../../../redux/reducer/inventory";

const FilterDrawer = ({ open, setOpen, setIsFiltered }) => {

  //////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { projects, isFetching: projectsFetching } = useSelector(state => state.project)
  const initialFilterState = {
    sellerCity: '',
    startingDate: '',
    endingDate: '',
    minPrice: '',
    maxPrice: '',
    status: '',
    project: ''
  }

  //////////////////////////////////////////// STATES /////////////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState);

  //////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getProjects())
  }, [])

  //////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
  const handleChange = (field, value) => {
    setFilters((pre) => ({ ...pre, [field]: value, }));
  };

  const handleFilter = () => {
    dispatch(filterInventoryReducer(filters))
    setIsFiltered(true)
    setFilters(initialFilterState)
    setOpen(false)
  }

  const handleClose = () => {
    setFilters(initialFilterState);
    setOpen(false);
  };

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
            onSelect={(e) => handleChange("sellerCity", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Seller City" value={filters.sellerCity} />
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
                      onChange={(date) => handleChange("startingDate", date.$d)}
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
                      onChange={(date) => handleChange("endingDate", date.$d)}
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
                  onChange={(e) => handleChange("minPrice", e.target.value)}
                  label="Minimum"
                  type="number"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  value={filters.maxPrice}
                  onChange={(e) => handleChange("maxPrice", e.target.value)}
                  label="Maximum"
                  type="number"
                  size="small"
                />
              </div>
            </div>
          </div>


          <Autocomplete
            size="small"
            disablePortal={false}
            options={projects}
            value={filters.project}
            getOptionLabel={(project) => project.title ? project.title : project}
            onChange={(e, project) => handleChange('project', project.title)}
            className="w-full"
            renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["sold", "unsold", "underProcess"]}
            onSelect={(e) => handleChange("status", e.target.value)}
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
              onClick={handleFilter}
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
