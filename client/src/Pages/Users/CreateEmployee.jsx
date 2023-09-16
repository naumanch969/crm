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
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = [
    { title: "Allowed Users", numbers: 100 },
    { title: "Blocked Users", numbers: 0 },
    { title: "Active Users", numbers: 0 },
    { title: "Remaining Quota", numbers: 100 },
  ];

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cnic: "",
    phone: "",
    officialNumber: "",
    gender: "male",
    martialStatus: "married",
    salaryType: "",
    activeStatus: false,
  });

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee(employeeData, setOpen));
  };

  const handleChange = (e) => {
    e.target.type == "checkbox"
      ? setEmployeeData({ ...employeeData, [e.target.name]: e.target.checked })
      : setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (field, value) => {
    const inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, '');
    setEmployeeData((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
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
                <td className="flex items-start pt-2 text-lg">Gender </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={["Male", "Female"]}
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

    // <div className="flex flex-col gap-[1rem] w-full"  >

    //     <Topbar />

    //     <div className='flex flex-col gap-[2rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

    //         <div className="flex lg:flex-nowrap flex-wrap justify-between gap-[24px] w-full">
    //             {
    //                 stats.map((stat, index) => (
    //                     <div key={index} className="flex flex-col items-center lg:flex-[1] sm:w-[47%] w-full px-[2rem] py-[1rem] shadow-box rounded-[4px]  ">
    //                         <span className='text-gray-500 font-semibold text-[20px] text-center ' >{stat.title}</span>
    //                         <span className='text-[22px] font-semibold ' >{stat.numbers}</span>
    //                     </div>
    //                 ))
    //             }
    //         </div>

    //         <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full px-[2rem] py-[1rem] ' >

    //             <div className="w-full flex sm:flex-nowrap flex-wrap gap-[3rem]  ">
    //                 <div className="sm:w-[47%] md:w-[47.5%] w-full flex flex-col gap-[1rem]  ">
    //                     {/* firstname */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="firstName">First Name</label>
    //                         <input type="text" onChange={handleChange} value={employeeData.firstName} name="firstName" id="firstName" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* username */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="username">User Name</label>
    //                         <input type="text" onChange={handleChange} value={employeeData.username} name="username" id="username" placeholder='User Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* email */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="email">Email</label>
    //                         <input type="email" onChange={handleChange} value={employeeData.email} name="email" id="email" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* official number */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="officialNumber">Official Number</label>
    //                         <input type="number" onChange={handleChange} value={employeeData.officialNumber} name="officialNumber" id="officialNumber" placeholder='Official Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* branch */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="branch">Select Branch</label>
    //                         <select onChange={handleChange} value={employeeData.branch} name="branch" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
    //                             <option value="">Select Branch</option>
    //                             <option value="lahore">Lahore</option>
    //                             <option value="islamabad">Islamabad</option>
    //                         </select>
    //                     </div>
    //                     {/* gender and martial status */}
    //                     <div className="flex justify-between items-center gap-[4px] ">
    //                         {/* gender */}
    //                         <div className="flex-[1] ">
    //                             <label className='text-black font-medium text-[16px] ' htmlFor='gender' >Gender</label>
    //                             <div className="flex gap-[8px] py-[8px] ">
    //                                 <div className="flex gap-[2px] ">
    //                                     <label className='text-gray-500 font-light text-[16px] ' htmlFor="male">Male</label>
    //                                     <input type="radio" onChange={handleChange} value={employeeData.gender} name="gender" id="male" />
    //                                 </div>
    //                                 <div className="flex gap-[2px] ">
    //                                     <label className='text-gray-500 font-light text-[16px]  ' htmlFor="female">Female</label>
    //                                     <input type="radio" onChange={handleChange} value={employeeData.gender} name="gender" id="female" />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         {/* martial status */}
    //                         <div className="flex-[1] ">
    //                             <label className='text-black font-medium text-[16px] ' htmlFor='gender' >Martial Status</label>
    //                             <div className="flex gap-[8px] py-[8px] ">
    //                                 <div className="flex gap-[2px] ">
    //                                     <label className='text-gray-500 font-light text-[16px] ' htmlFor="single">Single</label>
    //                                     <input type="radio" onChange={handleChange} value={employeeData.martialStatus} name="martialStatus" id="single" />
    //                                 </div>
    //                                 <div className="flex gap-[2px] ">
    //                                     <label className='text-gray-500 font-light text-[16px]  ' htmlFor="married">Married</label>
    //                                     <input type="radio" onChange={handleChange} value={employeeData.martialStatus} name="martialStatus" id="married" />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="sm:w-[47%] md:w-[47.5%] w-full flex flex-col gap-[1rem]  ">
    //                     {/* last name */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="lastName">Last Name</label>
    //                         <input type="text" onChange={handleChange} value={employeeData.lastName} name="lastName" id="lastName" placeholder='Last Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* password */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="password">Password</label>
    //                         <input type="password" onChange={handleChange} value={employeeData.password} name="password" id="password" placeholder='Password' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* cnic */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="cnic">CNIC</label>
    //                         <input type="number" onChange={handleChange} value={employeeData.cnic} name="cnic" id="cnic" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* mobile number */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="phone">Mobile Number</label>
    //                         <input type="number" onChange={handleChange} value={employeeData.phone} name="phone" id="phone" placeholder='Mobile Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* salary type */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="firstName">Salary Type</label>
    //                         <select onChange={handleChange} value={employeeData.salaryType} name="salaryType" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
    //                             <option value="">Select Salary Type</option>
    //                             <option value="payCheck">Pay Check</option>
    //                             <option value="online">Online</option>
    //                         </select>
    //                     </div>
    //                     {/* active and cnic */}
    //                     <div className="flex flex-col gap-[4px] w-full items-start ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor='activeStatus' >Active Status</label>
    //                         <div className="item-start h-[40px] ">
    //                             <input type="checkbox" onChange={handleChange} value={employeeData.activeStatus} name="activeStatus" id="activeStatus" className='' />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className="w-full flex justify-end items-center">
    //                 <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //                     {isFetching ? 'Saving' : 'Save'}
    //                 </button>
    //             </div>

    //         </form>

    //     </div>

    // </div>
  );
};

export default CreateUser;
