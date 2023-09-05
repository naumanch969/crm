import { KeyboardArrowRight } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCashbook } from "../../redux/action/cashbook";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  MenuItem,
  Select,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CreateCashBook({ open, setOpen, scroll }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cashbookData, setCashbookData] = useState({
    type: "",
    customerName: "",
    paymentType: "",
    paymentDetail: "",
    amountPaid: "",
    branch: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCashbookData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    dispatch(createCashbook(cashbookData, navigate));
    setOpen(false);
    setCashbookData({
      type: "",
      customerName: "",
      paymentType: "",
      paymentDetail: "",
      amountPaid: "",
      branch: "",
    });
  };

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
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Cash Detail</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Cash Report Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Type </td>
                <td className="pb-4">
                  <Select
                    name="type"
                    value={cashbookData.type}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    <MenuItem value="in">Amount In</MenuItem>
                    <MenuItem value="out">Amount Out</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    name="customerName"
                    value={cashbookData.customerName}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Type </td>
                <td className="pb-4">
                  <Select
                    name="paymentType"
                    value={cashbookData.paymentType}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Details </td>
                <td className="pb-4">
                  <TextField
                    name="paymentDetail"
                    value={cashbookData.paymentDetail}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Amount </td>
                <td className="pb-4">
                  <TextField
                    name="amountPaid"
                    value={cashbookData.amountPaid}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Branch No. </td>
                <td className="pb-4">
                  <TextField
                    name="branch"
                    value={cashbookData.branch}
                    onChange={handleChange}
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
    </div>
    // <div className="w-full h-screen">

    //   <div className="flex justify-between items-center">
    //     <div className="flex flex-col justify-start gap-[4px] ">
    //       <h1 className="text-primary-blue text-[24px] ">Create Vouchers</h1>
    //       <div className="flex justify-start items-center gap-[8px] ">
    //         <span className="capitalize text-[15px] text-primary-gray ">App</span>
    //         <KeyboardArrowRight className="text-primary-gray " />
    //         <span className="capitalize text-black ">Create Voucher</span>
    //       </div>
    //     </div>
    //   </div>

    //   <div>
    //     <div className="text-2xl font-normal flex justify-center mt-10 text-gray-600">
    //       Create New Voucher
    //     </div>

    //     <div className="mt-5">
    //       <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full">
    //         <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
    //           <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
    //             {/* all inputs */}
    //             <div className="flex justify-start flex-wrap gap-[24px] w-full ">
    //               {/* Branch */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="type">Type:</label>
    //                 <select name="type" value={cashbookData.type} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ">
    //                   <option value="">-</option>
    //                   <option value="in">Amount In</option>
    //                   <option value="out">Amount Out</option>
    //                 </select>
    //               </div>
    //               {/* Date of Issue */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">Customer Name:</label>
    //                 <input type="text" name="customerName" value={cashbookData.customerName} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
    //               </div>
    //               {/* Customer Name */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentType">Payment Type:</label>
    //                 <select name="paymentType" value={cashbookData.paymentType} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ">
    //                   <option value="">-</option>
    //                   <option value="Cash">Cash</option>
    //                   <option value="Cheque">Cheque</option>
    //                   <option value="Credit Card">Credit Card</option>
    //                   <option value="Online">Online</option>
    //                 </select>
    //               </div>
    //               {/* Customer CNIC */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentDetail">Payment Details:</label>
    //                 <input type="text" name="paymentDetail" value={cashbookData.paymentDetail} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
    //               </div>
    //               {/* Type of Payment */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="amountPaid">Amount Paid:</label>
    //                 <input type="number" name="amountPaid" value={cashbookData.amountPaid} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
    //               </div>
    //               {/* Total Amount */}
    //               <div className="flex flex-col justify-start gap-[4px] sm:w-[23%] w-full ">
    //                 <label className="text-gray-900 font-medium text-[1rem] " htmlFor="branch">Branch No.:</label>
    //                 <input type="number" name="branch" value={cashbookData.branch} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
    //               </div>
    //             </div>
    //             {/* button */}
    //             <div className="w-full flex justify-end items-center pr-5">
    //               <button type="submit" className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
    //                 Enter Record
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default CreateCashBook;
