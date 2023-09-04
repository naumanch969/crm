import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Slide,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../redux/action/lead";
import { PiXLight } from "react-icons/pi";
import { Loader } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const UpateStatusModal = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);

  ////////////////////////////////////// STATES  /////////////////////////////////////
  const [status, setStatus] = useState(currentLead?.status);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setStatus(currentLead?.status);
  }, [currentLead]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLead(currentLead?._id, { status }));
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
                    <Select name='status' value={status} onChange={handleChange} type="text" size="small" fullWidth>
                        <MenuItem value="successful">Successful</MenuItem>
                        <MenuItem value="unsuccessful">Unsuccessful</MenuItem>
                        <MenuItem value="underProcess">Under Process</MenuItem>
                        <MenuItem value="declined">Declined</MenuItem>
                        <MenuItem value="remaining">Remaining</MenuItem>
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
            className="bg-[#d7d7d7] font-primary px-4 py-2 rounded-lg text-gray-100 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-normal transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red font-primary px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-normal">
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
    //                 <option value="successful">Successful</option>
    //                 <option value="unsuccessful">Unsuccessful</option>
    //                 <option value="underProcess">Under Process</option>
    //                 <option value="declined">Declined</option>
    //                 <option value="remaining">Remaining</option>
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
