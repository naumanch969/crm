import {
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
  } from "@mui/material";
  import React from "react";
  import { deleteEvent } from "../../../redux/action/event";
  import { useDispatch, useSelector } from "react-redux";
  
  const DeleteModal = ({ open, setOpen, eventId }) => {
    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.event);
  
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = () => {
      dispatch(deleteEvent(eventId));
      setOpen(false);
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          <div className="font-primary text-sky-500">Delete the Event?</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="font-primary">Are you sure you want to delete this event?</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="mr-4 mb-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleDelete}
            autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteModal;
  