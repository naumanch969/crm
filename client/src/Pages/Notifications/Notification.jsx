import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../utils";
import { PiXLight } from "react-icons/pi";
import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { getNotification } from "../../redux/action/notification";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Notification = ({ open, setOpen, notificationId }) => {
  const dispatch = useDispatch();
  const { currentNotification, isFetching } = useSelector((state) => state.notification);
 

  useEffect(() => {
    if (notificationId) {
      dispatch(getNotification(notificationId));
    }
  }, [notificationId]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description md:w-[50vh] "
    >
      <DialogTitle className="flex items-center justify-end">
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      {isFetching || !notificationId ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <DialogContent>
          <div className="md:flex flex-col gap-[12px] text-[#67757c] font-primary">
          <span className="text-2xl font-extralight text-sky-400">{currentNotification.title}</span>
            <p>{currentNotification?.description}</p>

            <div className="flex flex-wrap w-full ">
              {currentNotification?.data && Object.keys(currentNotification?.data).map((key) =>
                key != '_id' ? (
                  <div key={key} className="flex md:w-[47%] w-full ">
                    <span className="font-semibold capitalize ">{key}:&nbsp;</span>
                    <span>{currentNotification?.data[key]}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Notification;
