import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInventory } from "../../../redux/action/inventory";
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
  import { Loader } from "../../../utils";
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const UpateStatusModal = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentInventory, isFetching } = useSelector((state) => state.inventory);

  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [status, setStatus] = useState(currentInventory?.status);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setStatus(currentInventory?.status);
  }, [currentInventory]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInventory(currentInventory?._id, { status }));
    setOpen(false);
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
        fullWidth="xs"
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Update Status</div>
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
                  <td className="pb-4 text-lg">Status </td>
                  <td className="pb-4 w-64">
                    <Select
                      name="status"
                      value={status}
                      onChange={handleChange}
                      type="text"
                      size="small"
                      fullWidth>
                      <MenuItem value="notStarted">Not Started</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="inProgress">In Progress</MenuItem>
                      <MenuItem value="onHold">On Hold</MenuItem>
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
    //             <h2 className='font-bold text-[20px] ' >Update Status</h2>
    //             <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
    //         </div>

    //         <form onSubmit={handleSubmit} className='w-full p-[10px] flex flex-col gap-[10px] ' >
    //             <select className='w-full min-h-[40px] text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='status' value={status} onChange={handleChange} >
    //                 <option value="notStarted">Not Started</option>
    //                 <option value="completed">Completed</option>
    //                 <option value="inProgress">In Progress</option>
    //                 <option value="onHold">On Hold</option>
    //             </select>
    //             <div className="w-full flex justify-end items-center">
    //                 <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //                     {isFetching ? 'Saving' : 'Save'}
    //                 </button>
    //             </div>
    //         </form>

    //     </div>

    // </Modal>
  );
};

export default UpateStatusModal;
