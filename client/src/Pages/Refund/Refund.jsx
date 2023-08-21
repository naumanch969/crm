import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLead } from "../../redux/action/lead";
import { createRefundApproval } from "../../redux/action/approval";
import { useDispatch, useSelector } from "react-redux";

const Refund = () => {

  ////////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch()
  const { state: { leadId } } = useLocation()
  const { currentLead } = useSelector(state => state.lead)
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const navigate = useNavigate()

  ////////////////////////////////////// STATES /////////////////////////////////////
  const [leadData, setLeadData] = useState(currentLead)
  const [refundData, setRefundData] = useState({ branch: '', issuingDate: date, customerName: leadData?.clientId?.firstName, cnic: leadData?.clientId?.cnic, phone: leadData?.clientId?.phone, amount: '', reason: '' })

  ////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getLead(leadId))
  }, [leadId])
  useEffect(() => {
    setLeadData(currentLead)
  }, [currentLead])

  ////////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (e) => {
    setRefundData((pre) => ({ ...refundData, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createRefundApproval({ ...refundData, leadId }, navigate))
  }

  return (
    <div className="w-full h-screen">
      <p className="flex justify-center text-3xl font-thin text-primary-red pt-4">
        Apply for Refund
      </p>
      <div className="w-full h-auto bg-white rounded-lg shadow-sm mt-10 p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
            {/* all inputs */}
            <div className="flex justify-start flex-wrap gap-[24px] w-full ">
              {/* Branch */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="branch">Branch:</label>
                <input value={refundData.branch} onChange={handleChange} type="text" name="branch" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Date of Issue */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="issuingDate">Issuing Date:</label>
                <input value={date} onChange={handleChange} disabled type="text" name="issuingDate" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Total Amount */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="amount">Amount :</label>
                <input value={refundData.amount} onChange={handleChange} type="number" name="amount" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Customer Name */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">Customer Name:</label>
                <input value={refundData.customerName} onChange={handleChange} type="text" name="customerName" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Customer CNIC */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentDetail">Customer CNIC:</label>
                <input value={refundData.cnic} onChange={handleChange} type="text" name="cnic" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Phone */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="amountPaid">Customer Phone:</label>
                <input value={refundData.phone} onChange={handleChange} type="number" name="phone" className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
              </div>
              {/* Reason */}
              <div className="flex flex-col gap-[4px] w-full ">
                <label className="text-black font-medium text-[16px] " htmlFor="description">Reason Of Refund:</label>
                <textarea rows="9" type="text" name="reason" onChange={handleChange} value={refundData.reason} placeholder="Description" className="bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] " />
              </div>
            </div>
            {/* button */}
            <div className="w-full flex justify-end items-center pr-5">
              <button type="" className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
                Apply
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Refund;
