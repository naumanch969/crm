import { Close } from "@mui/icons-material";
import { DialogActions, IconButton, Menu, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateTask } from "../../redux/action/task";
import { useDispatch, useSelector } from "react-redux";
import { getTaskReducer } from "../../redux/reducer/task";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../constant";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  ///////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentTask: task, isFetching, error } = useSelector((state) => state.task);
  const initialTaskState = {
    completedTask: '',
    completedTaskDate: '',
    completedTaskStatus: '',
    completedTaskComment: '',
    newTask: '',
    newTaskDeadline: '',
    newTaskComment: ''
  }
  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [taskData, setTaskData] = useState(task);

  ///////////////////////////////////// USE EFFECTS ///////////////////////////////////
  useEffect(() => {
    setTaskData(task);
  }, [task]);

  ///////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    const { completedTask, completedTaskComment, completedTaskDate, completedTaskStatus, newTask, newTaskComment, newTaskDeadline } = taskData
    e.preventDefault();
    if (!completedTask || !completedTaskComment || !completedTaskDate || !completedTaskStatus || !newTask || !newTaskComment || !newTaskDeadline)
      return alert("Make sure to rovide all the fields");
    dispatch(updateTask(taskData?._id, taskData));
    setTaskData(initialTaskState)
    setOpen(false)
  };

  const handleInputChange = (field, value) => {
    setTaskData((pre) => ({ ...pre, [field]: value, }));
  };
  const handleClose = () => {
    setOpen(false);
    setOpenFromNavbar(false);
  };
  return (
    <div>
      <Dialog
        open={open}
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
                  <Select
                    fullWidth
                    size="small"
                    value={taskData?.completedTask}
                    onChange={(e) => handleInputChange('completedTask', e.target.value)}
                  >
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
                        onChange={(date) => handleInputChange("completedTaskDate", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Status </td>
                <td className="pb-4">
                  <Select
                    name="status"
                    fullWidth
                    size="small"
                    value={taskData?.completedTaskStatus}
                    onChange={(e) => handleInputChange('completedTaskStatus', e.target.value)}
                  >
                    <MenuItem value="successful">Successful</MenuItem>
                    <MenuItem value="unsuccessful">Unsuccessful</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField
                    multiline
                    rows={5}
                    type="text"
                    value={taskData?.completedTaskComment}
                    onChange={(e) => handleInputChange('completedTaskComment', e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Next Task </td>
                <td className="pb-4">
                  <Select
                    fullWidth
                    size="small"
                    value={taskData?.newTask}
                    onChange={(e) => handleInputChange('newTask', e.target.value)}
                  >
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
                        onChange={(date) => handleInputChange("newTaskDeadline", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Comment </td>
                <td className="pb-4">
                  <TextField
                    multiline
                    rows={5}
                    type="text"
                    value={taskData?.newTaskComment}
                    onChange={(e) => handleInputChange('newTaskComment', e.target.value)}
                    size="small"
                    fullWidth
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

export default EditModal;
