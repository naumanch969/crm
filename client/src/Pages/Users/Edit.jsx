import { Close } from "@mui/icons-material";
import { Autocomplete, IconButton, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateUser } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions } from "@mui/material";
import { pakistanCities } from "../../constant";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  /////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { currentEmployee, isFetching, error } = useSelector((state) => state.user);
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
  };

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(currentEmployee);
  /////////////////////////////////////// USE EFFECT ///////////////////////////////////////
  useEffect(() => {
    setEmployeeData(currentEmployee);
  }, [currentEmployee]);

  /////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentEmployee._id, employeeData, employeeData?.role));
    setEmployeeData(initialEmployeeState);
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Employee</div>
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
                  value={employeeData?.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Last Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">User Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">City </td>
              <td className="pb-4">
                <CFormSelect
                  size="sm"
                  value={employeeData?.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                  {pakistanCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Gender </td>
              <td className="pb-4">
                <CFormSelect
                  size="sm"
                  value={employeeData?.gender}
                  onSelect={(e) => handleInputChange("gender", e.target.value)}
                  className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Email </td>
              <td className="pb-4">
                <TextField
                  type="email"
                  size="small"
                  fullWidth
                  value={employeeData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Password </td>
              <td className="pb-4">
                <TextField
                  value={employeeData?.password}
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
                  value={employeeData?.CNIC}
                  onChange={(e) => handleInputChange("CNIC", e.target.value)}
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
                  value={employeeData?.phone}
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
                  value={employeeData?.officialNumber}
                  onChange={(e) => handleInputChange("officialNumber", e.target.value)}
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Martial Status </td>
              <td className="pb-4">
                <CFormSelect
                  size="sm"
                  value={employeeData?.martialStatus}
                  onSelect={(e) => handleInputChange("martialStatus", e.target.value)}
                  className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Salary Type </td>
              <td className="pb-4">
                <CFormSelect
                  size="sm"
                  value={employeeData?.salaryType}
                  onSelect={(e) => handleInputChange("salaryType", e.target.value)}
                  className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                  <option value="online">Online</option>
                  <option value="paycheck">Pay Check</option>
                  <option value="cash">Cash</option>
                </CFormSelect>
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
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
