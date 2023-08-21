import React from "react";

const Refund = () => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <div className="w-full h-screen">
      <p className="flex justify-center text-3xl font-thin text-primary-red pt-4">
        Apply for Refund
      </p>
      <div className="w-full h-auto bg-white rounded-lg shadow-sm mt-10 p-10">
        <form className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[1rem] bg-white rounded-[4px] shadow-sm ">
            <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
              {/* all inputs */}
              <div className="flex justify-start flex-wrap gap-[24px] w-full ">
                {/* Branch */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">
                    Branch:
                  </label>
                  <input
                    type="text"
                    name="Branch"
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Date of Issue */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">
                    Issuing Date:
                  </label>
                  <input
                    disabled
                    type="text"
                    name="date"
                    value={date}
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Customer Name */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="customerName">
                    Customer Name:
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Customer CNIC */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="paymentDetail">
                    Customer CNIC:
                  </label>
                  <input
                    type="text"
                    name="CNIC"
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Type of Payment */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="amountPaid">
                    Customer Phone:
                  </label>
                  <input
                    type="number"
                    name="number"
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Total Amount */}
                <div className="flex flex-col justify-start gap-[4px] w-[23%] ">
                  <label className="text-gray-900 font-medium text-[1rem] " htmlFor="branchNumber">
                    Lead ID :
                  </label>
                  <input
                    type="number"
                    name="branchNumber"
                    className="text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] "
                  />
                </div>
                {/* Description */}
                <div className="flex flex-col gap-[4px] w-full ">
                  <label className="text-black font-medium text-[16px] " htmlFor="description">
                    Reason Of Refund:
                  </label>
                  <textarea
                    rows="9"
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    className="bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] "
                  />
                </div>
              </div>
              {/* button */}
              <div className="w-full flex justify-end items-center pr-5">
                <button className="w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Refund;
