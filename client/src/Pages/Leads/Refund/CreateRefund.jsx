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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateRefund = ({ open, setOpen }) => {
  ////////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const {
    state: { leadId },
  } = useLocation();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const { isFetching: isSubmitting } = useSelector((state) => state.approval);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const navigate = useNavigate();

  ////////////////////////////////////// STATES /////////////////////////////////////
  const [leadData, setLeadData] = useState();
  const [refundData, setRefundData] = useState({
    branch: "",
    issuingDate: "",
    customerName: "",
    cnic: "",
    phone: "",
    amount: "",
    reason: "",
  });

  ////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getLead(leadId));
  }, [leadId]);
  useEffect(() => {
    setLeadData(currentLead);
  }, [currentLead]);

  ////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (e) => {
    setRefundData((pre) => ({ ...refundData, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRefundApproval({ ...refundData, leadId }, navigate));
    setRefundData({
      branch: "",
      issuingDate: "",
      customerName: "",
      cnic: "",
      phone: "",
      amount: "",
      reason: "",
    });
  };

  const handleClose = () => {
    setRefundData({
      branch: "",
      issuingDate: "",
      customerName: "",
      cnic: "",
      phone: "",
      amount: "",
      reason: "",
    });

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
                <td className="flex flex-col justify-start mt-1 text-lg">Issuing Date </td>
                <td className="pb-4">
                  <TextField
                    value={date}
                    onChange={handleChange}
                    disabled
                    type="text"
                    name="issuingDate"
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
                <td className="flex flex-col justify-start mt-1 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.customerName}
                    onChange={handleChange}
                    type="text"
                    name="customerName"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>

              <tr>
                <td className="flex flex-col justify-start mt-1 text-lg">Customer CNIC </td>
                <td className="pb-4">
                  <TextField
                    value={refundData.cnic}
                    onChange={handleChange}
                    type="text"
                    name="cnic"
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
                <td className="flex flex-col justify-start mt-1 text-lg">Phone Number </td>
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
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRefund;
