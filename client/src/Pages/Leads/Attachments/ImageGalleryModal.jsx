import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import ImageGallery from "./ImageGallery";
import { DialogTitle, IconButton } from "@mui/material";
import { PiX } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageGalleryModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className="bg-transparent"
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <DialogTitle>
          <div className="flex justify-end">
            <IconButton onClick={handleClose}>
              <PiX className="text-[25pd]" />
            </IconButton>
          </div>
        </DialogTitle>
        <ImageGallery />
      </Dialog>
    </div>
  );
};

export default ImageGalleryModal;
