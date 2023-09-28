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
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    email: "",
    password: "",
    CNIC: "",
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
    const { firstName, lastName, username, city, email, password, CNIC, phone, officialNumber, gender, martialStatus, salaryType, activeStatus, } = employeeData
    if (!firstName || !lastName || !username || !city || !email || !password || !CNIC || !phone || !officialNumber || !gender || !martialStatus || !salaryType || !activeStatus)
      return alert("Make sure to provide all the fields")
    dispatch(createEmployee(employeeData, setOpen));
  };

  const handleChange = (field, value) => {
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
                    value={employeeData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <CFormSelect
                    value={employeeData.city}
                    placeholder='Seller City'
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    {pakistanCities.map((city, key) => (
                      <option key={key} value={city}>
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
                    value={employeeData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
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
                    value={employeeData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password </td>
                <td className="pb-4">
                  <TextField
                    type="password"
                    value={employeeData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
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
                    value={employeeData.CNIC}
                    onChange={(e) => handleChange("CNIC", e.target.value)}
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
                    value={employeeData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
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
                    value={employeeData.officialNumber}
                    onChange={(e) => handleChange("officialNumber", e.target.value)}
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Martial Status </td>
                <td className="pb-4">
                  <CFormSelect
                    value={employeeData.martialStatus}
                    placeholder='Martial Status'
                    onChange={(e) => handleChange("martialStatus", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    <option value={"married"}>Married</option>
                    <option value={"unmarried"}>Unmarried</option>
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Salary Type </td>
                <td className="pb-4">
                  <CFormSelect
                    value={employeeData.salaryType}
                    placeholder='Salary Type'
                    onChange={(e) => handleChange("salaryType", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>None</option>
                    <option value={"online"}>Online</option>
                    <option value={"cheque"}>Pay Cheque</option>
                    <option value={"cash"}>Cash</option>
                  </CFormSelect>
                </td>
              </tr>
              <FormGroup>
                <FormControlLabel
                  className="w-40 text-gray-400"
                  checked={employeeData.activeStatus ? true : false}
                  onChange={(e) => setEmployeeData({ ...employeeData, activeStatus: e.target.checked })}
                  control={<Checkbox style={{ color: "#20aee3" }} />}
                />
              </FormGroup>
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
