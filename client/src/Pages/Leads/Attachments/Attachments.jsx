import { Button, Dialog, DialogContent, DialogTitle, Divider, Slide } from "@mui/material";
import React, { useState } from "react";
import { PiXLight } from "react-icons/pi";
import { Upload } from "../../../utils";
import ImageGallery from "./ImageGallery";
import ImageGalleryModal from "./ImageGalleryModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Attachments = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////

  ////////////////////////////////////// STATES  /////////////////////////////////////
    const [imageUpload, setImageUpload] = useState([]);
    const [openImageGallery, setOpenImageGallery] = useState(false);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleClickOpen = () => {
    setOpenImageGallery(true);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth="md"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Attachments</div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
            <Upload image={imageUpload} isMultiple={true} />
          </div>
          <Divider className="py-4" />
          <div className="mt-4 flex justify-center pb-4">
            <Button onClick={() => handleClickOpen()} variant="contained">View All Images</Button>
          </div>
        </DialogContent>
      </Dialog>
      <ImageGalleryModal open={openImageGallery} setOpen={setOpenImageGallery} />
    </div>
  );
};

export default Attachments;
