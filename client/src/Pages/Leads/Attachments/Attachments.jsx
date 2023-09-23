import { Button, Dialog, DialogContent, DialogTitle, Divider, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PiXLight } from "react-icons/pi";
import { Loader, Upload } from "../../../utils";
import ImageGallery from "./ImageGallery";
import ImageGalleryModal from "./ImageGalleryModal";
import { useSelector } from "react-redux";
import { updateLead } from "../../../redux/action/lead";
import { deleteAllImagesReducer, setUrlsReducer } from "../../../redux/reducer/upload";
import { getLead } from "../../../redux/action/lead";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Attachments = ({ open, setOpen, leadId }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const { urls } = useSelector(state => state.upload)
  const { isFetching, currentLead } = useSelector(state => state.lead)
  const dispatch = useDispatch()
  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [openImageGallery, setOpenImageGallery] = useState(false);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    if (open) {
      leadId && dispatch(getLead(leadId))
    }
  }, [leadId, open])
  useEffect(() => {
    currentLead
      ?
      dispatch(setUrlsReducer([...currentLead?.images]))
      :
      setOpen(false)
  }, [currentLead])

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleClickOpen = () => {
    setOpenImageGallery(true);
  };

  const handleSave = () => {
    dispatch(updateLead(leadId, { images: urls }))
    dispatch(deleteAllImagesReducer());
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth="md"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Attachments</div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
            {
              isFetching
                ?
                <div className="w-full flex justify-center items-center ">
                  <Loader />
                </div>
                :
                <Upload image={urls} isMultiple={true} />
            }
          </div>
          <Divider className="py-4" />
          <div className="mt-4 flex justify-end pb-4">
            <Button onClick={() => handleSave()} variant="contained">
              {isFetching ? 'Save' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ImageGalleryModal open={openImageGallery} setOpen={setOpenImageGallery} />

    </div>
  );
};

export default Attachments;
