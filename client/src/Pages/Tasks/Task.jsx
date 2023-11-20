import { Close, Description, Flag, PriorityHigh, Timeline } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask } from "../../redux/action/task";
import { PiCalendar, PiNotepad, PiSealCheck, PiSealQuestion, PiXLight } from "react-icons/pi";
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
          <div className="text-2xl flex justify-center">Completed Task Details</div>
          <div className="md:flex text-[#67757c]">
            <div className="bg-white md:w-7/12 w-full h-full px-4">
              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiSealCheck className="text-[25px]" />
                Completed Task
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350] capitalize text-black">
                {task?.completedTask}
              </div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiNotepad className="text-[25px]" />
                Description
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350] capitalize text-black">
                {task?.completedTaskComment}
              </div>
            </div>

            <div className="flex flex-col md:w-5/12 w-full mt-12">
              <div className="bg-[#ebf2f5] w-full md:mt-0 mt-8 px-4 py-4 flex flex-col gap-5 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" /> Completed :{" "}
                    <span className="text-black">{format(task?.completedTaskDate)}</span>
                  </div>
                </div>
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealQuestion className="text-gray-700" /> Status :{" "}
                    <span className="text-black">
                      {task?.completedTaskStatus == "successful" ? "Successful" : ""}
                      {task?.completedTaskStatus == "unsuccessful" ? "Unsuccessful" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-2xl flex justify-center py-4">New Task Details</div>

          <Divider className="" />
          <div className="md:flex text-[#67757c]">
            <div className="bg-white md:w-7/12 w-full h-full px-4">
              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiSealCheck className="text-[25px]" />
                Next Task
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350] capitalize text-black">{task?.newTask}</div>

              <div className="flex items-center pt-6 pb-2 gap-3 text-[20px]">
                <PiNotepad className="text-[25px]" />
                Description
              </div>
              <Divider />
              <div className="pt-2 text-lg font-[350] capitalize text-black">
                {task?.newTaskComment}
              </div>
            </div>
            <div className="flex flex-col md:w-5/12 w-full mt-6">
              <div className="bg-[#ebf2f5] w-full px-4 py-4 flex flex-col justify-between gap-4 rounded-md">
                <div className="bg-[#d1dfe4] px-2 py-1 w-full rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiCalendar className="text-gray-700" />
                    Deadline in :{" "}
                    <span className="text-black capitalize">{format(task?.newTaskDeadline)}</span>
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

export default Task;
