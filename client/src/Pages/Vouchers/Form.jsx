import React from "react";

function Form() {
  return (
    <div>
      <form className="flex flex-col gap-[24px] w-full">
        <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
          <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
            {/* all inputs */}
            <div className="flex justify-start flex-wrap gap-[24px] w-full ">
              {/* Branch */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Branch:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Date of Issue */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Issueing Date:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Due Date */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Due Date:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Customer Name */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Customer Name:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Customer CNIC */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Customer CNIC:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Type of Payment */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="homeType">
                  Type of Payment
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
              {/* Total Amount */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Total Amount:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Amount Paying */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Amount Paying:
                </label>
                <input className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
              {/* Remaing Amount */}
              <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                <label className="text-gray-900 font-medium text-[1rem] " htmlFor="city">
                  Remaing Amount:
                </label>
                <input disabled className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] " type="text" />
              </div>
            </div>
            {/* button */}
            <div className="w-full flex justify-end items-center pr-5">
              <button className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer mr-5">
                Download Voucher
              </button>
              <button className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
                Print Voucher
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
