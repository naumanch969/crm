import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLead, getLeads } from "../../redux/action/lead";
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
import { getInventories } from "../../redux/action/inventory";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateLead = ({ setOpen, open, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFetching } = useSelector(state => state.lead)
  const { inventories } = useSelector(state => state.inventory)
  const inventoriesNumbers = inventories.map(({ _id, propertyNumber }) => ({ _id, propertyNumber }));
  let initialLeadState = {
    clientFirstName: "",
    clientLastName: "",
    clientPhone: "",
    clientCNIC: "",
    clientCity: "",
    clientEmail: "",
    city: "",
    priority: "",
    property: "",
    status: "",
    source: "",
    description: "",
  }
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [leadData, setLeadData] = useState(initialLeadState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    dispatch(getInventories())
  }, [])

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const { clientFirstName, clientLastName, clientPhone, clientCNIC, clientCity, city, priority, property, status, source, description } = leadData
    if (!clientFirstName || !clientLastName || !clientPhone || !clientCNIC || !clientCity || !city || !priority || !property || !status || !source || !description)
      return alert("Make sure to provide all the fields")
    dispatch(createLead(leadData, navigate));
    setLeadData(initialLeadState);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((pre) => ({ ...pre, [name]: value }));
  };

  const handleClose = () => {
    setLeadData(initialLeadState);
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
                    name="clientFirstName"
                    value={leadData.clientFirstName}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    name="clientLastName"
                    value={leadData.clientLastName}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="clientPhone"
                    onChange={handleChange}
                    value={leadData.clientPhone}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    name="clientCNIC"
                    onChange={handleChange}
                    value={leadData.clientCNIC}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
                    value={leadData.clientCity}
                    name="clientCity"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item, index) => (
                      <MenuItem value={item} key={index} >{item}</MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    onChange={handleChange}
                    value={leadData.clientEmail}
                    name="clientEmail"
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={leadData.property}
                    name="property"
                    type="text"
                    size="small"
                    fullWidth>
                    {
                      inventoriesNumbers.map((number, index) => (
                        <MenuItem value={number._id} key={index} >{number.propertyNumber} </MenuItem>
                      ))
                    }
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={leadData.status}
                    name="status"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="closedLost">Closed (Lost)</MenuItem>
                    <MenuItem value="followedUpCall">Followed Up (Call)</MenuItem>
                    <MenuItem value="contactedCallAttempt">Contacted Client (Call Attempt)</MenuItem>
                    <MenuItem value="contactedCall">Contacted Client (Call)</MenuItem>
                    <MenuItem value="followedUpEmail">Followed Up (Email)</MenuItem>
                    <MenuItem value="contactedEmail">Contacted Client (Email)</MenuItem>
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="meetingDone">Meeting (Done)</MenuItem>
                    <MenuItem value="closedWon">Closed (Won)</MenuItem>
                    <MenuItem value="meetingAttempt">Meeting (Attempt)</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4">
                  <Select
                    onChange={handleChange}
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
                    onChange={handleChange}
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
