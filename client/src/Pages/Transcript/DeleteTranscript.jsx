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
import { useDispatch, useSelector } from "react-redux";
import { deleteTranscript } from "../../redux/action/transcript";

const DeleteTranscript = ({ open, setOpen, transcriptId }) => {
  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.transcript);

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteTranscript(transcriptId));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        <div className="font-primary text-sky-500">Delete the Transcript?</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="font-primary">Are you sure you want to delete this Transcript?</div>
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
          {isFetching ? "Deleting..." : "Delete"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTranscript;
