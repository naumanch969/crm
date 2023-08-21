import { KeyboardArrowRight } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCashbook } from "../../redux/action/cashbook";
import { useNavigate } from "react-router-dom";

function CreateCashBook() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [cashbookData, setCashbookData] = useState({ type: '', customerName: '', paymentType: '', paymentDetail: '', amountPaid: '', branch: '', })

  const handleChange = (e) => {
    e.preventDefault()
    setCashbookData(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createCashbook(cashbookData, navigate))
  }

  return (
    <div className="w-full h-screen">


      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start gap-[4px] ">
          <h1 className="text-primary-blue text-[24px] ">Create Vouchers</h1>
          <div className="flex justify-start items-center gap-[8px] ">
            <span className="capitalize text-[15px] text-primary-gray ">App</span>
            <KeyboardArrowRight className="text-primary-gray " />
            <span className="capitalize text-black ">Create Voucher</span>
          </div>
        </div>
      </div>

      <div>
        <div className="text-2xl font-normal flex justify-center mt-10 text-gray-600">
          Create New Voucher
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full">
            <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
              <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
                {/* all inputs */}
                <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                  {/* Branch */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="type">Type:</label>
                    <select name="type" value={cashbookData.type} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ">
                      <option value="">-</option>
                      <option value="in">Amount In</option>
                      <option value="out">Amount Out</option>
                    </select>
                  </div>
                  {/* Date of Issue */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">Customer Name:</label>
                    <input type="text" name="customerName" value={cashbookData.customerName} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
                  </div>
                  {/* Customer Name */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentType">Payment Type:</label>
                    <select name="paymentType" value={cashbookData.paymentType} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ">
                      <option value="">-</option>
                      <option value="type1">Cash</option>
                      <option value="type2">Cheque</option>
                      <option value="type3">Credit Card</option>
                      <option value="type4">Online</option>
                    </select>
                  </div>
                  {/* Customer CNIC */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentDetail">Payment Details:</label>
                    <input type="text" name="paymentDetail" value={cashbookData.paymentDetail} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
                  </div>
                  {/* Type of Payment */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="amountPaid">Amount Paid:</label>
                    <input type="number" name="amountPaid" value={cashbookData.amountPaid} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
                  </div>
                  {/* Total Amount */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="branch">Branch No.:</label>
                    <input type="number" name="branch" value={cashbookData.branch} onChange={handleChange} className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " />
                  </div>
                </div>
                {/* button */}
                <div className="w-full flex justify-end items-center pr-5">
                  <button type="submit" className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
                    Enter Record
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCashBook;
