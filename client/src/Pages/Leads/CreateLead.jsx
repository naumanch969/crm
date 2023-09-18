import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOnsiteLead, getLeads } from "../../redux/action/lead";
import Topbar from "./Topbar";
import { getEmployees, register } from "../../redux/action/user";
import { pakistanCities } from "../../constant";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiUser, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateLead = ({ setOpen, open, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.lead);
  const { employees, loggedUser } = useSelector((state) => state.user);
  const role = loggedUser?.role;
  const employeeNames = employees
    .filter((employee) => employee.username !== null && employee.username !== undefined)
    .map(({ _id, username }) => ({ _id, username }));

    let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    cnic: "",
    city: "",
  });
  const [leadData, setLeadData] = useState({
    city: "",
    property: "",
    priority: "",
    description: "",
    allocatedTo: loggedUser._id,
    leadCreated: dateTime,
    status: "",
    statusCreated: dateTime,
    source: "",
  });

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
  }, [employees]);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createOnsiteLead({ ...leadData, ...clientData }, navigate));

    setClientData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      cnic: "",
      city: "",
    });

    setLeadData({
      city: "",
      property: "",
      priority: "",
      description: "",
      allocatedTo: loggedUser._id,
      leadCreated: "",
      status: "",
      statusCreated: "",
      source: "",
    });

    setOpen(false);
  };

  const handleLeadDataChange = (e) => {
    const { name, value } = e.target;
    name == "source"
      ? leadData.source.includes(value)
        ? setLeadData((pre) => ({ ...pre, source: leadData.source.filter((s) => s != value) }))
        : setLeadData((pre) => ({ ...pre, source: [...leadData.source, value] }))
      : setLeadData((pre) => ({ ...pre, [name]: value }));
  };

  const handleClientDataChange = (e) => {
    setClientData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setClientData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      cnic: "",
      city: "",
    });

    setLeadData({
      city: "",
      property: "",
      priority: "",
      description: "",
      allocatedTo: loggedUser._id,
      leadCreated: "",
      status: "",
      statusCreated: "",
      source: "",
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Lead</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    name="firstName"
                    value={clientData.firstName}
                    onChange={handleClientDataChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    name="lastName"
                    value={clientData.lastName}
                    onChange={handleClientDataChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    onChange={handleClientDataChange}
                    value={clientData.phone}
                    name="phone"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    onChange={handleClientDataChange}
                    value={clientData.cnic}
                    name="cnic"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleClientDataChange}
                    value={clientData.city}
                    name="city"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    onChange={handleClientDataChange}
                    value={clientData.email}
                    name="email"
                    size="small"
                    placeholder="Optional"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>

          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad />
              <span>Client Requirements</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData.city}
                    name="city"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData.property}
                    name="property"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem>All Inventories</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData.priority}
                    name="priority"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="veryCold">Very Cold</MenuItem>
                    <MenuItem value="cold">Cold</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="hot">Hot</MenuItem>
                    <MenuItem value="veryHot">Very Hot</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                <Select
                    onChange={handleLeadDataChange}
                    value={leadData.status}
                    name="status"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="closedLost">Closed (Lost)</MenuItem>
                    <MenuItem value="FollowedUpCall">Followed Up (Call)</MenuItem>
                    <MenuItem value="ContactedCallAttempt">Contacted Client (Call Attempt)</MenuItem>
                    <MenuItem value="ContactedCall">Contacted Client (Call)</MenuItem>
                    <MenuItem value="FollowedUpEmail">Followed Up (Email)</MenuItem>
                    <MenuItem value="ContactedEmail">Contacted Client (Email)</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="MeetingDone">Meeting (Done)</MenuItem>
                    <MenuItem value="ClosedWon">Closed (Won)</MenuItem>
                    <MenuItem value="MeetingAttempt">Meeting (Attempt)</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4">
                <Select
                    onChange={handleLeadDataChange}
                    value={leadData.source}
                    name="source"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="facebookComment">Facebook Comment</MenuItem>
                    <MenuItem value="FriendAndFamily">Friend and Family</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="directCall">Direct Call</MenuItem>
                    <MenuItem value="google">Google</MenuItem>
                    <MenuItem value="referral">Referral</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData.description}
                    name="description"
                    type="text"
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
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
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateLead;
