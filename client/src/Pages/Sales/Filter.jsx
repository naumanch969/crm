import React, { useState } from "react";
import { Drawer, TextField, Select, MenuItem } from "@mui/material";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDispatch, useSelector } from "react-redux";
import { filterSaleReducer } from "../../redux/reducer/sale";

const FilterDrawer = ({ open, setOpen, setIsFiltered }) => {

  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch()
  const { employees } = useSelector(state => state.user)
  const initialFilterState = {
    staff: '',
    startingDate: '',
    endingDate: '',
    minNet: '',
    maxNet: '',
    minReceived: '',
    maxReceived: '',
    minProfit: '',
    maxProfit: '',
    top: '',
  }

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState)

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleChange = (field, value) => {
    setFilters(pre => ({ ...pre, [field]: value }))
  }
  const handleFilter = () => {
    dispatch(filterSaleReducer(filters))
    setIsFiltered(true)
    setFilters(initialFilterState)
    setOpen(false)
  }


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
          <table>
            <tr>
              <div className="flex flex-col gap-2">
                <div>Staff : </div>
                <Select
                  name="staff"
                  type="text"
                  onChange={(e) => handleChange('staff', e.target.value)}
                  size="small"
                  fullWidth>
                  <MenuItem value={''} >None</MenuItem>
                  {employees.map((employee, index) => (
                    <MenuItem value={employee.username} key={index}>{employee.username}{" "}</MenuItem>
                  ))}
                </Select>
              </div>
            </tr>
            <tr>
              <div className="pt-5 flex flex-col">
                <div>Date : </div>
                <div className="flex gap-3">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DesktopDatePicker"]}>
                        <DesktopDatePicker
                          slotProps={{ textField: { size: "small", maxWidth: 200 } }}
                          onChange={(date) => handleChange("startindDate", date.$d)}
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
            </tr>

            <tr>
              <div className="flex flex-col gap-2 pt-5">
                <div>Net Woth : </div>
                <div className="flex gap-3">
                  <div>
                    <TextField
                      label="Minimum"
                      type="number"
                      size="small"
                      value={filters.minNet}
                      onChange={(e) => handleChange('minNet', e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Maximum"
                      type="number"
                      size="small"
                      value={filters.maxNet}
                      onChange={(e) => handleChange('maxNet', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </tr>

            <tr>
              <div className="flex flex-col gap-2 pt-5">
                <div>Recieving Amount : </div>
                <div className="flex gap-3">
                  <div>
                    <TextField
                      label="Minimum"
                      type="number"
                      size="small"
                      value={filters.minReceived}
                      onChange={(e) => handleChange('minReceived', e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Maximum"
                      type="number"
                      size="small"
                      value={filters.maxReceived}
                      onChange={(e) => handleChange('maxReceived', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </tr>

            <tr>
              <div className="flex flex-col gap-2 pt-5">
                <div>Profit : </div>
                <div className="flex gap-3">
                  <div>
                    <TextField
                      label="Minimum"
                      type="number"
                      size="small"
                      value={filters.minProfit}
                      onChange={(e) => handleChange('minProfit', e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Maximum"
                      type="number"
                      size="small"
                      value={filters.maxProfit}
                      onChange={(e) => handleChange('maxProfit', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </tr>

            <tr>
              <div className="flex flex-col gap-2 pt-5">
                <div>Type of Payment : </div>
                <Select
                  onChange={(e) => handleChange('top', e.target.value)}
                  name="top"
                  type="text"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="cheque">Cheque</MenuItem>
                  <MenuItem value="card">Card</MenuItem>
                </Select>
              </div>
            </tr>
          </table>
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
