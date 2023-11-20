import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shiftLead } from "../../redux/action/lead";
import { getEmployees } from "../../redux/action/user";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Slide,
} from "@mui/material";
import { PiXLight } from "react-icons/pi";
import { Loader } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ShiftLead = ({ open, setOpen, from }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const { employees, loggedUser } = useSelector((state) => state.user);
  const employeeNames = employees
  .filter((employee) => employee.username != null && employee.username != undefined)
  .filter((employee) => employee._id != loggedUser._id) // Filter out employees with matching _id
  .map(({ _id, username }) => ({ _id, username }));
  
  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [shiftTo, setShiftTo] = useState('');

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
  }, []);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shiftLead(currentLead?._id, shiftTo));
    setOpen(false);
    setShiftTo("")
  };
  const handleChange = (e) => {
    setShiftTo(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth="xs"
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Shift Lead</div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        {isFetching ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <DialogContent>
            <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
              <table className="w-full">
                <tr>
                  <td className="pb-4 text-lg">Shift to </td>
                  <td className="pb-4 w-64">
                    <Select name='allocatedTo' value={shiftTo} onChange={handleChange} type="text" size="small" fullWidth>
                      {employees.map((employee, index) => (
                        <MenuItem value={employee?._id} key={index}>
                          {employee?.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <button
            onClick={() => setOpen(false)}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
    // <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

    //     <div className='w-[14rem] h-fit overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //         <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
    //             <h2 className='font-bold text-[20px] ' >Shift Lead</h2>
    //             <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
    //         </div>

    //         <form onSubmit={handleSubmit} className='w-full p-[10px] flex flex-col gap-[10px] ' >
    //             <select className='w-full min-h-[40px] text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='allocatedTo' value={allocatedTo} onChange={handleChange} >
    //                 {
    //                     employeeNames.map((employee, index) => (
    //                         <option value={employee?._id} key={index} >{employee?.username}</option>
    //                     ))
    //                 }
    //             </select>
    //             <div className="w-full flex justify-end items-center">
    //                 <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //                     {isFetching ? 'Shifting...' : 'Shift'}
    //                 </button>
    //             </div>
    //         </form>

    //     </div>

    // </Modal>
  );
};

export default ShiftLead;
