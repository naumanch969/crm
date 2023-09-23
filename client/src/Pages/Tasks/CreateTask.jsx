import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/action/task";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateTask = ({ open, setOpen, openFromNavbar, setOpenFromNavbar }) => {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const { isFetching, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////////////////////////////////////// STATES ///////////////////////////////////
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////

  ////////////////////////////////////// FUNCTION /////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.dueDate)
      return alert("Make sure to rovide all the fields");
    dispatch(createTask(taskData, setOpen));
  };

  const handleInputChange = (field, value) => {
    let inputValue;
    if (field == "dueDate") inputValue = value;
    else inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, "");
    setTaskData((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };
  const handleClose = () => {
    setOpen(false);
    setOpenFromNavbar(false);
  };

  return (
    <div>
      <Dialog
        open={open || openFromNavbar}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400">Add New Task</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Task Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Task </td>
                <td className="pb-4">
                  <Select name="task" fullWidth size="small">
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="sentAvailablityList">Sent Availablity List</MenuItem>
                    <MenuItem value="siteVisit">Site Visit</MenuItem>
                    <MenuItem value="tokenRecieved">Token Recieved</MenuItem>
                    <MenuItem value="ClosedWon">Closed (Won)</MenuItem>
                    <MenuItem value="closedLost">Closed (Lost)</MenuItem>
                    <MenuItem value="FollowedUpCall">Followed Up (Call)</MenuItem>
                    <MenuItem value="FollowedUpEmail">Followed Up (Email)</MenuItem>
                    <MenuItem value="ContactedCall">Contacted Client (Call)</MenuItem>
                    <MenuItem value="ContactedCallAttempt">
                      Contacted Client (Call Attempt)
                    </MenuItem>
                    <MenuItem value="ContactedEmail">Contacted Client (Email)</MenuItem>
                    <MenuItem value="MeetingDone">Meeting (Done)</MenuItem>
                    <MenuItem value="MeetingAttempt">Meeting (Attempt)</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Completed Date </td>
                <td className="pb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DesktopDatePicker
                        // onChange={(date) => handleInputChange("dueDate", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <Select name="status" fullWidth size="small">
                    <MenuItem value="successful">Successful</MenuItem>
                    <MenuItem value="unsuccessful">Unsuccessful</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField multiline rows={5} type="text" size="small" fullWidth />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Next Task </td>
                <td className="pb-4">
                  <Select name="nextTask" fullWidth size="small">
                    <MenuItem value="doNothing">Do Nothing</MenuItem>
                    <MenuItem value="contactClient">Contact Client</MenuItem>
                    <MenuItem value="sentAvailablityList">Sent Availablity List</MenuItem>
                    <MenuItem value="followUp">Follow Up</MenuItem>
                    <MenuItem value="arrangeMeeting">Arrange Meeting</MenuItem>
                    <MenuItem value="pushMeeting">Push Meeting</MenuItem>
                    <MenuItem value="meetClient">Meet Client</MenuItem>
                    <MenuItem value="signAgreement">Sign Agreement</MenuItem>
                    <MenuItem value="recieveToken">Recieve Token</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Deadline </td>
                <td className="pb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DesktopDatePicker
                        // onChange={(date) => handleInputChange("dueDate", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField multiline rows={5} type="text" size="small" fullWidth />
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
            variant="contained"
            onClick={handleSubmit}
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTask;
