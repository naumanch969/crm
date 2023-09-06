import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/action/task";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateTask = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES //////////////////////////////
  const { isFetching, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = [
    { title: "Completed", numbers: 100 },
    { title: "Pending", numbers: 0 },
    { title: "Delayed", numbers: 0 },
    { title: "Started", numbers: 0 },
  ];

  ////////////////////////////////////// STATES ///////////////////////////////////
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////

  ////////////////////////////////////// FUNCTION /////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.dueDate)
      return alert("Make sure to rovide all the fields");
    dispatch(createTask(taskData, setOpen));
  };

  const handleInputChange = (field, value) => {
    let inputValue
    if (field == 'dueDate')
      inputValue = value
    else
      inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, '');
    setTaskData((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };
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
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400">Add New Task</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Task Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Title </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Due Date </td>
                <td className="pb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DesktopDatePicker"]}>
                      <DesktopDatePicker
                        onChange={(date) => handleInputChange("dueDate", date.$d)}
                        slotProps={{ textField: { size: "small", fullWidth: "true" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </td>
              </tr>

              <tr>
                <td className="pb-4 text-lg">Task Priority </td>
                <td className="pb-4">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={["High", "Moderate", "Low"]}
                    onSelect={(e) => handleInputChange("priority", e.target.value)}
                    className="w-full"
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Description </td>
                <td className="pb-4">
                  <TextField
                    multiline
                    rows={5}
                    type="text"
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            variant="contained"
            onClick={handleSubmit}
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

    // <div className="flex flex-col gap-[1rem] w-full">

    //     <div className='flex flex-col gap-[2rem] bg-white px-[20px] py-[1rem] shadow-box rounded-[4px] ' >

    //         <div className="flex lg:flex-nowrap flex-wrap justify-between gap-[24px] w-full">
    //             {
    //                 stats.map((stat, index) => (
    //                     <div key={index} className="flex flex-col items-center lg:flex-[1] sm:w-[47%] w-full px-[2rem] py-[1rem] shadow-box rounded-[4px]  ">
    //                         <span className='text-gray-500 font-semibold text-[20px] text-center ' >{stat.title}</span>
    //                         <span className='text-[22px] font-semibold ' >{stat.numbers}</span>
    //                     </div>
    //                 ))
    //             }
    //         </div>

    //         <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full ' >

    //             <div className="w-full flex sm:flex-nowrap flex-wrap gap-[3rem]  ">
    //                 <div className="sm:flex-[1] w-full flex flex-col gap-[1rem]  ">
    //                     {/* title */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="title">Title</label>
    //                         <input type="text" onChange={handleChange} value={taskData.title} name="title" id="title" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* due date */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="dueDate">Due Date</label>
    //                         <input type="date" onChange={handleChange} value={taskData.dueDate} name="dueDate" id="dueDate" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                     {/* branch */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="priority">Priority</label>
    //                         <select onChange={handleChange} value={taskData.priority} name="priority" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
    //                             <option value="">Select Priority</option>
    //                             <option value="high">High</option>
    //                             <option value="moderate">Moderate</option>
    //                             <option value="low">Low</option>
    //                         </select>
    //                     </div>
    //                 </div>

    //                 <div className="sm:flex-[1] w-full flex flex-col gap-[1rem]  ">
    //                     {/* description */}
    //                     <div className="flex flex-col gap-[4px] w-full ">
    //                         <label className='text-black font-medium text-[16px] ' htmlFor="description">Description</label>
    //                         <textarea rows='9' type="text" onChange={handleChange} value={taskData.description} name="description" id="description" placeholder='Description' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //                     </div>
    //                 </div>

    //             </div>

    //             <div className="w-full flex justify-end items-center">
    //                 <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //                     {isFetching ? 'Saving...' : 'Save'}
    //                 </button>
    //             </div>

    //         </form>

    //     </div>
    // </div>
  );
};

export default CreateTask;
