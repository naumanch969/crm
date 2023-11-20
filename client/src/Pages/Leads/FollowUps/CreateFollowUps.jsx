import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { createFollowUp } from "../../../redux/action/followUp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateFollowUps = ({ setOpen, open, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;
  const { leadId } = useParams()
  const initialFollowUpState = {
    status: "",
    remarks: "",
    followUpDate: "",
    leadId
  }

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [followUpData, setFollowUpData] = useState(initialFollowUpState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////

  const handleInputChange = (e) => {
    setFollowUpData({
      ...followUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFollowUp(followUpData))
    setFollowUpData(initialFollowUpState);
    setOpen(false);
  };

  const handleClose = () => {
    setFollowUpData({
      status: "",
      remarks: "",
      followUpDate: "",
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
          <div className="text-sky-400 font-primary">Add New Follow Up</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad />
              <span>Follow Up Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Current Status </td>
                <td className="pb-4">
                  <Select
                    onChange={handleInputChange}
                    value={followUpData.status}
                    name="status"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="New Lead">New Lead</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Call Not Answer">Call Not Answer</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Deal Done">Deal Done</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Keen Interested">Keen Interested</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Visit Done">Visit Done</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Contact in Future">Contact in Future</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Visit Schedule">Visit Schedule</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Archived">Archived</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Wrong Number">Wrong Number</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Busy">Busy</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Number Off">Number Off</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Call back Later">Call Back Later</MenuItem>
                    <MenuItem sx={{ fontFamily: "'Montserrat', sans-serif" }} value="Interested">Interested</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Next Follow Up Date </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateFollowUps;
