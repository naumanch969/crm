import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateFollowUps = ({ setOpen, open, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const navigate = useNavigate();
  let today = new Date();
  let time = today.toLocaleTimeString();
  let date = today.toLocaleDateString();
  let dateTime = date + "  " + time;

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [FollowUpData, setFollowUpData] = useState({
    currentStatus: "",
    remarks: "",
    nextFollowUp: "",
  });

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////

  const handleInputChange = (e) => {
    setFollowUpData({
      ...FollowUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFollowUpData({
      currentStatus: "",
      remarks: "",
      nextFollowUp: "",
    });

    setOpen(false);
  };

  const handleClose = () => {
    setFollowUpData({
      currentStatus: "",
      remarks: "",
      nextFollowUp: "",
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
                    value={FollowUpData.currentStatus}
                    name="currentStatus"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="closedLost">Closed (Lost)</MenuItem>
                    <MenuItem value="FollowedUpCall">Followed Up (Call)</MenuItem>
                    <MenuItem value="ContactedCallAttempt">
                      Contacted Client (Call Attempt)
                    </MenuItem>
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
                <td className="flex flex-col justify-start mt-1 text-lg">Next Follow Up Date </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleInputChange}
                    value={FollowUpData.nextFollowUp}
                    name="nextFollowUp"
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
                    value={FollowUpData.remarks}
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
