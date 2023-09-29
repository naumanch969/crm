import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../redux/action/lead";
import { format } from "timeago.js";
import { Loader } from "../../utils";
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

const Lead = ({ open, setOpen, leadId, scroll }) => {
  //////////////////////////////////// States ////////////////////////////////////////

  //////////////////////////////////// Variables /////////////////////////////////////
  // const { leadId } = useParams();
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  //////////////////////////////////// UseEffects /////////////////////////////////////
  useEffect(() => {
    if (leadId) {
      dispatch(getLead(leadId));
    }
  }, [leadId]);

  //////////////////////////////////// Functions /////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
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
          <div className="md:flex text-[#67757c] font-primary">
            <div className="bg-white md:w-[65%] w-full h-full px-4">
              <div className="text-2xl flex justify-center">Lead Details</div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiHouseLine className="text-[25px]" />
                Property Details
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Project :{" "}
                <span className="text-black font-normal">{currentLead?.property.title}</span>
              </div>
              <div className="text-lg font-[350]">
                Priority :{" "}
                <span className="text-black font-normal capitalize">{currentLead?.priority}</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiMapPinLine className="text-[25px]" />
                Location
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                Required City : <span className="text-black font-normal">{currentLead?.city}</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiRuler className="text-[25px]" />
                Details
              </div>
              <Divider />

              <div className="text-lg font-[350] pt-2">
                Source :{" "}
                <span className="text-black font-normal capitalize">{currentLead?.source}</span>
              </div>

              <div className="flex items-center pt-4 pb-2 gap-3 text-[20px]">
                <PiHandCoins className="text-[25px]" />
                Description
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">
                <span className="text-black font-normal">{currentLead?.description}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-[#ebf2f5] w-full h-full md:mt-0 mt-8 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="text-xl">Customer Details</div>
                <div className="bg-[#d1dfe4] p-1 w-full rounded-lg text-black flex justify-center text-lg capitalize">
                  {currentLead?.client?.username == "" ? "Null" : currentLead?.client?.username}
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiIdentificationCard className="text-gray-700" /> CNIC :{" "}
                    <span className="text-black">
                      {currentLead?.client?.CNIC == "" ? "Null" : currentLead?.client?.CNIC}
                    </span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiPhone className="text-gray-700" /> Phone :{" "}
                    <span className="text-black">{currentLead?.client?.phone}</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiEnvelopeSimple className="text-gray-700" /> Email:{" "}
                    <span className="text-black">
                      {currentLead?.client?.email == "" ? "Null" : currentLead?.client?.email}
                    </span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" /> Created :{" "}
                    <span className="text-black">{format(currentLead?.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#ebf2f5] w-full h-full mt-4 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiUserFocus className="text-gray-700" />
                    <div>Allocated Persons </div>
                  </div>
                  {currentLead?.allocatedTo.length < 1 ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-black capitalize">
                        {currentLead?.allocatedTo[0]?.username}
                      </span>
                    </div>
                  ) : (
                    currentLead?.allocatedTo.map((person) => (
                      <div>
                        <div className="flex items-center gap-2 text-black">{">"} {person.username}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealQuestion className="text-gray-700" /> Status :{" "}
                    <span className="text-black capitalize">{currentLead?.status}</span>
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
