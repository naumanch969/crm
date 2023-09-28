import React from "react";
import { useDispatch } from "react-redux";
import { format } from "timeago.js";
import { PiHouseLine, PiXLight, } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ViewEvent = ({ open, setOpen, event, setOpenDeleteModal, setOpenUpdateModal }) => {

  //////////////////////////////////// Variables /////////////////////////////////////
  const dispatch = useDispatch();

  //////////////////////////////////// States ////////////////////////////////////////

  //////////////////////////////////// UseEffects /////////////////////////////////////


  //////////////////////////////////// Functions /////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  const handleShowUpdateModal = () => {
    setOpenUpdateModal(true)
    setOpen(false)
  }
  const handleShowDeleteModal = () => {
    setOpenDeleteModal(true)
    setOpen(false)
  }



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
          <h2 className="text-2xl text-start">Event Detail</h2>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="md:flex text-[#67757c] font-primary">
            <div className="bg-white md:w-[65%] w-full h-full">

              <div className="flex items-center gap-3 text-[20px]">
                {event?.title}
              </div>

              <div className="pt-2 text-lg font-[350]">
                {event?.description}
              </div>

              <div className="text-lg font-[350]">
                {new Date(event?.start).toUTCString()}
              </div>

              <div className="text-lg font-[350] pb-2">
                {new Date(event?.end).toUTCString()}
              </div>

            </div>

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
            onClick={handleShowUpdateModal}
            autoFocus>
            Update
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleShowDeleteModal}
            autoFocus>
            Delete
          </button>
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default ViewEvent;
