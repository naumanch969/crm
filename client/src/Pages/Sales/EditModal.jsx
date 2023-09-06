import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Slide,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSale } from "../../redux/action/sale";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  //////////////////////////////////////// VARIABLES ///////////////////////////////////
  const initialState = {
    invoiceNumber: 0,
    createdAt: "",
    supplierName: "",
    leadId: "",
    net: 0,
    received: 0,
    psf: 0,
    fop: 0,
    branch: "",
    staff: "",
  };
  const dispatch = useDispatch();
  const { currentSale: sale, isFetching } = useSelector((state) => state.sale);

  //////////////////////////////////////// STATES ///////////////////////////////////
  const [saleData, setSaleData] = useState(sale);

  //////////////////////////////////////// STATES ///////////////////////////////////
  useEffect(() => {
    setSaleData(sale);
  }, [sale]);

  //////////////////////////////////////// FUNCTIONS ///////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSale(sale._id, saleData));
    setOpen(false);
    setSaleData(initialState);
  };
  const handleChange = (e) => {
    setSaleData({ ...saleData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Sale</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Report Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tr>
              <td className="pb-4 text-lg">Voucher Number </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange} value={saleData?.invoiceNumber} name="invoiceNumber" 
                  size="small"
                  type="number"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Supplier Name </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.supplierName}
                  name="supplierName"
                  size="small"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Net Worth </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.net}
                  name="net"
                  size="small"
                  type="number"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Recieved </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.received}
                  name="received"
                  size="small"
                  type="number"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">PSF </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.psf}
                  name="psf"
                  size="small"
                  type="number"
                  placeholder="Price Per Square Foot"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">FOP </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.fop}
                  name="fop"
                  size="small"
                  type="text"
                  placeholder="Fraction of Payment"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Branch </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.branch}
                  name="branch"
                  size="small"
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Staff </td>
              <td className="pb-4">
                <TextField
                  onChange={handleChange}
                  value={saleData?.staff}
                  name="staff"
                  size="small"
                  fullWidth
                />
              </td>
            </tr>
          </table>
        </div>
      </DialogContent>
      <DialogActions className="mb-4 mr-7">
        <button
          onClick={handleClose}
          variant="contained"
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          variant="contained"
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          Submit
        </button>
      </DialogActions>
    </Dialog>
    // <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

    //   <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //     <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
    //       <h2 className='font-bold text-[24px] ' >Update Sale</h2>
    //       <IconButton onClick={handleClose} ><Close className='text-white' /></IconButton>
    //     </div>

    //     <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem] w-full px-[2rem] py-[1rem] ' >

    //       <div className="w-full flex gap-[3rem]  ">
    //         <div className="flex-[1] flex flex-col gap-[1rem]  ">
    //           {/* invoice number */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="invoiceNumber">Invoice Number</label>
    //             <input type="number" onChange={handleChange} value={saleData?.invoiceNumber} name="invoiceNumber" id="invoiceNumber" placeholder='Invoice Number' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* supplier name */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="supplierName">Supplier Name</label>
    //             <input type="text" onChange={handleChange} value={saleData?.supplierName} name="supplierName" id="supplierName" placeholder='Supplier Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* net */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="net">Net</label>
    //             <input type="number" onChange={handleChange} value={saleData?.net} name="net" id="net" placeholder='Net' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* received */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="received">Received</label>
    //             <input type="number" onChange={handleChange} value={saleData?.received} name="received" id="received" placeholder='Received' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //         </div>

    //         <div className="flex-[1] flex flex-col gap-[1rem]  ">
    //           {/* psf */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="psf">PSF</label>
    //             <input type="number" onChange={handleChange} value={saleData?.psf} name="psf" id="psf" placeholder='PSF' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* fop */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="fop">FOP</label>
    //             <input type="number" onChange={handleChange} value={saleData?.fop} name="fop" id="fop" placeholder='FOP' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* branch */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="branch">Branch</label>
    //             <input type="text" onChange={handleChange} value={saleData?.branch} name="branch" id="branch" placeholder='Branch' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //           {/* staff */}
    //           <div className="flex flex-col gap-[4px] ">
    //             <label className='text-black font-medium text-[16px] ' htmlFor="staff">Staff</label>
    //             <input type="text" onChange={handleChange} value={saleData?.staff} name="staff" id="staff" placeholder='Staff' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="w-full flex justify-end items-center">
    //         <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //           {isFetching ? 'Updating' : 'Update'}
    //         </button>
    //       </div>

    //     </form>

    //   </div>

    // </Modal>
  );
};

export default EditModal;
