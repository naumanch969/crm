import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLead, updateLead } from "../../redux/action/lead";
import { pakistanCities, countries } from "../../constant";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiUser, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { getLeadReducer } from "../../redux/reducer/lead";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, scroll, leadId }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const { employees, loggedUser } = useSelector((state) => state.user);
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
    { name: "Friend and Family", value: "FriendAndFamily" },
    { name: "Facebook", value: "facebook" },
    { name: "Direct Call", value: "directCall" },
    { name: "Google", value: "google" },
    { name: "Referral", value: "referral" },
  ];
  const degrees = [
    { name: "Bacholers", value: "bacholers" },
    { name: "Masters", value: "masters" },
    { name: "PHD", value: "phd" },
    { name: "Diploma", value: "diploma" },
    { name: "Other", value: "other" },
  ];
  const Visa = [
    { name: "Student Visa", value: "studentVisa" },
    { name: "Visit Visa", value: "visitVisa" },
  ];

  let initialLeadState = {
    clientName: "",
    clientPhone: "",
    priority: "",
    country: "",
    degree: "",
    major: "",
    degreeName: "",
    visa: "",
    status: "",
    source: "",
    description: "",
  };
  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [leadData, setLeadData] = useState({
    ...currentLead,
    clientName: currentLead?.client?.clientName,
    clientPhone: currentLead?.client?.phone,
  });

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setLeadData({
      ...currentLead,
      clientName: currentLead?.client?.clientName,
      clientPhone: currentLead?.client?.phone,
    });
  }, [currentLead]);

  useEffect(() => {
    leadId && dispatch(getLead(leadId));
  }, [leadId]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      clientName,
      clientPhone,
      country,
      priority,
      status,
      degree,
      major,
      visa,
      source,
      description,
    } = leadData;

    dispatch(updateLead(currentLead?._id, leadData));
    dispatch(getLeadReducer(null));
    setLeadData(initialLeadState);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setLeadData((pre) => ({ ...pre, [field]: value }));
  };

  const handleClose = () => {
    setLeadData(initialLeadState)
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
          <div className="text-sky-400 font-primary">Edit Lead</div>
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
                    value={leadData?.clientName}
                    name="clientName"
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
                    value={leadData?.clientPhone}
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
                <td className="pb-4 text-lg">Country </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData?.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Country</option>
                    {countries.map((country, key) => (
                      <option key={key} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Degree </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData?.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Degree</option>
                    {degrees.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              {leadData?.degree === "other" && (
                <tr>
                  <td className="pb-4 text-lg">Degree Name </td>
                  <td className="pb-4">
                    <TextField
                      onChange={(e) => handleChange("degreeName", e.target.value)}
                      value={leadData?.degreeName}
                      name="degreeName"
                      type="text"
                      size="small"
                      fullWidth
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td className="pb-4 text-lg">Visa </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData?.visa}
                    onChange={(e) => handleChange("visa", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Visa</option>
                    {Visa.map((item, key) => (
                      <option key={key} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <CFormSelect
                    value={leadData?.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Priority</option>
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
                    value={leadData?.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Status</option>
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
                    value={leadData?.source}
                    onChange={(e) => handleChange("source", e.target.value)}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black">
                    <option value="">Select Source</option>
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
                    value={leadData?.description}
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

export default EditModal;
