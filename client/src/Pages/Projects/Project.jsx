import React from "react";
import {
  PiCalendar,
  PiEnvelopeSimple,
  PiGenderMaleDuotone,
  PiGitBranch,
  PiHandCoins,
  PiHouseLine,
  PiIdentificationCard,
  PiImage,
  PiMapPinLine,
  PiPhone,
  PiRuler,
  PiSealQuestion,
  PiUser,
  PiUserFocus,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import Carousel from "./Carousel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Project = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-end">
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#67757c]">
            <div className="bg-white w-full h-full px-4">
              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiHouseLine className="text-[25px]" />
                Property Details
              </div>
              <Divider />

              <div>
                <div className="pt-2 text-lg font-[350]">
                  Property Type :{" "}
                  <span className="text-black font-normal">Commercial / Residential</span>
                </div>
                <div className="text-lg font-[350]">
                  Home Type :{" "}
                  <span className="text-black font-normal">Bangla / Appartment / Hotel</span>
                </div>
                <div className="text-lg font-[350] pb-6">
                  Total Beds : <span className="text-black font-normal">Number of Beds</span>
                </div>
              </div>

              <div className="flex items-center pb-2 gap-3 text-[20px]">
                <PiMapPinLine className="text-[25px]" />
                Location
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                City : <span className="text-black font-normal">City</span>
              </div>
              <div className="text-lg font-[350] pb-6">
                Location Area : <span className="text-black font-normal">e.g : Johar Town</span>
              </div>

              <div className="flex items-center pb-2 gap-3 text-[20px]">
                <PiRuler className="text-[25px]" />
                Area
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Area in Marla : <span className="text-black font-normal">Area</span>
              </div>
              <div className="text-lg font-[350] pb-6">
                Area is square feets : <span className="text-black font-normal">Area</span>
              </div>

              <div className="flex items-center pb-2 gap-3 text-[20px]">
                <PiHandCoins className="text-[25px]" />
                Price
              </div>
              <Divider />
              <div className="text-lg font-[350] pb-6 pt-2">
                Selling Price : <span className="text-black font-normal">Amount</span>
              </div>

              <div className="flex items-center pb-2 gap-3 text-[20px]">
                <PiImage className="text-[25px]" />
                Images
              </div>
              <Divider />
              <div>
                <Carousel />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Project;
