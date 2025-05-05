import { Dialog, DialogTitle, DialogActions, DialogContent, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../redux/action/lead";
import Swiper from "./Swiper";

const ViewAttachments = ({ open, setOpen, leadId }) => {
  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);

  ////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    if (leadId) {
      dispatch(getLead(leadId));
    }
  }, [leadId]);

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="sm" maxWidth="md">
        <DialogTitle id="alert-dialog-title">
          <div className="font-primary text-sky-500">View Attachments</div>
        </DialogTitle>
        <Divider className="mt-4" />

        <DialogContent className="h-full w-full">
          <Swiper leadImages={currentLead} />
        </DialogContent>
        <DialogActions className="mr-4 mb-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleClose}>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewAttachments;
