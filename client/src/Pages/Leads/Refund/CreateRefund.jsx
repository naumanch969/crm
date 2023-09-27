import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { createRefund } from "../../../redux/action/refund";
import { getClients } from "../../../redux/action/user";
import { getLead } from "../../../redux/action/lead";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateRefund = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead: lead } = useSelector(state => state.lead);
  const { isFetching } = useSelector(state => state.refund);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const navigate = useNavigate();
  const initialRefundData = {
    branch: '',
    amount: '',
    CNIC: '',
    phone: '',
    clientName: '',
    reason: '',

  }

  ////////////////////////////////////// STATES /////////////////////////////////////
  const [refundData, setRefundData] = useState(initialRefundData)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    setRefundData({ ...refundData, clientName: lead?.client?.username })
  }, [lead])

  ////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleSave = () => {
    const { branch, amount, clientName, phone, reason } = refundData
    if (!amount || !phone || !reason || !branch || !clientName) return alert('Make sure to provide all the fields')

    dispatch(createRefund({ ...refundData, leadId: lead?._id }, setOpen))
    setRefundData(initialRefundData)
  }
  const handleChange = (e) => {
    setRefundData({ ...refundData, [e.target.name]: e.target.value })
  }
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
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Apply For Refund</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad />
              <span>Refund Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Branch </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.branch}
                    onChange={handleChange}
                    type="text"
                    name="branch"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Amount </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.amount}
                    onChange={handleChange}
                    type="number"
                    name="amount"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    disabled={lead?.client}
                    value={refundData.clientName}
                    onChange={handleChange}
                    type="text"
                    name="clientName"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Customer CNIC </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.CNIC}
                    onChange={handleChange}
                    type="text"
                    name="CNIC"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Phone Number </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.phone}
                    onChange={handleChange}
                    type="number"
                    name="phone"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Reason </td>
                <td className="pb-4">
                  <TextField
                    type="text"
                    name="reason"
                    onChange={handleChange}
                    value={refundData.reason}
                    multiline
                    rows={5}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mr-6 mb-4">
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSave}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Saving...' : 'Save'}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRefund;
