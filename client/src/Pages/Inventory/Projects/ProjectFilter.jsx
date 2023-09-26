import React, { useEffect, useState } from "react";
import { Drawer, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSocieties } from "../../../redux/action/society";
import { Loader } from "../../../utils";
import { filterProjectReducer } from "../../../redux/reducer/project";

const ProjectFilter = ({ open, setOpen, isFiltered, setIsFiltered }) => {

  //////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { societies } = useSelector(state => state.society)
  const initialFilterState = { city: '', startingDate: '', endingDate: '', status: '', }

  //////////////////////////////// STATES ///////////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState)

  //////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getSocieties())
  }, [])
  //////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const handleFilter = () => {
    dispatch(filterProjectReducer(filters))
    setIsFiltered(true)
    setFilters(initialFilterState)
    setOpen(false)
  }
  const handleChange = (field, value) => {
    setFilters((pre) => ({ ...pre, [field]: value }))
  }


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
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={pakistanCities}
            onSelect={(e) => handleChange("city", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField {...params} fullWidth label="City" value={filters.city} />
            )}
          />
          <Autocomplete
            size="small"
            disablePortal={false}
            options={societies}
            value={filters.society}
            getOptionLabel={(society) => society.title ? society.title : society}
            onChange={(e, society) => handleChange('society', society.title)}
            className="w-full"
            renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
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

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={["active", "inactive"]}
            onSelect={(e) => handleChange("status", e.target.value)}
            className="w-full"
            renderInput={(params) => <TextField {...params} fullWidth label="Status" />}
          />

          <div className="flex gap-4 justify-end">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
              onClick={() => setOpen(false)}>
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

export default ProjectFilter;
