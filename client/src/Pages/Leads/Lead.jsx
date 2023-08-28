import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../redux/action/lead";
import { format } from "timeago.js";
import {
  PiCalendar,
  PiEnvelopeSimple,
  PiGenderMaleDuotone,
  PiGitBranch,
  PiHandCoins,
  PiHouseLine,
  PiIdentificationCard,
  PiMapPinLine,
  PiPhone,
  PiRuler,
  PiSealQuestion,
  PiUser,
  PiUserFocus,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Lead = ({ open, setOpen }) => {
  //////////////////////////////////// States ////////////////////////////////////////

  //////////////////////////////////// Variables /////////////////////////////////////
  const { leadId } = useParams();
  const dispatch = useDispatch();
  const { currentLead } = useSelector((state) => state.lead);

  //////////////////////////////////// UseEffects /////////////////////////////////////
  //   useEffect(() => {
  //     dispatch(getLead(leadId));
  //   }, [leadId]);

  //////////////////////////////////// Functions /////////////////////////////////////
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
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-end">
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="md:flex text-[#67757c]">
            <div className="bg-white md:w-8/12 w-full h-full px-4">
              <div className="text-2xl flex justify-center">Lead Details</div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiHouseLine className="text-[25px]" />
                Property Details
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Property Type :{" "}
                <span className="text-black font-normal">Commercial / Residential</span>
              </div>
              <div className="text-lg font-[350]">
                Home Type :{" "}
                <span className="text-black font-normal">Bangla / Appartment / Hotel</span>
              </div>
              <div className="text-lg font-[350] pb-2">
                Beds Required : <span className="text-black font-normal">Number of Beds</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiMapPinLine className="text-[25px]" />
                Location
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Required City : <span className="text-black font-normal">City</span>
              </div>
              <div className="text-lg font-[350] pb-2">
                Specific Area : <span className="text-black font-normal">e.g : Johar Town</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiRuler className="text-[25px]" />
                Area
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Minimum Area : <span className="text-black font-normal">Area</span>
              </div>
              <div className="text-lg font-[350] pb-2">
                Maximum Area : <span className="text-black font-normal">Area</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiHandCoins className="text-[25px]" />
                Budget
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Minimum Budget : <span className="text-black font-normal">Budget</span>
              </div>
              <div className="text-lg font-[350] pb-2">
                Maximum Budget : <span className="text-black font-normal">Budget</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-[#ebf2f5] w-full h-full md:mt-0 mt-8 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="text-xl">Customer Details</div>
                <div className="bg-[#d1dfe4] p-1 w-full rounded-lg text-black flex justify-center text-lg">
                  Client Full Name
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiGenderMaleDuotone className="text-gray-700" /> Gender :{" "}
                    <span className="text-black">Male</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiIdentificationCard className="text-gray-700" /> CNIC :{" "}
                    <span className="text-black">CNIC Number</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiPhone className="text-gray-700" /> PHONE :{" "}
                    <span className="text-black">Phone Number</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiEnvelopeSimple className="text-gray-700" /> EMAIL :{" "}
                    <span className="text-black">Email</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiGitBranch className="text-gray-700" /> Source :{" "}
                    <span className="text-black">Source</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiUser className="text-gray-700" /> Client Type :{" "}
                    <span className="text-black">Client Type</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" /> Created At :{" "}
                    <span className="text-black">Date</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#ebf2f5] w-full h-full mt-4 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiUserFocus className="text-gray-700" /> Allocated to :{" "}
                    <span className="text-black">Username</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealQuestion className="text-gray-700" /> Status :{" "}
                    <span className="text-black">Username</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lead;
