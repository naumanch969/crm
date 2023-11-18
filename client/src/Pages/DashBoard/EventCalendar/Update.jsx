import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiUser, PiXLight } from "react-icons/pi";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { updateEvent } from "../../../redux/action/event";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Update = ({ setOpen, open, event }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.event);
  let initialEventState = { title: "", description: "", start: "", end: "" };

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [eventData, setEventData] = useState(event);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////
  useEffect(() => {
    setEventData(event);
  }, [event]);

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    dispatch(updateEvent(event._id, eventData));
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setEventData((pre) => ({ ...pre, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={"paper"}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Event</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Title </td>
                <td className="pb-4">
                  <TextField
                    name="title"
                    value={eventData?.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    name="description"
                    value={eventData?.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Starting Date </td>
                <td className="pb-4">
                  <TextField
                    type="date"
                    value={eventData?.start}
                    onChange={(e) => handleChange("start", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>

              <tr>
                <td className="pb-4 text-lg">Ending Date </td>
                <td className="pb-4">
                  <TextField
                    type="date"
                    value={eventData?.end}
                    onChange={(e) => handleChange("end", e.target.value)}
                    size="small"
                    fullWidth
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
            {isFetching ? "Updating..." : "Update"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Update;
