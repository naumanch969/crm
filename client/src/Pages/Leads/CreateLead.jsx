import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLead, getLeads } from "../../redux/action/lead";
import Topbar from "./Topbar";
import { register } from "../../redux/action/user";
import { CFormSelect } from "@coreui/react";
import { pakistanCities, countries } from "../../constant";
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
  let initialLeadState = {
    clientName: "",
    clientPhone: "",
    city: "",
    description: "",
    property: "",
    priority: "",
    status: "",
    source: "",
  };
  const initialFollowUpState = {
    followUpStatus: "",
    remarks: "",
    followUpDate: "",
  }
  const priorities = [
    { name: "Very Cold", value: "veryCold" },
    { name: "Cold", value: "cold" },
    { name: "Moderate", value: "moderate" },
    { name: "Hot", value: "hot" },
    { name: "Very Hot", value: "veryHot" },
  ];
  const statuses = [
    { name: "Closed (Lost)", value: "closedLost" },
    { name: "Followed Up (Call)", value: "followedUpCall" },
    { name: "Contacted Client (Call Attempt)", value: "contactedCallAttempt" },
    { name: "Contacted Client (Call)", value: "contactedCall" },
    { name: "Followed Up (Email)", value: "followedUpEmail" },
    { name: "Contacted Client (Email)", value: "contactedEmail" },
    { name: "New", value: "new" },
    { name: "Meeting (Done)", value: "meetingDone" },
    { name: "Closed (Won)", value: "closedWon" },
    { name: "Meeting (Attempt)", value: "meetingAttempt" },
  ];
  const sources = [
    { name: "Instagram", value: "instagram" },
    { name: "Facebook Comment", value: "facebookComment" },
    { name: "Friend and Family", value: "friendAndFamily" },
    { name: "Facebook", value: "facebook" },
    { name: "Direct Call", value: "directCall" },
    { name: "Google", value: "google" },
    { name: "Referral", value: "referral" },
  ];


  //////////////////////////////////////// STATES ////////////////////////////////////
  const [leadData, setLeadData] = useState(initialLeadState);
  const [createMultiple, setCreateMultiple] = useState(false);
  const [followUpData, setFollowUpData] = useState(initialFollowUpState);
  const [leadCountsToCreate, setLeadCountsToCreate] = useState(1);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      clientName,
      clientPhone,
      city,
      priority,
      status,
      source,
      property,
      description,
    } = leadData;

    dispatch(createLead({ ...leadData, count: leadCountsToCreate < 1 ? 1 : leadCountsToCreate, ...followUpData }, navigate));

    setLeadData(initialLeadState);
    setFollowUpData(initialFollowUpState);
    setCreateMultiple(false);
    setLeadCountsToCreate(1);
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
          <div className="text-sky-400 font-primary">Create Lead</div>
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
                <td className="pb-4 text-lg">Client Name </td>
                <td className="pb-4">
                  <TextField
                    name="clientName"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    value={leadData.clientName}
                    onChange={(e) => handleChange("clientName", e.target.value)}
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
                    onChange={(e) => handleChange("clientPhone", e.target.value)}
                    value={leadData.clientPhone}
                    type="number"
                    size="small"
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
                  <CFormSelect
                    value={leadData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>

                    {pakistanCities.map((city, key) => (
                      <option key={key} value={city}>
                        {city}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData.property}
                    onChange={(e) => handleChange("property", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>
                    {projects.map((project, key) => (
                      <option key={project?._id} value={project?._id}>
                        {project?.title}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>

                    {priorities.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>

                    {statuses.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData.source}
                    onChange={(e) => handleChange("source", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>
                    {sources.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => handleChange("description", e.target.value)}
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
              <tr>
                <td className="text-lg">Create Multiple Leads </td>
                <td>
                  <FormGroup>
                    <FormControlLabel
                      className="w-40 text-gray-400"
                      checked={createMultiple ? true : false}
                      onChange={(e) => setCreateMultiple(e.target.checked)}
                      control={<Checkbox defaultChecked style={{ color: "#20aee3" }} />}
                    />
                  </FormGroup>
                </td>
              </tr>
              {createMultiple && (
                <tr>
                  <td className="flex flex-col justify-start mt-1 text-lg">Lead Count </td>
                  <td className="pb-4">
                    <TextField
                      onChange={(e) => setLeadCountsToCreate(e.target.value)}
                      value={leadCountsToCreate}
                      type="number"
                      size="small"
                      fullWidth
                    />
                  </td>
                </tr>
              )}
            </table>
            <Divider />
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Current Status </td>
                <td className="pb-4">
                  <CFormSelect
                    onChange={(e) => setFollowUpData({ ...followUpData, followUpStatus: e.target.value })}
                    value={followUpData.followUpStatus}
                    name="followUpStatus"
                    type="text"
                    size="small"
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select an Option</option>
                    <option value="New Lead">New Lead</option>
                    <option value="Call Not Answer">Call Not Answer</option>
                    <option value="Deal Done">Deal Done</option>
                    <option value="Keen Interested">Keen Interested</option>
                    <option value="Visit Done">Visit Done</option>
                    <option value="Contact in Future">Contact in Future</option>
                    <option value="Visit Schedule">Visit Schedule</option>
                    <option value="Archived">Archived</option>
                    <option value="Wrong Number">Wrong Number</option>
                    <option value="Busy">Busy</option>
                    <option value="Number Off">Number Off</option>
                    <option value="Call back Later">Call Back Later</option>
                    <option value="Interested">Interested</option>
                  </CFormSelect>
                
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Next Follow Up Date </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => setFollowUpData({ ...followUpData, followUpDate: e.target.value })}
                    value={followUpData.followUpDate}
                    name="followUpDate"
                    type="date"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Remarks </td>
                <td className="pb-4">
                  <TextField
                    onChange={(e) => setFollowUpData({ ...followUpData, remarks: e.target.value })}
                    value={followUpData.remarks}
                    name="remarks"
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
            Create
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateLead;
