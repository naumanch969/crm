import { KeyboardArrowRight } from "@mui/icons-material";
import React from "react";

function CreateCashBook() {
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
          <form className="flex flex-col gap-[24px] w-full">
            <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
              <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
                {/* all inputs */}
                <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                  {/* Branch */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                      ID:
                    </label>
                    <input
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      type="number"
                    />
                  </div>
                  {/* Date of Issue */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                      Customer Name:
                    </label>
                    <input
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      type="text"
                    />
                  </div>
                  {/* Customer Name */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                      Payment Type:
                    </label>
                    <select
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      name="homeType">
                      <option value="">-</option>
                      <option value="type1">Cash</option>
                      <option value="type2">Cheque</option>
                      <option value="type3">Credit Card</option>
                      <option value="type4">Online</option>
                    </select>
                  </div>
                  {/* Customer CNIC */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                      Payment Details:
                    </label>
                    <input
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      type="text"
                    />
                  </div>
                  {/* Type of Payment */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="homeType">
                      Amount Paid:
                    </label>
                    <input
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      type="number"
                    />
                  </div>
                  {/* Total Amount */}
                  <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                    <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                      Branch No.:
                    </label>
                    <input
                      className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                      type="number"
                    />
                  </div>
                </div>
                {/* button */}
                <div className="w-full flex justify-end items-center pr-5">
                  <button className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
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
