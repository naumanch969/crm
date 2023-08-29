import { Close, Description, Flag, PriorityHigh, Timeline } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask } from "../../redux/action/task";
import {
  PiCalendar,
  PiEnvelopeSimple,
  PiGenderMaleDuotone,
  PiGitBranch,
  PiHandCoins,
  PiHouseLine,
  PiIdentificationCard,
  PiMapPinLine,
  PiNotepad,
  PiPhone,
  PiRuler,
  PiSealCheck,
  PiSealQuestion,
  PiUser,
  PiUserFocus,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { format } from "timeago.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Task = ({ open, setOpen }) => {
  /////////////////////////////////////// VARIABLES //////////////////////////////////////
  const { currentTask: task, isFetching, error } = useSelector((state) => state.task);

  /////////////////////////////////////// STATES //////////////////////////////////////

  /////////////////////////////////////// USE EFFECTS //////////////////////////////////////

  /////////////////////////////////////// FUNCTIONS //////////////////////////////////////
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
            <div className="bg-white md:w-7/12 w-full h-full px-4">
              <div className="text-2xl flex justify-center">Task Details</div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiSealCheck className="text-[25px]" />
                Title
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">{task?.title}</div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiNotepad className="text-[25px]" />
                Description
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350]">{task?.description}</div>
            </div>

            <div className="flex flex-col md:w-5/12 w-full">
              <div className="bg-[#ebf2f5] w-full h-full md:mt-0 mt-8 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" /> Created :{" "}
                    <span className="text-black">{format(task?.createdAt)}</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" /> Due Date :{" "}
                    <span className="text-black">{task?.dueDate}</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" />
                    Priority : <span className="text-black capitalize">{task?.priority}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#ebf2f5] w-full h-auto mt-4 px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealQuestion className="text-gray-700" /> Status :{" "}
                    <span className="text-black">
                      {task?.status == "completed" ? "Completed" : ""}
                      {task?.status == "new" ? "New" : ""}
                      {task?.status == "overDue" ? "Over Due" : ""}
                      {task?.status == "inProgress" ? "In Progress" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

    // <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

    //     <div className='flex flex-col gap-[4px] w-[45vw] min-h-[40vh] h-auto max-h-[80vh] p-[1rem] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //         <div className="flex justify-between items-center w-full ">
    //             <h2 className="text-[24px] text-gray-800 font-medium capitalize ">{task?.title}</h2>
    //             <div className="flex justify-end items-center">
    //                 <IconButton onClick={handleClose} ><Close /></IconButton>
    //             </div>
    //         </div>

    //         <div className="flex justify-between gap-[1rem] ">

    //             <div className="flex flex-col gap-[8px] flex-[2] ">

    //                 <div className="flex flex-col gap-[4px] ">
    //                     <h5 className='text-gray-600' ><Description /> Description</h5>
    //                     <hr className='w-full h-[1px] bg-gray-300 ' />
    //                     <p className="text-[14px] text-gray-500 ">{task?.description}</p>
    //                 </div>

    //             </div>
    //             <div className="flex flex-[1] h-full ">
    //                 <div className="flex flex-col gap-[4px] w-full h-full bg-gray-200 p-[8px] rounded-[4px] ">
    //                     <h5 className='text-gray-800 text-[16px] font-[400] ' >Settings</h5>
    //                     <div className="flex flex-col gap-[8px] ">
    //                         <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
    //                             <Timeline style={{ fontSize: '18px' }} className=' ' />
    //                             <span className='font-light' >Start Date:</span>
    //                             <span className='underline ' >{task?.createdAt}</span>
    //                         </div>
    //                         <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
    //                             <Timeline style={{ fontSize: '18px' }} className=' ' />
    //                             <span className='font-light' >Due Date:</span>
    //                             <span className='underline ' >{task?.dueDate}</span>
    //                         </div>
    //                         <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
    //                             <Flag style={{ fontSize: '18px' }} className=' ' />
    //                             <span className='font-light' >Status:</span>
    //                             <span className='underline ' >{task?.status}</span>
    //                         </div>
    //                         <div className="flex gap-[4px] bg-gray-300 text-[14px] p-[4px] rounded-[4px] ">
    //                             <PriorityHigh style={{ fontSize: '18px' }} className=' ' />
    //                             <span className='font-light' >Priority:</span>
    //                             <span className='underline ' >{task?.priority}</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //         </div>

    //     </div>

    // </Modal>
  );
};

export default Task;
