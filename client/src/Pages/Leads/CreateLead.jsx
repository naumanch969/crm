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
} from "@mui/material";
import { PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { getProjects } from "../../redux/action/project";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateLead = ({ setOpen, open, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.lead);
  const { projects } = useSelector((state) => state.project);
  const projectsTitles = projects.map(({ _id, title }) => ({ _id, title }));
  let initialLeadState = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    CNIC: "",
    clientCity: "",
    email: "",
    city: "",
    priority: "",
    property: "",
    status: "",
    source: "",
    description: "",
  };
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;
  const priorities = [
    { name: 'Very Cold', value: 'veryCold' },
    { name: 'Cold', value: 'cold' },
    { name: 'Moderate', value: 'moderate' },
    { name: 'Hot', value: 'hot' },
    { name: 'Very Hot', value: 'veryHot' },
  ]
  const statuses = [
    { name: 'Closed (Lost)', value: "closedLost" },
    { name: 'Followed Up (Call)', value: "followedUpCall" },
    { name: 'Contacted Client (Call Attempt)', value: "contactedCallAttempt" },
    { name: 'Contacted Client (Call)', value: "contactedCall" },
    { name: 'Followed Up (Email)', value: "followedUpEmail" },
    { name: 'Contacted Client (Email)', value: "contactedEmail" },
    { name: 'New<', value: "new" },
    { name: 'Meeting (Done)', value: "meetingDone" },
    { name: 'Closed (Won)', value: "closedWon" },
    { name: 'Meeting (Attempt)', value: "meetingAttempt" },
  ]
const sources  = [
{ name:'Instagram', value:"instagram"},
{ name:'Facebook Comment', value:"facebookComment"},
{ name:'Friend and Family', value:"FriendAndFamily"},
{ name:'Facebook', value:"facebook"},
{ name:'Direct Call', value:"directCall"},
{ name:'Google', value:"google"},
{ name:'Referral', value:"referral"},
]

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [leadData, setLeadData] = useState(initialLeadState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      phone,
      clientCity,
      city,
      priority,
      property,
      status,
      source,
      description,
    } = leadData;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phone ||
      !clientCity ||
      !city ||
      !priority ||
      !property ||
      !status ||
      !source ||
      !description
    )
      return alert("Make sure to provide all the fields");
    dispatch(createLead(leadData, navigate));
    setLeadData(initialLeadState);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setLeadData((pre) => ({ ...pre, [field]: value }));
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
                    name="firstName"
                    value={leadData.firstName}
                    onChange={(e)=>handleChange('firstName',e.target.value)}
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
                    value={leadData.lastName}
                    onChange={(e)=>handleChange('lastName',e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Username </td>
                <td className="pb-4">
                  <TextField
                    name="username"
                    value={leadData.username}
                    onChange={(e)=>handleChange('username',e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    onChange={(e)=>handleChange('phone',e.target.value)}
                    value={leadData.phone}
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
                    name="CNIC"
                    onChange={(e)=>handleChange('CNIC',e.target.value)}
                    value={leadData.CNIC}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={pakistanCities}
                    value={leadData.clientCity}
                    getOptionLabel={(city) => city}
                    onChange={(e, city) => handleChange('clientCity', city.trim().toLowerCase())}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    onChange={(e)=>handleChange('email',e.target.value)}
                    value={leadData.email}
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
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={pakistanCities}
                    value={leadData.city}
                    getOptionLabel={(city) => city}
                    onChange={(e, city) => handleChange('city', city.trim().toLowerCase())}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Projects </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={projectsTitles}
                    value={leadData.property}
                    getOptionLabel={(project) => project.title ? project.title : project}
                    onChange={(e, project) => handleChange('property', project._id)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={priorities}
                    value={leadData.priority}
                    getOptionLabel={(priority) => priority.name ? priority.name : priority}
                    onChange={(e, priority) => handleChange('priority', priority.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={statuses}
                    value={leadData.status}
                    getOptionLabel={(status) => status.name ? status.name :status}
                    onChange={(e, status) => handleChange('status', status.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4">
                <Autocomplete
                    size="small"
                    disablePortal={false}
                    options={sources}
                    value={leadData.source}
                    getOptionLabel={(source) => source.name ? source.name :source}
                    onChange={(e, source) => handleChange('source', source.value)}
                    className="w-full"
                    renderInput={(params) => <TextField   {...params} autoComplete="false" fullWidth />}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e)=>handleChange('description',e.target.value)}
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
        <DialogActions className="mr-4 mb-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleSubmit}
            autoFocus>
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateLead;
