import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Slide, DialogActions, TextField } from "@mui/material";
import { PiXLight } from "react-icons/pi";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { createEvent } from "../../../redux/action/event";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Create = ({ setOpen, open }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.event);
  let initialEventState = { title: "", description: "", start: "", end: "" };

  //////////////////////////////////////// STATES ////////////////////////////////////
  const [eventData, setEventData] = useState(initialEventState);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  //////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSubmit = (e) => {
    const { title, description, start, end } = eventData;
    if (!title || !description || !start || !end)
      return alert("Make sure to provide all the fields");
    dispatch(createEvent(eventData));
    setEventData(initialEventState);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setEventData((pre) => ({ ...pre, [field]: value }));
  };

  const handleClose = () => {
    setEventData(initialEventState);
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
                    value={eventData.title}
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
                    value={eventData.description}
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
                    name="start"
                    value={eventData.start}
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
                    name="end"
                    value={eventData.end}
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
            {isFetching ? "Saving..." : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Create;
