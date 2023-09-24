import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    email: "",
    password: "",
    cnic: "",
    phone: "",
    officialNumber: "",
    gender: "male",
    martialStatus: "married",
    salaryType: "",
    activeStatus: false,
  }

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee(employeeData, setOpen));
  };

  const handleInputChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value, }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Employee</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Employee Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    size="small"
                    // value={employeeData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    displayEmpty
                    placeholder="Seller City"
                    fullWidth>
                    {pakistanCities.map((city) => (
                      <MenuItem value={city.toLowerCase()}>{city}</MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Gender </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={["male", "female"]}
                    onSelect={(e) => handleInputChange("gender", e.target.value)}
                    className="w-full"
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    size="small"
                    fullWidth
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-4">
                  <TextField
                    type="password"
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    onChange={(e) => handleInputChange("cnic", e.target.value)}
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Official Number </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    onChange={(e) => handleInputChange("officialNumber", e.target.value)}
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Martial Status </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={["Married", "Unmarried"]}
                    onSelect={(e) => handleInputChange("martialStatus", e.target.value)}
                    className="w-full"
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Salary Type </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={["Online", "Pay Check", "Cash"]}
                    onSelect={(e) => handleInputChange("salaryType", e.target.value)}
                    className="w-full"
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateUser;
